'use strict'

import { $, Auth } from '../Done.js'
import { view } from './tarefas.view.js'

export class Tarefas {

    constructor() {
        
        Auth.checkLogin(true)
        
        // Informacoes da sessao do usuario
        this.user = JSON.parse(localStorage.getItem('user'))
        
        $('body').innerHTML = view.user
        
        // lista de tarefas do usuario
        this.tarefas = $('ul#tarefas')

        this.getTarefas()

        $('input[name=titulo]').listener('focus', this.evFormulario.bind(this))
    }

    // Buscas as tarefas do usuario e adiciona na lista de tarefas
    getTarefas() {
        fetch('/api/?tarefas=' + this.user.id_usuario)
            .then(response => response.json())
            .then(tarefas => tarefas.forEach(tarefa => this.appendTarefa(tarefa)))
    }

    // Adiciona uma tarefa na lista de tarefas
    appendTarefa(tarefa) {
        let elem = document.createElement('li');
        elem.innerHTML = /*html*/`
            <li>
                <div class="header">
                    ${tarefa.titulo}
                </div>
                <div class="main">
                    ${tarefa.descricao}
                </div>
            </li>
        `
        this.tarefas.appendChild(elem)
    }

    evFormulario({ target, callback }) {

        target.removeEventListener('focus', callback, true)

        target.placeholder = "Titulo..."

        let mais = document.createElement('div')
        mais.innerHTML = view.mais

        let form = target.parentNode
        form.appendChild(mais)
    }
}
