import './css/ModalRealizaMeta.css';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { BsCheck2Circle, BsExclamationTriangle, BsX } from 'react-icons/bs';
import { useState } from 'react';
import { api } from '../lib/api';
import { toast } from 'react-toastify';

ModalRealizaMeta.propTypes = {
    modalOn: PropTypes.bool,
    closeMovimento: PropTypes.func
}

export default function ModalRealizaMeta({ modalOn, closeMovimento }) {
    const [ metaBatida, setMetaBatida ] = useState(false);
    const [ valorRealizado, setValorRealizado ] = useState(0);
    const [ percentualRealizado, setPercentualRealizado ] = useState(0.00);

    const handleChangeRealizado = (event) => {
        const meta = 500;
        const realizado = event.target.value;
        const percentual = realizado / meta * 100;

        setPercentualRealizado(percentual.toFixed(0));
        setValorRealizado(realizado);
        if(percentual >= 100) {
            setMetaBatida(true);
        } else {
            setMetaBatida(false);
        }
    }

    return (
        <>
            <div className="container-ModalMeta">
                <div className={`modal-meta-fade  ${modalOn ? '' : 'hide'}`} onClick={closeMovimento}></div>
                <div className={`modal-meta ${modalOn ? '' : 'hide'}`}>
                    <div className="mdMeta-header">
                        <h3 className="mdMeta-titulo">FEV 2024</h3>
                        <BsX className='icon-fechar' onClick={() => closeMovimento(false)}/>
                    </div>
                    <div className="mdMeta-content">
                        <div className="mdMeta-areaInputs">
                            <div className="mdMeta-areaMeta">
                                <div className="mdMeta-labelMeta">Meta:</div>
                                <div className="mdMeta-valorMeta">500,00</div>
                            </div>
                            <div className="mdMeta-areaRealizado">
                                <label htmlFor="mdMeta-inprealizado" className="mdMeta-labelRealizado">Realizado:</label>
                                <input type="number" name="realizado" id="mdMeta-inprealizado" onChange={(event) => handleChangeRealizado(event)} value={valorRealizado}/>
                                <p className={`mdMeta-percentualRealizado ${metaBatida ? 'atingido' : 'naoAtingido'}`}>{percentualRealizado}%</p>
                            </div>
                        </div>
                        <div className="mdMeta-areaIndicador">
                            {metaBatida ? <BsCheck2Circle className="mdMeta-indicador atingido"/> : <BsExclamationTriangle className="mdMeta-indicador naoAtingido"/>}
                            <div className="mdMeta-infoIndicador">{metaBatida ? "Meta batida" : "Meta não batida"}</div>
                        </div>
                    </div>
                    <div className="mdMeta-actions">
                        <button id="mdMeta-btnCancelar" onClick={() => closeMovimento(false)}>Cancelar</button>
                        <button id="mdMeta-btnConfirmar">Confirmar</button>
                    </div>
                </div>
            </div>
        </>
    )
}