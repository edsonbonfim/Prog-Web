// Get
let getTarefas = function () {

    get('/tarefa/get.php', response => {

        if (response.status == 200) {

            let lista = document.querySelector("#lista");
            
            JSON.parse(response.responseText).forEach(tarefa => {
                addTarefa(lista, tarefa);
            });
        }
    });
}

// Post
document.querySelector("#form").addEventListener('submit', ev => {

    ev.preventDefault();

    let descricao = document.querySelector("#input");

    post('/tarefa/post.php', 'descricao='+descricao.value, response => {

        if (response.status == 200) {

            let tarefa = JSON.parse(response.responseText);
            addTarefa(document.querySelector("#lista"), tarefa);
            descricao.value = "";
        }
    });
});

// Delete
let del = function (id) {

    post('/tarefa/del.php', 'id='+id, response => {

        if (response.status == 204) {

            let li = document.querySelector('#li'+id);
            li.remove();
        }
    });
};

let addTarefa = function (lista, tarefa) {

    let li = document.createElement('li');

    li.innerHTML = '<li id="li'+tarefa.id+'" class="task">'+
                        tarefa.descricao +
                        '<a class="del" onclick="del('+tarefa.id+')"><i class="material-icons">clear</i></a>'+
                   '</li>';

    lista.appendChild(li);
};
