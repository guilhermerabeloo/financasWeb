import './css/login.css'
import logo from '../assets/logo.png'

export function Login() {
    return (
        <div className="page-login">
            <div className="area-apresentacao">
                <img className="img-logo" src={logo} alt="Logo da plataforma" />
                <h1 className="text-nomeAplicativo">Finanças Web</h1>
                <p className="text-slogan">Trace metas, defina objetivos e assuma o controle da sua vida financeira sem burocracia!</p>
            </div>
            <div className="area-login">
                <div className="area-header">
                    <p>Ainda não possui conta?</p>
                    <button className="btn-cadastrar">Cadastre-se!</button>
                </div>
                <div className="area-login">
                    <h2>Faça login em Finanças Web</h2>
                    <div className="area-infoLogin">
                        <input id="input-email" type="text" placeholder="Email"/>
                        <input id="input-senha" type="text" placeholder="Senha"/>
                        <p>Esqueci minha senha</p>
                        <button>Acessar</button>
                        <div className="area-manterConectado">
                            <input id="radio-manterConectado" type="checkbox" />
                            <label htmlFor="radio-manterConectado">Continuar conectado</label>
                        </div>
                    </div>
                </div>
                <div className="area-footer">
                    <p>Desenvolvido por Guilherme Rabelo - 2023 ©</p>
                </div>
            </div>
        </div>
    )
}

