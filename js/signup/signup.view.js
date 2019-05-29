const header = /*html*/`

<div class="auth">
    <div class="logo">
        <span>NOte</span>
    </div>
    <div id="form"></div>
</div>

`

const passo1 = /*html*/`

<p>Informe os dados para criar sua conta</p>

<form id="form-continuar">
    <input type="text" class="input" name="nome" placeholder="Nome Completo" autocomplete="off" required minlength="3">
    <input type="email" class="input" name="email" placeholder="E-mail" autocomplete="off" required>
    <button type="submit" class="btn">Continuar</button>
</form>

<a id="link-login" href="/">Fazer Login</a>

`

const passo2 = /*html*/`

<p>Quase lá :)</p>

<form id="form-signup">
    <input type="text" class="input" name="usuario" placeholder="Usuário" autocomplete="off" required minlength="3">
    <input type="password" class="input" name="senha" placeholder="Senha" autocomplete="off" required minlength="8">
    <button type="submit" class="btn">Criar minha conta</button>
</form>

<a id="link-voltar" href="#">Voltar</a> | <a id="link-login" href="/">Fazer Login</a>

`

export const view = { header, passo1, passo2 }
