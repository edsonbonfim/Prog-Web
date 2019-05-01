'use strict'

import { $, Auth, Route } from '../Done.js';

export class Login {

    constructor() {

        Auth.checkLogin(false)

        // Renderiza a pagina de login
        $('body').render('login/login')

        // Foco no primeiro campo do formulario
        $('[name=login]').focus()

        // Link que carrega a pagina de criar conta
        $('#link-signup').link()

        $('#link-forget').click(a => alert('Este recurso ainda nao esta disponivel'))

        // Evento disparado quando o formulario de login for submetido
        $('form').submit(this.login.bind(this))
    }

    login({ body }) {

        fetch('http://localhost:3000/auth/login', { method: 'post', body })
            .then(response => response.json())
            .then(response => {
                if (!response.status) {
                    let msg = $('p')
                    msg.innerText = response.statusText
                    msg.style = 'color: red; font-weight: bold'
                    throw Error(response.statusText)
                }
                localStorage.setItem('user', JSON.stringify(response.user))
                new Route('/tarefas')
            })
    }
}
