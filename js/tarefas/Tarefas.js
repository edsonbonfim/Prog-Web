'use strict'

import { $, Auth } from '../Done.js'

export class Tarefas {

    constructor() {
        
        Auth.checkLogin(true)

        this.user = JSON.parse(localStorage.getItem('user'))

        $('body').render('tarefas/tarefas')

        $('h1').innerText = `Ola, ${this.user.nome}`
    }
}
