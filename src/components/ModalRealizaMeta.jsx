import './css/ModalRealizaMeta.css';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { BsCheck2Circle, BsExclamationTriangle, BsX } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { toast } from 'react-toastify';

ModalRealizaMeta.propTypes = {
    modalOn: PropTypes.bool,
    closeModalMeta: PropTypes.func,
    dados: PropTypes.object
}

export default function ModalRealizaMeta({ modalOn, closeModalMeta, dados }) {
    const [ metaBatida, setMetaBatida ] = useState(false);
    const [ percentualRealizado, setPercentualRealizado ] = useState(0.00);
    const [ metaModal, setMetaModal ] = useState({
        id: 0,
        competencia: '',
        meta: 0,
        realizado: 0,
        atingido: 0
    });

    useEffect(() => {
        setMetaModal(dados)
    }, [dados])

    const handleChangeRealizado = (event) => {
        const meta = metaModal.meta;
        const realizado = event.target.value;
        const percentual = realizado / meta * 100;

        const novaMeta = {...metaModal};
        const atingido = percentual >= 100 ? true : false;
        const atingidoModal = percentual >= 100 ? '1' : '0';
        novaMeta.realizado = realizado;
        novaMeta.atingido = atingidoModal;

        setPercentualRealizado(percentual.toFixed(1));
        setMetaModal(novaMeta);
        setMetaBatida(atingido);
    }

    const fecharModal = () => {
        setMetaBatida({
            id: 0,
            competencia: '',
            meta: 0,
            realizado: 0,
            atingido: 0
        });
        setPercentualRealizado(0.00);
        closeModalMeta();
    }

    const informaRealizadoMeta = async (event) => {
        event.preventDefault();

        const emailCookie = decodeURIComponent(Cookies.get('userEmail'));
        if(!metaModal.id || !metaModal.realizado || !metaModal.atingido) {
            toast.warn('Há campos ainda não preenchidos.', {
                autoClose: 3000,
            });
            return
        }

        try {
            await api.post(
                    '/informaRealizado',
                    {
                        email: emailCookie,
                        idMeta: metaModal.id,
                        valorRealizado: metaModal.realizado,
                        atingido: metaModal.atingido
                    }
                )
            
            toast.success('Atualizado com sucesso!', {
                autoClose: 3000,
            });
        } catch(err) {
            console.log(err)
            toast.error('Erro ao realizar operação.', {
                autoClose: 3000,
            });
        }

        fecharModal()
    }
    

    return (
        <>
            <div className="container-ModalMeta">
                <div className={`modal-meta-fade  ${modalOn ? '' : 'hide'}`} onClick={fecharModal}></div>
                <div className={`modal-meta ${modalOn ? '' : 'hide'}`}>
                    <div className="mdMeta-header">
                        <h3 className="mdMeta-titulo">{metaModal.competencia}</h3>
                        <BsX className='icon-fechar' onClick={fecharModal}/>
                    </div>
                    <div className="mdMeta-content">
                        <div className="mdMeta-areaInputs">
                            <div className="mdMeta-areaMeta">
                                <div className="mdMeta-labelMeta">Meta:</div>
                                <div className="mdMeta-valorMeta">{metaModal.meta}</div>
                            </div>
                            <div className="mdMeta-areaRealizado">
                                <label htmlFor="mdMeta-inprealizado" className="mdMeta-labelRealizado">Realizado:</label>
                                <input type="number" name="realizado" id="mdMeta-inprealizado" onChange={(event) => handleChangeRealizado(event)} value={metaModal.realizado}/>
                                <p className={`mdMeta-percentualRealizado ${metaBatida ? 'atingido' : 'naoAtingido'}`}>{percentualRealizado}%</p>
                            </div>
                        </div>
                        <div className="mdMeta-areaIndicador">
                            {metaBatida ? <BsCheck2Circle className="mdMeta-indicador atingido"/> : <BsExclamationTriangle className="mdMeta-indicador naoAtingido"/>}
                            <div className="mdMeta-infoIndicador">{metaBatida ? "Meta batida" : "Meta não batida"}</div>
                        </div>
                    </div>
                    <div className="mdMeta-actions">
                        <button id="mdMeta-btnCancelar" onClick={fecharModal}>Cancelar</button>
                        <button id="mdMeta-btnConfirmar" onClick={(event) => informaRealizadoMeta(event)}>Confirmar</button>
                    </div>
                </div>
            </div>
        </>
    )
}