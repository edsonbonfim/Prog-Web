'use strict'

import { $$, Auth } from '../Done.js'
import { view } from './tarefas.view.js'

export class Tarefas {

    constructor() {

        Auth.checkLogin(true)

        // Informacoes da sessao do usuario
        this.user = JSON.parse(localStorage.getItem('user'))

        $$('body').innerHTML = view.tarefas

        // lista de tarefas do usuario
        this.tarefas = $$('ul#tarefas')

        $$('form').submit(this.newTarefa.bind(this))

        this.getTarefas()
    }

    newTarefa({ form, body }) {

        body.append('user', this.user.id_usuario)

        fetch('/api/?acao=addTarefa', { method: 'post', body })
            .then(response => response.json())
            .then(tarefa => {
                this.appendTarefa(tarefa)
                form.reset()
            })
    }

    // Buscas as tarefas do usuario e adiciona na lista de tarefas
    getTarefas() {
        fetch('/api/?acao=getTarefas&user=' + this.user.id_usuario)
            .then(response => response.json())
            .then(tarefas => tarefas.forEach(tarefa => this.appendTarefa(tarefa)))
    }

    formatData(data) {
        let dateTimeParts = data.split(/[- :]/);
        dateTimeParts[1]--;
        return new Date(...dateTimeParts);
    }

    // Adiciona uma tarefa na lista de tarefas
    appendTarefa(tarefa) {
        const inicio = this.formatData(tarefa.inicio)
        const fim = this.formatData(tarefa.fim)

        let elem = document.createElement('li');
        elem.id = 'id-' + tarefa.id_tarefa
        elem.innerHTML = `
            ${tarefa.descricao}
            <span>
                De:
                ${this.addZero(inicio.getDate())}/${this.addZero(inicio.getMonth() + 1)}/${inicio.getFullYear()} (${this.addZero(inicio.getHours())}:${this.addZero(inicio.getUTCMinutes())})
                até:
                ${this.addZero(fim.getDate())}/${this.addZero(fim.getMonth() + 1)}/${fim.getFullYear()} (${this.addZero(fim.getHours())}:${this.addZero(fim.getUTCMinutes())})
            </span>
            <i class="fas fa-times"></i>
        `
        this.tarefas.appendChild(elem)

        $$('#id-' + tarefa.id_tarefa + ' i').click(() => {
            this.remove(elem)
        })
    }

    addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    remove(li) {
        let id = li.id.replace('id-', '')
        fetch('/api/?acao=delTarefa&tarefa=' + id)
            .then(() => {
                li.remove();
            })
    }
}