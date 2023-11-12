import './css/login.css'
import logo from '../assets/logo.png'
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useAuth } from '../lib/AuthContext';
import { api } from '../lib/api';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

Login.propTypes = {
    mostrarTelaLogin: PropTypes.bool,
    mudarTela: PropTypes.func,
};

export function Login({ mostrarTelaLogin, mudarTela }) {
    const [ validacaoFormulario, setValidacaoFormulario ] = useState({
        email: false,
        senha: false
    });
    const [ formLogin, setFormLogin ] = useState({
        email: '',
        senha: ''
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChangeForm = (event) => {
        const { id, value } = event.target;
        const form = {...formLogin};
        form[id] = value;

        setFormLogin(form)
    }

    const validaUsuario = async () => {
        const campos = Object.keys(validacaoFormulario);

        const validacao = {...validacaoFormulario};
        let erroDePrenchimento = false;
        campos.forEach((campo) => {
            if(formLogin[campo] == '') {
                validacao[campo] = true;
                erroDePrenchimento = true;
            } else {
                validacao[campo] = false;
            }
        });
        setValidacaoFormulario(validacao);

        if(erroDePrenchimento) {
            toast.error('Erro no preenchimento do formulário', {
                autoClose: 2000,
            });

            return
        }

        try {
            const response = await api.post(
                '/login',
                {
                    Email: formLogin.email,
                    Senha: formLogin.senha
                }
            )
            const token = response.data.token;
            login(token);
            Cookies.set('token', token, {expires: 3});

            navigate('/home');
        } catch(err) {  
            console.log('catch')
            if(err.response.data.hint == 'Email não cadastrado') {
                toast.error('Email incorreto', {
                    autoClose: 2000,
                });
                return
            }

            if(err.response.data.hint == 'Senha inválida') {
                toast.error('Senha incorreta', {
                    autoClose: 2000,
                });
                return
            }

            toast.error('Erro ao fazer login', {
                autoClose: 2000,
            });
        }
    }

    if(mostrarTelaLogin) {
        return (
            <div className="page-login">
                <div className="area-apresentacao">
                    <div className="area-marca">
                        <img className="img-logo" src={logo} alt="Logo da plataforma" />
                        <h1 className="text-nomeAplicativo">Finanças Web</h1>
                    </div>
                    <div className="area-infoMarca">
                        <p className="text-slogan">Trace metas, defina objetivos e assuma o controle da sua vida financeira sem burocracia!</p> 
                    </div>
                </div>
                <div className="area-login">
                    <div className="area-header">
                        <p className="text-possuiConta">Ainda não possui conta?</p>
                        <button 
                            className="btn-cadastrar"
                            onClick={() => mudarTela(!mostrarTelaLogin)}
                        >
                            Cadastre-se!
                        </button>
                    </div>
                    <div className="area-login">
                        <div className="area-infoLogin">
                            <div className="area-headerLogin">
                                <img id="logo-login" className="img-logo" src={logo} alt="Logo da plataforma" />
                                <h2 className="text-tituloLogin">Faça login no Finanças Web</h2>
                            </div>
                            <input id="email" className={validacaoFormulario['email'] ? `erro` : ''} type="text" placeholder="Email" onChange={handleChangeForm}/>
                            <input id="senha" className={validacaoFormulario['senha'] ? `erro` : ''} type="password" placeholder="Senha" onChange={handleChangeForm}/>
                            <p className="text-esqueciSenha">Esqueci minha senha</p>
                            <button className="btn-acessar" onClick={validaUsuario}>Acessar</button>
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
}

