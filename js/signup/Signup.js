'use strict'

import { $, Auth, Route } from '../Done.js'
import { view } from './signup.view.js'

export class Signup {

    constructor() {

        Auth.checkLogin(false)
 
        this.body = new FormData()

        // Renderiza a pagina de cadastro
        $('#done').innerHTML = view.header

        this.passo1()
    }

    passo1() {

        $('#form').innerHTML = view.passo1

        let nome = $('[name=nome]')

        // Foco no primeiro input do formulario
        nome.focus()

        // Preencher os campos, se possivel
        if (this.body.get('nome'))
            nome.value = this.body.get('nome')

        if (this.body.get('email'))
            $('[name=email]').value = this.body.get('email')

        // Listener para o link de login
        $('#link-login').link()

        // Listener para o botao 'continuar'
        $('#form-continuar').submit(this.passo2.bind(this))
    }

    passo2({ body }) {

        let btn = $('button')

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
        btn.disabled = true

        // Checar se o email informado esta cadastrado
        Auth.checkUser(body.get('email'), user => {

            // Adiciona na propriedade 'body1' as informacoes do passo 1
            this.body.set('nome', body.get('nome'))
            this.body.set('email', body.get('email'))

            if (user) {
                let p = $('p')
                p.innerText = 'E-mail já cadastrado'
                p.style = 'color: rgb(255, 0, 0); font-weight: bold'
                btn.innerHTML = 'Continuar'
                btn.disabled = false
                throw Error(p.innerText)
            }

            // Renderiza o segundo passo do formulario de cadastro
            $('#form').innerHTML = view.passo2

            // Foco no primeiro input do formulario
            $('[name=usuario]').focus()

            // Listener para o link de login
            $('#link-login').link()

            // Listener para o link 'voltar'
            $('#link-voltar').click(this.passo1.bind(this))

            // Listener para o botao 'Criar minha conta'
            $('#form-signup').submit(this.signup.bind(this))
        })
    }

    signup({ body }) {

        let btn = $('button')

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>'
        btn.disabled = true

        // Checar se o usuario informado esta cadastrado
        Auth.checkUser(body.get('usuario'), user => {

            if (user) {
                let p = $('p')
                p.innerText = 'Usuário já cadastrado'
                p.style = 'color: rgb(255, 0, 0); font-weight: bold'
                btn.innerHTML = 'Criar minha conta'
                btn.disabled = false
                throw Error(p.innerText)
            }

            body.append('nome', this.body.get('nome'))
            body.append('email', this.body.get('email'))

            fetch('/api/?signup', { method: 'post', body })
                .then(response => response.json())
                .then(user => {
                    localStorage.setItem('user', JSON.stringify(user))
                    new Route('/tarefas')
                })
                .catch(e => { throw Error(e) })
        })
    }
}
