'use strict'

import { Component } from '../Component.js'
import { Login } from './Login.js'
import { Auth } from './Auth.js'

export class Signup extends Component {

    constructor() {
        super()
        Auth.checkLogin(false)
    }

    events() {

        // Foco no primeiro campo do formulario ao carregar componente
        super.element('[name=nome]').focus();

        // Link para a pagina de login
        super.link('#link-login')

        // Evento disparado quando o formulario for submetido
        super.submit('#form-signup', this.signup)
    }

    signup({ form, body }) {

        fetch('http://localhost:3000/auth/signup', { method: 'post', body })
            .then(response => response.json())
            .then(response => {
                if (!response.status) {
                    let msg = document.getElementById('msg')
                    msg.innerText = response.statusText
                    msg.style = "color: red; font-weight: bold";
                    throw Error(response.statusText)
                }

                // Se realizar o cadastro, o login sera efetuado na sequencia
                body.append('login', body.get('usuario'))
                
                let login = new Login()
                login.login({ form, body })
            })
            .catch(e => { throw Error(e) })
    }

    view() {
        return /*html*/`
            <header>
                <img src="img/logo-login.png" alt="Done">
            </header>

            <div class="content">
                <div class="text">
                    <a href="/" id="msg">Não pense por muito tempo; faça.</a>
                </div>

                <form id="form-signup">
                    <input type="text" name="nome" placeholder="Nome Completo" autocomplete="off">
                    <input type="text" name="usuario" placeholder="Usuário" autocomplete="off">
                    <input type="text" name="email" placeholder="E-mail" autocomplete="off">
                    <input type="password" name="senha" placeholder="Senha">
                    <input type="submit" class="btn" value="Criar minha conta">
                </form>

                <div class="text">
                    <a href="/" id="link-login">Fazer login</a>
                </div>
            </div>
        `
    }
}
