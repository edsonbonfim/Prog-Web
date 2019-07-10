'use strict'

export { $$, Route, Auth }

function $$(q) {
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

    render(url, callback) {

        let progress = document.createElement('progress')

        let http = new XMLHttpRequest()

        http.open('GET', '/js/' + url + '.html', true)

        http.onprogress = e => {
            if (e.lengthComputable) {
                progress.max = e.total
                progress.value = e.loaded
            }
        }

        http.onloadstart = e => {
            progress.value = 1
            document.body.appendChild(progress)
        }

        http.onloadend = e => {
            progress.value = e.loaded
            progress.remove()
        }

        http.onreadystatechange = () => {
            if (http.readyState == 4 && http.status == 200) {
                callback(this.elem, http.response)
            }
        }

        http.send(null)
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

    listener(name, callback) {
        this.elem.addEventListener(name, function __callback(event) {
            event.preventDefault()
            callback({event, target: event.target, callback: __callback})
        }, true)
    }

    click(callback) {
        this.elem.addEventListener('click', ev => {
            ev.preventDefault()
            callback(ev.target)
        })
    }

    appendChild(child) {
        return this.elem.appendChild(child)
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
        fetch('/api/?acao=getUser&user=' + user)
            .then(response => response.json())
            .then(user => callback(user))
            .catch(e => { throw Error(e) })
    }
}
