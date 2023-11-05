import './css/MenuLateral.css'
import PropTypes from 'prop-types';
import { GrAdd } from 'react-icons/gr'
import { VscChecklist } from 'react-icons/vsc'
import { LiaTrophySolid } from 'react-icons/lia'
import { FaMoneyCheckDollar } from 'react-icons/fa6'
import { BsGraphUpArrow, BsChevronRight, BsChevronLeft } from 'react-icons/bs'

MenuLateral.propTypes = {
    propToggleExpandirGrid: PropTypes.func,
    menuExpandido: PropTypes.bool
}

export default function MenuLateral({ propToggleExpandirGrid, menuExpandido }) {
    return (
        <>
            <div className="menu-lateral">
                <button id="btn-addRegistro"><GrAdd className="icon-add"/></button>
                <ul>
                    <li>
                        <a href="#">
                            <span><VscChecklist /></span>
                            <p>Checklist</p>
                        </a>
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