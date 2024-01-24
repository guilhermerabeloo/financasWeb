import './css/CadastroObjetivo.css'
import trofeu from '../assets/trofeu.png';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { ToastContainer, toast } from 'react-toastify';

export default function CadastroObjetivo() {
    const [ etapasObjetivo, setEtapasObjetivo ] = useState([]);
    const [ formNovoObjetivo, setFormNovoObjetivo ] = useState({
        id: '',
        nome: '',
        tipoObjetivo: '1',
        dataInicial: '',
        dataFinal: '',
        valorInicial: 0,
        valorFinal: 0
    })

    const location = useLocation();
    const objetivoTemporario = location.state?.objetivoTemp;
    useEffect(() => {
        if(objetivoTemporario) {
            const formTemp = {
                id: objetivoTemporario.id,
                nome: objetivoTemporario.nome,
                tipoObjetivo: objetivoTemporario.objetivo,
                dataInicial: objetivoTemporario.datainicio,
                dataFinal: objetivoTemporario.datafinal,
                valorInicial: objetivoTemporario.valorinicio,
                valorFinal: objetivoTemporario.valorfinal
            }
    
            setFormNovoObjetivo(formTemp)   
        }
    }, [objetivoTemporario])

    const handleChangeNovoObjetivo = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const formAntigo = {...formNovoObjetivo};
        formAntigo[name] = value;

        setFormNovoObjetivo(formAntigo);
    }

    function calcularQuantidadeMeses(dataInicial, dataFinal) {
        const dataInicialObj = new Date(dataInicial);
        const dataFinalObj = new Date(dataFinal);

        const diferencaEmDias = (dataFinalObj - dataInicialObj) / (1000 * 60 * 60 * 24);

        const diferencaEmMeses = diferencaEmDias / 30;

        const quantidadeMeses = Math.ceil(diferencaEmMeses);

        return quantidadeMeses;
      }

    const calcularObjetivo = async () => {
        const diferencaMeses = calcularQuantidadeMeses(formNovoObjetivo.dataInicial, formNovoObjetivo.dataFinal);
        const diferencaValores = formNovoObjetivo.valorFinal - formNovoObjetivo.valorInicial;
        const metaMensal = diferencaValores / diferencaMeses;

        const mesesObjetivo = [];
        let acumulado = Number(formNovoObjetivo.valorInicial);
        for(let i = 0; i < diferencaMeses; i++) {
            const dataInicio = formNovoObjetivo.dataInicial
            const competencia = new Date(dataInicio.substring(0,4), Number(dataInicio.substring(5,7)) -1, 1);
            competencia.setMonth(competencia.getMonth() + i);

            acumulado += metaMensal

            const mesAtual = (competencia.toLocaleString('pt-BR', { month: 'long' }))
            mesesObjetivo.push({
                competencia: `${mesAtual.toUpperCase().substring(0,3)} ${competencia.getFullYear()}`,
                meta: metaMensal.toFixed(2),
                acumulado: acumulado.toFixed(2)
            })
        }

        setEtapasObjetivo(mesesObjetivo)

        try {
            const emailCk = decodeURIComponent(Cookies.get('userEmail'));

            const idObjetivo = await api.post(
                `/criaCabecalhoObjetivo`,
                {
                    "email": emailCk,
                    "id": formNovoObjetivo.id,
                    "nome": formNovoObjetivo.nome,
                    "dataInicio": formNovoObjetivo.dataInicial,
                    "dataFinal": formNovoObjetivo.dataFinal,
                    "valorInicial": formNovoObjetivo.valorInicial,
                    "valorFinal": formNovoObjetivo.valorFinal,
                    "tipoObjetivo": formNovoObjetivo.tipoObjetivo
                  }
            )

            toast.success('Informações salvas!', {
                autoClose: 1000,
            });

            const formAntigo = {...formNovoObjetivo};
            formAntigo['id'] = idObjetivo.data.objetivo
    
            setFormNovoObjetivo(formAntigo)
        } catch(err) {
            toast.error('Erro ao salvar informações!', {
                autoClose: 1000,
            });

            setEtapasObjetivo([]);
            setFormNovoObjetivo({
                id: '',
                nome: '',
                tipoObjetivo: 1,
                dataInicial: '',
                dataFinal: '',
                valorInicial: 0,
                valorFinal: 0
            })
        }
    }

    const cadastraNovoObjetivo = (event) => {
        console.log(event)
    }

    return (
        <>
            <div className="container-modalObjetivo">
                <div className="mdObjetivo-header">
                    <h3 className="mdObjetivo-titulo">Cadastrar objetivo</h3>
                </div>
                <div className="modal-objetivo">
                    <div className="mdObjetivo-content">
                        <div className="mdObjetivo-areaPreenchimento">
                            <div className="mdObjetivo-areaTituloObjetivo">
                                <div className="mdObjetivo-areaInput">
                                    <label className="mdObjetivo-label" htmlFor="mdObjetivo-inpidobjetivo">Id:</label>
                                    <input type="text" name="id" value={formNovoObjetivo.id} onChange={(event) => handleChangeNovoObjetivo(event)} id="mdObjetivo-inpidobjetivo" readOnly={true} disabled={true}/>
                                </div>
                                <div className="mdObjetivo-areaInput">
                                    <label className="mdObjetivo-label" htmlFor="mdObjetivo-inpnomeobjetivo">Título:</label>
                                    <input type="text" name="nome" value={formNovoObjetivo.nome} onChange={(event) => handleChangeNovoObjetivo(event)} id="mdObjetivo-inpnomeobjetivo" placeholder="Ex: Viagem para a Europa"/>
                                </div>
                            </div>
                            <div className="mdObjetivo-areaTipoObjetivo">
                                <p className="mdObjetivo-label" htmlFor="">Tipo de objetivo</p>
                                <div className="mdObjetivo-areaRadio">
                                    <div className="mdObjetivo-areaRadio">
                                        <input type="radio" id="mdObjetivo-porValor" name="tipoObjetivo" value='1' checked={formNovoObjetivo.tipoObjetivo == '1'} onChange={(event) => handleChangeNovoObjetivo(event)}/>
                                        <label htmlFor="mdObjetivo-porValor">Por valor final</label>
                                    </div>
                                    <div className="mdObjetivo-areaRadio">
                                        <input type="radio" id="mdObjetivo-porMes" name="tipoObjetivo" value='2' checked={formNovoObjetivo.tipoObjetivo == '2'} onChange={(event) => handleChangeNovoObjetivo(event)}/>
                                        <label htmlFor="mdObjetivo-porMes">Por meta mensal</label>
                                    </div>  
                                    <div className="mdObjetivo-areaRadio">
                                        <input type="radio" id="mdObjetivo-personalizado" name="tipoObjetivo" value='3' checked={formNovoObjetivo.tipoObjetivo == '3'} onChange={(event) => handleChangeNovoObjetivo(event)}/>
                                        <label htmlFor="mdObjetivo-personalizado">Personalizado</label>
                                    </div> 
                                </div>
                            </div>
                            <div className="mdObjetivo-areaInfoObjetivo">
                                <div className="mdObjetivo-areaInput">
                                    <label className="mdObjetivo-label" htmlFor="mdObjetivo-inpdataInicial">Data inicial:</label>
                                    <input type="date" name="dataInicial" value={formNovoObjetivo.dataInicial} onChange={(event) => handleChangeNovoObjetivo(event)} id="mdObjetivo-inpdataInicial"/>
                                </div>
                                <div className="mdObjetivo-areaInput">
                                    <label className="mdObjetivo-label" htmlFor="mdObjetivo-inpdataFinal">Data final:</label>
                                    <input type="date" name="dataFinal" value={formNovoObjetivo.dataFinal} onChange={(event) => handleChangeNovoObjetivo(event)} id="mdObjetivo-inpdataFinal"/>
                                </div>
                                <div className="mdObjetivo-areaInput">
                                    <label className="mdObjetivo-label" htmlFor="mdObjetivo-inpvalorInicial">Valor inicial:</label>
                                    <input type="numeric" name="valorInicial" value={formNovoObjetivo.valorInicial} onChange={(event) => handleChangeNovoObjetivo(event)} id="mdObjetivo-inpvalorInicial"/>
                                </div>
                                <div className="mdObjetivo-areaInput">
                                    <label className="mdObjetivo-label" htmlFor="mdObjetivo-inpvalorFinal">Valor final:</label>
                                    <input type="numeric" name="valorFinal" value={formNovoObjetivo.valorFinal} onChange={(event) => handleChangeNovoObjetivo(event)} id="mdObjetivo-inpvalorFinal"/>
                                </div>
                                <button id="mdObjetivo-btnCalcular" onClick={calcularObjetivo}>Calcular</button>
                            </div>
                        </div>
                        <div className="mdObjetivo-areaCaminhoObjetivo">
                            <div className="mdObjetivo-caminho">
                                {etapasObjetivo.map((etapa, i) => {
                                    return (
                                        <div className="mdObjetivo-etapaCaminho" key={i}>
                                            <p className="competencia">{etapa.competencia}</p>
                                            <div className="elementsCaminho">
                                                <div className="left"></div>
                                                <div className="circule"></div>
                                                <div className="right"></div>
                                            </div>
                                            <p className="meta">{etapa.meta}</p>
                                            <p className="acumulado">{etapa.acumulado}</p>
                                            <p className="performance">23,3%</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mdObjetivo-areaImageTrofeu">
                                <img id="trofeu-image" src={trofeu} alt="trofeu image" />
                            </div>
                        </div>
                    </div>
                    <div className="mdObjetivo-actions">
                        <button id="mdObjetivo-btnCancelar">Cancelar</button>
                        <button id="mdObjetivo-btnAdicionar" onClick={(event) => cadastraNovoObjetivo(event)}>Adicionar</button>
                    </div>
                </div>
            </div>
            <ToastContainer pauseOnHover={false}/>
        </>
    )
}