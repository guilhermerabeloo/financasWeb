import { BsPencilSquare, BsBackspace } from "react-icons/bs";
import { useEffect, useState } from "react";
import { api } from '../lib/api';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import './css/Checklist.css'

export default function Checklist() {
    const [ itensChecklist, setItensChecklist ] = useState([]);
    const [ novoItemChecklist, setNovoItemChecklist ] = useState({email: '', item: '', valor: '' , dia_mes: ''});

    const email = decodeURIComponent(Cookies.get('userEmail'));
    useEffect(() => {
        async function getItensChecklist() {
            try {
                const response = await api.get(`/checklistUsuario/${email}`)
                const data = response.data.data;

                setItensChecklist(data)
            } catch(error) {
                console.log(error)
            }
        }
        getItensChecklist()
    }, [email])

    const handleChangeNovoItem = (event) => {
        const { name, value } = event.target
        const emailCookie = decodeURIComponent(Cookies.get('userEmail'));

        const item = {...novoItemChecklist};

        item['email'] = emailCookie;
        item[name] = value;

        setNovoItemChecklist(item)
    }

    const cadastraNovoItem = async (event) => {
        event.preventDefault();

        if(!novoItemChecklist.email || !novoItemChecklist.item || !novoItemChecklist.valor || !novoItemChecklist.dia_mes) {
            toast.warn('Há campos ainda não preenchidos.', {
                autoClose: 3000,
            });
            return
        }

        try {
            await api.post(
                    '/criaItemChecklist',
                    {
                        email: novoItemChecklist.email,
                        item: novoItemChecklist.item,
                        valor: novoItemChecklist.valor,
                        dia_mes: novoItemChecklist.dia_mes
                    }
                )
        } catch(err) {
            console.log(err)
            toast.error('Erro ao cadastrar o item.', {
                autoClose: 3000,
            });
        }
    }

    return (
        <>
            <div className="container-checklist">
                <div className="area-tituloChecklist">
                    <h3 className="titulo-checklist">Checklist de gastos mensais</h3>
                </div>
                <div className="content-checklist">
                    <div className="area-checklist">
                        <div className="checklist">
                            <table className="itens-checklist">
                                <thead>
                                    <tr>
                                        <th style={{width: "10%"}}></th>
                                        <th style={{width: "40%", textAlign: "start"}}>Item</th>
                                        <th style={{width: "20%"}}>Valor</th>
                                        <th style={{width: "20%"}}>Dia do mês</th>
                                        <th style={{width: "10%"}}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itensChecklist.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td><input type="checkbox" id={item.id} checked={item.checked}/></td>
                                                <td>{item.item}</td>
                                                <td style={{textAlign: "center"}}>R$ {item.valor}</td>
                                                <td style={{textAlign: "center"}}>{item.dia_mes}</td>
                                                <td style={{textAlign: "center"}}><BsPencilSquare /><BsBackspace /></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="area-checklistInfo">
                        <div className="area-totalizadoresChecklist">
                            <div className="area-totalGastoChecklist">
                                <div className="area-IconTotalizadoresChecklist">
                                    1
                                </div>
                                <div className="area-valoresTotalizadoresChecklist">
                                    2
                                </div>
                            </div>
                            <div className="area-valorPendenteChecklist">
                                <div className="area-IconTotalizadoresChecklist">
                                    3
                                </div>
                                <div className="area-valoresTotalizadoresChecklist">
                                    4   
                                </div>
                            </div>
                        </div>
                        <div className="area-novoItemChecklist">
                            <div className="area-addItemChecklist">
                                <h4>Adicionar novo item</h4>
                                <form className="form-addItem">
                                    <div className="area-nomeNovoItem">
                                        <label htmlFor="nomeNovoItem">Item</label>
                                        <input onChange={handleChangeNovoItem} name="item" type="text" id="nomeNovoItem" placeholder="Ex: Conta de luz"/>
                                    </div>
                                    <div className="area-valorDia">
                                        <div className="area-valor">
                                            <label htmlFor="valorNovoItem">Valor</label>
                                            <input onChange={handleChangeNovoItem} name="valor" type="number" id="valorNovoItem" placeholder="R$ 0,00"/>
                                        </div>
                                        <div className="area-dia">
                                            <label htmlFor="diaNovoItem">Dia</label>
                                            <input onChange={handleChangeNovoItem} name="dia_mes" type="number" id="diaNovoItem" placeholder="Ex: 30"/>
                                        </div>
                                    </div>
                                    <button id="btn-addNovoItemChecklist" onClick={(event) => cadastraNovoItem(event)}>Adicionar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer pauseOnHover={false}/>
            </div>
        </>
    )
}