import './css/ModalTags.css'
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react'
import { api } from '../lib/api';

ModalTags.propTypes = {
    infoMovimento: PropTypes.object,
    selecaoTagOn: PropTypes.bool,
    tagSelecionada: PropTypes.bool,
    closeSelecao: PropTypes.func,
    selecionaTag: PropTypes.func,
    informaTagSelecionada: PropTypes.func,
    informaTagMovimento: PropTypes.func
}

export default function ModalTags({ selecaoTagOn, closeSelecao, selecionaTag, tagSelecionada, informaTagSelecionada, infoMovimento, informaTagMovimento }) {
    const [ tags, setTags ] = useState([]);

    const email = decodeURIComponent(Cookies.get('userEmail'));
    useEffect(() => {
        async function buscaTags() {
            const response = await api.get(`/listaTags/${email}`);
            const data = response.data.data;
            setTags(data)
        }

        buscaTags()
    }, [email])

    const selecionarTag = (event) => {
        const data = event.currentTarget.id;
        const selecionado = tags.filter((tag) => tag.id == data);
        const movimento = {...infoMovimento};
        movimento.tag = data;

        informaTagMovimento(movimento);
        informaTagSelecionada(selecionado[0]);
        closeSelecao(false)
        if(!tagSelecionada) {
            selecionaTag(true)
        }
    }

    return (
        <>
            <div className={`container-modalTags ${selecaoTagOn ? '' : 'hide'}`}>
                {tags.map((tag) => {
                    return (
                        <div 
                            key={tag.id} 
                            className="mdTags-tag" 
                            id={tag.id}
                            onClick={(event) => selecionarTag(event)}>
                            <div className="mdTags-tag-item"><span style={{backgroundColor: tag.corfundo, color: tag.corletra}}>{tag.tag}</span></div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}