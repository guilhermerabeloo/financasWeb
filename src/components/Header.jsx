import './css/Header.css'
import user from '../assets/user.jpeg';
import logo from '../assets/logo.png'
import { BiExit } from "react-icons/bi";

export default function Header() {
    return (
        <>
            <div className="header">
                <div className="header-infoEmpresa">
                    <img className="img-logo" src={logo} alt="Logo da plataforma" />
                    <h1>Finanças Web</h1>
                </div>
                <div className="header-infoUsuario">
                    <div><img id="user-image"src={user} alt="" /></div>
                    <p>Guilherme Rabelo</p>
                    <BiExit className='icon-exit'/>
                </div>
            </div>
        </>
    )
}