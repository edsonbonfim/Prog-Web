const user = /*html*/`

<header>
    <div class="content">
        <div class="logo">
            <h1>NOte</h1>
        </div>
        <div class="menu">
            <ul>
                <li><a href="/logout">Sair</a></li>
            </ul>
        </div>
    </div>
</header>

<main>
    <div class="content">
        <form id="formulario">
            <input type="text" name="titulo" placeholder="Nova tarefa..." required>
        </form>

        <ul id="tarefas">
            <!-- <li>
                <p class="titulo">Tarefa 1</p>
                <p>Vamos ver como eh a descricao de uma tarefa!!</p>
            </li> -->
            <li>
                <div class="header">
                    Trabalho Prog Web
                </div>
                <div class="main">
                    Frontend: HTML, CSS e JS<br>
                    Backend: livre (PHP)<br>
                    Persistencia: livre (BD)<br>
                    Atualizacao automatica (assincrona)<br>
                    Sistema de Login<br>
                    Retornar uma API em JSON<br>
                    Implementar a arquitetura MVC
                </div>
            </li>
            <li>
                <div class="header">
                    Tarefa 3
                </div>
            </li>
            <li>
                <div class="header">
                    Tarefa 4
                </div>
            </li>
        </ul>
    </div>
</main>

`

const mais = /*html*/`

<textarea placeholder="Descrição..."></textarea>
<button type="submit">Cadastrar Tarefa</button>

`

export const view = { user, mais }
