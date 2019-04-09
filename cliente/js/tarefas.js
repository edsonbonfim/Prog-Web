'use strict';

// Get
let getTarefas = () => {

    get('/tarefa/get.php', (status, response) => {

        if (status == 200) {

            let lista = document.querySelector("#lista");
            
            JSON.parse(response).forEach(tarefa => {
                addTarefa(lista, tarefa);
            });
        }
    });
}

// Post
document.querySelector("#form").addEventListener('submit', ev => {

    ev.preventDefault();

    let descricao = document.querySelector("#input");

    if (descricao.value == "")
        return;

    post('/tarefa/post.php', 'descricao='+descricao.value, (status, response) => {

        if (status == 200) {

            let tarefa = JSON.parse(response);
            addTarefa(document.querySelector("#lista"), tarefa);
            descricao.value = "";
        }
    });
});

// Delete
let del = (id) => {

    post('/tarefa/del.php', 'id='+id, status => {

        if (status == 204) {

            let li = document.querySelector('#li'+id);
            li.remove();
        }
    });
};

let addTarefa = (lista, tarefa) => {

    let li = document.createElement('li');

    li.innerHTML = '<li id="li'+tarefa.id+'" class="task">'+
                        tarefa.descricao +
                        '<a class="del" onclick="del('+tarefa.id+')"><i class="material-icons">clear</i></a>'+
                   '</li>';

    lista.appendChild(li);
};
