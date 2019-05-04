'use strict'

import { $, Auth, Route } from '../Done.js';

export class Login {

    constructor() {

        Auth.checkLogin(false)

        // Renderiza a pagina de login
        $('body').render('login/login')

        this.btn = $('button')

        // Foco no primeiro campo do formulario
        $('[name=user]').focus()

        // Link que carrega a pagina de criar conta
        $('#link-signup').link()

        $('#link-forget').click(a => alert('Este recurso ainda nao esta disponivel'))

        // Evento disparado quando o formulario de login for submetido
        $('form').submit(this.login.bind(this))
    }

    login({ body }) {

        this.btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
        this.btn.disabled = true

        console.log(body.get('user'))

        fetch(`/api?user=${body.get('user')}`)
            .then(response => response.json())
            .then(user => {
                if (!user) this.error('Usuário inválido')
            })

        fetch('/api?login', { method: 'post', body })
            .then(response => response.json())
            .then(user => {
                if (!user)
                    this.error('Senha inválida')

                localStorage.setItem('user', JSON.stringify(user))
                new Route('/tarefas')
            })
    }

    error(msg) {
        let p = $('p')
        p.innerText = msg
        p.style = 'color: red; font-weight: bold'
        this.btn.innerHTML = 'Entrar'
        this.btn.disabled = false
        throw Error(msg)
    }
}
