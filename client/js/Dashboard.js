'use strict'

import { Component } from './Component.js'
import { Auth } from './auth/Auth.js'

export class Dashboard extends Component {

    constructor() {
        super()
        Auth.checkLogin(true);
        this.user = JSON.parse(localStorage.getItem('user'))
    }

    events() {
        super.element('h1').innerText = 'Ola, ' + this.user.nome
    }

    view() {
        return /*html*/`
            <h1></h1>
        `
    }
}
