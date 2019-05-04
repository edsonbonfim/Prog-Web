'use strict'

export { $, Route, Auth }

function $(q) {
    return new Proxy(new Done(q), {
        get: (alvo, nome) => {
            return nome in alvo ? alvo[nome] : alvo.elem[nome]
        },
        set: (alvo, nome, valor) => {
            if (nome in alvo)
                alvo[nome] = valor
            else
                alvo.elem[nome] = valor
            return valor
        }
    })
}

class Done {

    constructor(q) {
        this.elem = document.querySelector(q)
    }

    render(url) {
        let http = new XMLHttpRequest()
        http.open('get', '/js/' + url + '.html', false)
        http.send(null)
        this.elem.innerHTML = http.response
    }

    focus() {
        return this.elem.focus()
    }

    removeAttribute(att) {
        return this.elem.removeAttribute(att)
    }

    link() {
        this.elem.addEventListener('click', ev => {
            ev.preventDefault()
            new Route(ev.target.getAttribute('href'))
        })
    }

    submit(callback) {
        this.elem.addEventListener('submit', ev => {
            ev.preventDefault()
            let form = ev.target
            let body = new FormData(form)
            callback({ ev, form, body })
        })
    }

    click(callback) {
        this.elem.addEventListener('click', ev => {
            ev.preventDefault()
            callback(ev.target)
        })
    }
}

class Route {

    constructor(path) {

        // Muda a URL do browser com o endereco da rota
        window.history.pushState({}, path, window.location.origin + path)

        // Cria uma instancia do componente a ser executado
        new (Route.routes[path])
    }

    static register(routes) {
        Route.routes = routes
    }
}

class Auth {

    static checkLogin(status) {

        let user = localStorage.getItem('user')

        if (status && user === null) {
            new Route('/')
            throw ''
        }

        if (!status && user !== null) {
            new Route('/tarefas')
            throw ''
        }
    }

    static checkUser(user, callback) {
        fetch('/api?user=' + user)
            .then(response => response.json())
            .then(user => callback(user))
            .catch(e => { throw Error(e) })
    }
}
