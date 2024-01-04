import './css/MenuLateral.css'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { GrAdd } from 'react-icons/gr'
import { VscChecklist } from 'react-icons/vsc'
import { LiaTrophySolid } from 'react-icons/lia'
import { FaMoneyCheckDollar } from 'react-icons/fa6'
import { BsGraphUpArrow, BsChevronRight, BsChevronLeft } from 'react-icons/bs'
import { ModalMovimento } from './ModalCadastroMovimento';
import { useState } from 'react';

MenuLateral.propTypes = {
    propToggleExpandirGrid: PropTypes.func,
    menuExpandido: PropTypes.bool
}

export default function MenuLateral({ propToggleExpandirGrid, menuExpandido }) {
    const [ modalActive, setModalActive ] = useState(false);

    return (
        <>
            <div className="menu-lateral">
                <ModalMovimento 
                    modalOn={modalActive}
                    closeMovimento={() => setModalActive(!modalActive)}
                />
                <button id="btn-addRegistro" onClick={() => setModalActive(true)}><GrAdd className="icon-add"/></button>
                <ul>
                    <li>
                        <Link to="/checklist">
                            <span><VscChecklist /></span>
                            <p>Checklist</p>
                        </Link>
                    </li>
                    <li>
                        <a href="#">
                            <span><LiaTrophySolid /></span>
                            <p>Objetivos</p>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span><FaMoneyCheckDollar /></span>
                            <p>Extrato</p>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span><BsGraphUpArrow /></span>
                            <p>Relatórios</p>
                        </a>
                    </li>
                </ul>
                <div className="area-expandeMenu">
                    <button onClick={() => propToggleExpandirGrid()} id="btn-expandeMenu" className={`${menuExpandido ? 'menuExpandido' : ''}`}><BsChevronRight /></button>
                    <button onClick={() => propToggleExpandirGrid()} id="btn-recuaMenu" className={`${!menuExpandido ? 'menuExpandido' : ''}`}><BsChevronLeft /></button>
                </div>
            </div>
        </>
    )
}