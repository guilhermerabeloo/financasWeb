import './css/signin.css'
import logo from '../assets/logo.png'
import PropTypes from 'prop-types';
import { api } from '../lib/api';
import { useState } from 'react';
import { toast } from 'react-toastify';

Signin.propTypes = {
    mostrarTelaLogin: PropTypes.bool,
    mudarTela: PropTypes.func,
};

export function Signin({ mostrarTelaLogin, mudarTela }) {
    const [ erroNoPrenchimento, setErroNoPreenchimento ] = useState(false);
    const [ validacaoFormulario, setValidacaoFormulario ] = useState({
        nome: false,
        email: false,
        senha: false,
        confirmaSenha: false
    });
    const [ formSign, setFormSign ] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmaSenha: ''
    });

    const handleChangeForm = (event) => {
        const { id, value } = event.target;
        const form = {...formSign};
        form[id] = value;

        setFormSign(form)
    }

    const cadastraUsuario = async () => {
        const campos = Object.keys(validacaoFormulario);

        const validacao = {...validacaoFormulario};
        let erroDePrenchimento = false;
        campos.forEach((campo) => {
            if(formSign[campo] == '') {
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
            setErroNoPreenchimento(false);

            return
        }

        if(formSign.senha !== formSign.confirmaSenha) {
            toast.error('As senhas digitadas não correspondem', {
                autoClose: 2000,
            });
            return
        }

        try {
            const response = await api.post(
                '/singin',
                {
                    Nome: formSign.nome,
                    Email: formSign.email,
                    Senha: formSign.senha
                }
            )

            if(response.data.code == 400) {
                toast.error('O email digitado já está em uso', {
                    autoClose: 2000,
                });
                return
            }
            mudarTela(!mostrarTelaLogin)
            toast.success('Usuário cadastrado com sucesso!', {
                autoClose: 2000,
            });
        } catch(err) {
            console.log(err)
            toast.error('Erro ao cadastrar usuário', {
                autoClose: 2000,
            });
        }
    }

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
                            <input id="nome" className={validacaoFormulario['nome'] ? `erro` : ''} type="text" placeholder="Nome e sobrenome" onChange={handleChangeForm}/>
                            <input id="email" className={validacaoFormulario['email'] ? `erro` : ''} type="text" placeholder="Email" onChange={handleChangeForm}/>
                            <input id="senha" className={validacaoFormulario['senha'] ? `erro` : ''} type="password" placeholder="Senha" onChange={handleChangeForm}/>
                            <input id="confirmaSenha" className={validacaoFormulario['confirmaSenha'] ? `erro` : ''} type="password" placeholder="Confirme sua senha" onChange={handleChangeForm}/>
                            <button className="btn-cadastrar" onClick={cadastraUsuario}>Cadastrar</button>
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

