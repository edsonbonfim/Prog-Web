class Tarefas
{
    constructor()
    {
        this._lista = document.querySelector('#lista')
    }

    login(ev, form)
    {
        ev.preventDefault()

        fetch('/api/login.php', {
            method: 'post',
            body: new FormData(form)
        })
        .then(response => response.json())
        .then(data => {
            window.location = '/dashboard.php'
        })
        .catch(e => console.log(e))
    }

    logout()
    {
        fetch('/api/logout.php')
            .then(response => {
                window.location = '/'
            })
            .catch(e => console.log(e))
    }

    get()
    {
        fetch('/api/get.php')
            .then(response => response.json())
            .then(data => {
                this._lista.innerHTML = "";
                data.forEach(tarefa => this.addTarefa(tarefa))
            })
            .catch(e => console.log(e))
    }

    add(ev, form)
    {
        ev.preventDefault()

        fetch('/api/add.php', {method: 'post', body: new FormData(form)})
            .then(response => response.json())
            .then(data => {
                this.addTarefa(data)
                form.reset()
            })
            .catch(e => console.log(e))
    }

    del(id)
    {
        let data = new FormData()
        data.append('id', id)

        fetch(`/api/del.php`, {method: 'post', body: data})
            .then(() => document.querySelector('#li'+id).remove())
            .catch(e => console.log(e))
    }

    edit(id)
    {
        console.log('oi');
    }

    addTarefa(tarefa)
    {
        let li = document.createElement('li')

        li.innerHTML = `<li id="li${tarefa.id}" class="task" ondblclick="app.edit(this, ${tarefa.id})">
                            ${tarefa.descricao}
                            <a class="del" onclick="app.del(${tarefa.id})"><i class="material-icons">clear</i></a>
                        </li>`

        this._lista.appendChild(li)
    }
}
