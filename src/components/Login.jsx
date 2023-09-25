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
                    <p className="text-possuiConta">Ainda não possui conta?</p>
                    <button className="btn-cadastrar">Cadastre-se!</button>
                </div>
                <div className="area-login">
                    <div className="area-infoLogin">
                        <h2 className="text-tituloLogin">Faça login em Finanças Web</h2>
                        <input id="input-email" type="text" placeholder="Email"/>
                        <input id="input-senha" type="text" placeholder="Senha"/>
                        <p className="text-esqueciSenha">Esqueci minha senha</p>
                        <button className="btn-acessar">Acessar</button>
                        <div className="area-manterConectado">
                            <input id="radio-manterConectado" type="checkbox" />
                            <label htmlFor="radio-manterConectado">Continuar conectado</label>
                        </div>
                    </div>
                </div>
                <div className="area-footer">
                    <p className="text-footer">Desenvolvido por Guilherme Rabelo - 2023 ©</p>
                </div>
            </div>
        </div>
    )
}

