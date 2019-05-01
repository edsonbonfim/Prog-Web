'use strict'

import { $, Auth } from '../Done.js'
import { Login } from '../login/Login.js'

export class Signup {

    constructor() {

        Auth.checkLogin(false)

        this.body = new FormData()

        // Renderiza a pagina de cadastro
        $('body').render('signup/signup')

        this.passo1()
    }

    passo1() {

        // Renderiza o primeiro passo do formulario de cadastro
        $('#form').render('signup/passo1')

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

        // Checar se o email informado esta cadastrado
        Auth.checkUser(body.get('email'), user => {

            // Adiciona na propriedade 'body1' as informacoes do passo 1
            this.body.set('nome', body.get('nome'))
            this.body.set('email', body.get('email'))

            if (user) {
                let p = $('p')
                p.innerText = 'E-mail já cadastrado'
                p.style = 'color: rgb(255, 0, 0); font-weight: bold'
                throw Error(p.innerText)
            }

            // Renderiza o segundo passo do formulario de cadastro
            $('#form').render('signup/passo2')

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

        // Checar se o usuario informado esta cadastrado
        Auth.checkUser(body.get('usuario'), user => {

            if (user) {
                let p = $('p')
                p.innerText = 'Usuário já cadastrado'
                p.style = 'color: rgb(255, 0, 0); font-weight: bold'
                throw Error(p.innerText)
            }

            body.append('nome', this.body.get('nome'))
            body.append('email', this.body.get('email'))

            fetch('http://localhost:3000/auth/signup', { method: 'post', body })
                .then(response => response.json())
                .then(() => {
                    body.append('login', body.get('usuario'))
                    let login = new Login()
                    login.login({ body })
                })
                .catch(e => { throw Error(e) })
        })
    }
}
