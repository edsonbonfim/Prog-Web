class Done
{
    static signup(event) {

        event.preventDefault();

        let body = new FormData(event.target);

        fetch('/mvc/view/signup.php', {method: 'post', body})
            .then(response => response.json())
            .then(data => {
                if (!data.status) {
                    let msg = document.getElementById('msg');
                    msg.innerText = data.statusText;
                    msg.style = "color: red; font-weight: bold";
                    throw Error(data.statusText);
                }
                Done.login(event)
            })
            .catch(e => console.log(e))
    }

    static login(event) {

        event.preventDefault()

        let body = new FormData(event.target)

        fetch('/api/login.php', {method: 'post', body})
            .then(response => response.json())
            .then(data => {
                if (!data.status) {
                    let msg = document.getElementById('msg');
                    msg.innerText = data.statusText;
                    msg.style = "color: red; font-weight: bold";
                    throw Error(data.statusText);
                }
                localStorage.setItem('user', JSON.stringify(data.user))
                window.location = "/dashboard.php";
            })
            .catch(e => console.log(e))
    }

    static logout(event) {

        event.preventDefault()

        fetch('/api/logout.php')
            .then(() => {
                localStorage.clear()
                window.location = '/'
            })
            .catch(e => console.log(e))
    }

    static dashboard()
    {
        fetch('/api/get.php')
            .then(response => response.json())
            .then(data => {
                document.getElementById('lista').innerHTML = "";
                data.forEach(tarefa => Done.addTarefa(tarefa))
            })
            .catch(e => console.log(e))
    }

    static add(ev, form)
    {
        ev.preventDefault()

        fetch('/api/add.php', {method: 'post', body: new FormData(form)})
            .then(response => response.json())
            .then(data => {
                Done.addTarefa(data)
                form.reset()
            })
            .catch(e => console.log(e))
    }

    static del(id)
    {
        let data = new FormData()
        data.append('id', id)

        fetch(`/api/del.php`, {method: 'post', body: data})
            .then(() => document.querySelector('#li'+id).remove())
            .catch(e => console.log(e))
    }

    static edit(id)
    {
        console.log('oi');
    }

    static addTarefa(tarefa)
    {
        let li = document.createElement('li')

        li.innerHTML = `<li id="li${tarefa.id}" class="task" ondblclick="app.edit(this, ${tarefa.id})">
                            ${tarefa.descricao}
                            <a class="del" onclick="Done.del(${tarefa.id})"><i class="material-icons" style="color: black;">clear</i></a>
                        </li>`

        document.getElementById('lista').appendChild(li)
    }
}
