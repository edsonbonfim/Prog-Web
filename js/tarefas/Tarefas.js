'use strict'

import { $, Auth } from '../Done.js'
import { view } from './tarefas.view.js'

export class Tarefas {

    constructor() {
        
        Auth.checkLogin(true)

        this.user = JSON.parse(localStorage.getItem('user'))

        $('body').innerHTML = view.user

        $('h1').innerText = `Ola, ${this.user.nome}`
    }
}
