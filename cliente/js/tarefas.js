'use strict';

// Get
var getTarefas = function () {

    get('/tarefa/get.php', (status, response) => {

        if (status == 200) {

            var lista = document.querySelector("#lista");
            
            JSON.parse(response).forEach(tarefa => {
                addTarefa(lista, tarefa);
            });
        }
    });
}

// Post
document.querySelector("#form").addEventListener('submit', ev => {

    ev.preventDefault();

    var descricao = document.querySelector("#input");

    if (descricao.value == "")
        return;

    post('/tarefa/post.php', 'descricao='+descricao.value, (status, response) => {

        if (status == 200) {

            var tarefa = JSON.parse(response);
            addTarefa(document.querySelector("#lista"), tarefa);
            descricao.value = "";
        }
    });
});

// Delete
var del = function (id) {

    post('/tarefa/del.php', 'id='+id, status => {

        if (status == 204) {

            var li = document.querySelector('#li'+id);
            li.remove();
        }
    });
};

var addTarefa = function (lista, tarefa) {

    var li = document.createElement('li');

    li.innerHTML = '<li id="li'+tarefa.id+'" class="task">'+
                        tarefa.descricao +
                        '<a class="del" onclick="del('+tarefa.id+')"><i class="material-icons">clear</i></a>'+
                   '</li>';

    lista.appendChild(li);
};
