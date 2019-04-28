'use strict'

import { Route } from './Route.js'

export class Component {
    events() { }

    view() {
        return ""
    }

    element(query) {
        return document.querySelector(query)
    }

    link(query) {
        Route.link(query)
    }

    submit(query, callback) {
        this.element(query)
            .addEventListener('submit', ev => {
                ev.preventDefault()
                let body = new FormData(ev.target)
                callback({ form: ev.target, body })
            })
    }
}
