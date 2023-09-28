import './css/signin.css'
import logo from '../assets/logo.png'
import PropTypes from 'prop-types';

Signin.propTypes = {
    mostrarTelaLogin: PropTypes.bool,
    mudarTela: PropTypes.func,
};

export function Signin({ mostrarTelaLogin, mudarTela }) {
    if(!mostrarTelaLogin) {
        return (
            <div className="page-signin">
                <div className="area-apresentacao">
                    <div className="area-marca">
                        <img className="img-logo" src={logo} alt="Logo da plataforma" />
                        <h1 className="text-nomeAplicativo">Finanças Web</h1>
                    </div>
                    <div className="area-infoMarca">
                        <p className="text-slogan">Trace metas, defina objetivos e assuma o controle da sua vida financeira sem burocracia!</p> 
                    </div>
                </div>
                <div className="area-signin">
                    <div className="area-header">
                        <p className="text-possuiConta">Já possui conta?</p>
                        <button 
                            className="btn-logar"
                            onClick={() => mudarTela(!mostrarTelaLogin)}
                        >
                            Faça login!
                        </button>
                    </div>
                    <div className="area-signin">
                        <div className="area-infoSignin">
                            <div className="area-headerSingin">
                                <img id="logo-signin" className="img-logo" src={logo} alt="Logo da plataforma" />
                                <h2 className="text-tituloSignin">Cadastre-se no Finanças Web</h2>
                            </div>
                            <input id="input-nome" type="text" placeholder="Nome e sobrenome"/>
                            <input id="input-email" type="text" placeholder="Email"/>
                            <input id="input-senha" type="password" placeholder="Senha"/>
                            <input id="input-senhaConfirmacao" type="password" placeholder="Confirme sua senha"/>
                            <button className="btn-cadastrar">Cadastrar</button>
                        </div>
                    </div>
                    <div className="area-footer">
                        <p className="text-footer">Desenvolvido por Guilherme Rabelo - 2023 ©</p>
                    </div>
                </div>
            </div>
        )
    }
}

