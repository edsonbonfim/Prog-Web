'use strict'

import { Login } from './auth/Login.js'
import { Signup } from './auth/Signup.js'
import { Dashboard } from './Dashboard.js'

let routes = {
    '/': Login,
    '/signup': Signup,
    '/dashboard': Dashboard
}

export class Route {

    constructor(path) {

        // Muda a URL do browser com o endereco da rota
        window.history.pushState({}, path, window.location.origin + path)

        // Cria uma instancia do componente a ser executado
        let component = new (routes[path])

        // Renderiza o componente
        document.getElementById('page').innerHTML = component.view()

        // Detecta os eventos do componente
        component.events()
    }

    static link(query) {
        document
            .querySelector(query)
            .addEventListener('click', ev => {
                ev.preventDefault()
                new Route(ev.target.getAttribute('href'))
            })
    }
}
