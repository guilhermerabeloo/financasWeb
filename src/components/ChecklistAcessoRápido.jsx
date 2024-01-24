import './css/ChecklistAcessoRapido.css'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { api } from '../lib/api';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsArrowRight } from 'react-icons/bs';

export default function ChecklistAcessoRapido() {
    const [ itensChecklist, setItensChecklist ] = useState([]);
    const [ atualizaTabela, setAtualizaTabela ] = useState(false)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, atualizaTabela]);

    const marcaItemChecklist = async (event) => {
        const itemMarcado = itensChecklist.find(objeto => objeto.id == event.target.id);
        const { id, dia_mes, checked } = itemMarcado;

        const date = new Date();
        const ano = date.getFullYear();
        const mes = date.getMonth() + 1;
        const dataItemChecklist = `${ano}${mes < 10 ? '0'+mes : mes}${dia_mes < 10 ? '0'+dia_mes : dia_mes}`

        const emailCk = decodeURIComponent(Cookies.get('userEmail'));

        if(checked) {
            try {
                await api.post(
                    '/desmarcaItemChecklist',
                    {
                        checklistmensal_id: id,
                        email: emailCk
                    }
                )
                    
                toast.success('Checklist atualizado com sucesso!', {
                    autoClose: 1000,
                });
            } catch(err) {
                console.log(err)
                toast.error('Erro ao desmarcar o item.', {
                    autoClose: 3000,
                });
            }
        } else {
            try {
                await api.post(
                    '/marcaItemChecklist',
                    {
                        checklistmensal_id: id,
                        data: dataItemChecklist,
                        email: emailCk
                    }
                )
    
                toast.success('Checklist atualizado com sucesso!', {
                    autoClose: 1000,
                });
            } catch(err) {
                console.log(err)
                toast.error('Erro ao marcar o item.', {
                    autoClose: 3000,
                });
            }
        }

        setAtualizaTabela(!atualizaTabela)
    }

    return (
        <>
            <div className="checklist container-acessoRapido">
                <div className="checklist-titulo">
                    <h4>Checklist</h4>
                </div>
                <div className="checklistAr-content">
                    {itensChecklist.map((item) => {
                        return (
                            <div key={item.id} className="item-checklist">
                                <div className="item">
                                    <input type="checkbox" id={item.id} checked={item.checked} onChange={(event) => {marcaItemChecklist(event)}}/>
                                    <label>
                                        <span>{item.dia_mes} - </span>{item.item}
                                    </label>
                                </div>
                                <p>R$ {item.valor}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="checklist-seguirLink">
                    <Link to="/checklist" className='link-checklist'>
                        <BsArrowRight />
                    </Link>
                </div>
            </div>
            <ToastContainer pauseOnHover={false}/>
        </>
    )
}