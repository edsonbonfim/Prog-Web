const tarefas = /*html*/ `

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
            <div>
                <label for="descricao">Descrição</label>
                <input id="descricao" type="text" name="descricao" placeholder="Nova tarefa..." required>
            </div>
            <div>
                <label for="inicio">Inicio</label>
                <input id="inicio" type="datetime-local" pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}" name="inicio" required>
            </div>
            <div>
                <label for="fim">Fim</label>
                <input id="fim" type="datetime-local" pattern="[0-9]{2}-[0-9]{2}-[0-9]{4}" name="fim" required>
            </div>
            <div>
                <label for="recorrencia">Recorrencia</label>
                <select id="recorrencia" name="recorrencia">
                    <option value="1">Nenhuma</option>
                    <option value="2">Diariamente</option>
                    <option value="3">Semanalmente</option>
                    <option value="4">Mensalmente</option>
                </select>
            </div>
        </form>
        <ul id="tarefas">
        </ul>
    </div>
</main>

`

export const view = { tarefas }