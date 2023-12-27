import './css/Header.css'
import user from '../assets/user.jpeg';
import logo from '../assets/logo.png'
import { BiExit } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Header() {
    const navigate = useNavigate();

    const logout = () => {
        Cookies.remove('token')
        Cookies.remove('username')
        Cookies.remove('userEmail')

        navigate('/entrar');
    }
    const username = decodeURIComponent(Cookies.get('username'));

    return (
        <div className="header">
            <div className="header-infoEmpresa">
                <img className="img-logo" src={logo} alt="Logo da plataforma" />
                <h1>Finanças Web</h1>
            </div>
            <div className="header-infoUsuario">
                <div><img id="user-image"src={user} alt="" /></div>
                <p>{username}</p>
                <BiExit className='icon-exit' onClick={logout}/>
            </div>
        </div>
    )
}