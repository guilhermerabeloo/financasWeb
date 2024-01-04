import './css/Header.css'
import user from '../assets/user.jpg';
import logo from '../assets/logo.png'
import Cookies from 'js-cookie';
import { BiExit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

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
            <Link className="header-infoEmpresa" to="/home">
                <img className="img-logo" src={logo} alt="Logo da plataforma" />
                <h1>Finanças Web</h1>
            </Link>
            <div className="header-infoUsuario">
                <div><img id="user-image"src={user} alt="" /></div>
                <p>{username}</p>
                <BiExit className='icon-exit' onClick={logout}/>
            </div>
        </div>
    )
}