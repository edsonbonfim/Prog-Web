'use strict'

import { Component } from '../Component.js';
import { Route } from '../Route.js'
import { Auth } from './Auth.js'

export class Login extends Component {

    constructor() {
        super()
        Auth.checkLogin(false)
    }

    events() {

        // Foco no primeiro campo do formulario ao carregar componente
        super.element('[name=login]').focus();

        // Link que carrega a pagina de criar conta
        super.link('#link-signup')

        // Evento disparado quando o formulario de login for submetido
        super.submit('#form-login', this.login)
    }

    login({ body }) {

        console.log(body.get('login'))
        console.log(body.get('senha'))

        fetch('http://localhost:3000/auth/login', { method: 'post', body })
            .then(response => response.json())
            .then(response => {
                if (!response.status) {
                    let msg = document.getElementById('msg')
                    msg.innerText = response.statusText
                    msg.style = 'color: red; font-weight: bold'
                    throw Error(response.statusText)
                }
                localStorage.setItem('user', JSON.stringify(response.user))
                new Route('/dashboard')
            })
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
            
                <form id="form-login">
                    <input type="text" name="login" placeholder="E-mail ou usuário" autocomplete="off">
                    <input type="password" name="senha" placeholder="Senha">
                    <input type="submit" class="btn" value="Entrar">
                </form>
            
                <div class="text">
                    <a href="/signup" id="link-signup">Criar uma conta</a>
                </div>
            </div>
        `
    }
}
