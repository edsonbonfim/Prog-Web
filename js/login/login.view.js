const login = /*html*/`

<div class="auth">
    <div class="logo">
        <img src="img/done.png">
        done
    </div>

    <p>Entre com a sua conta</p>

    <form>
        <input type="text" class="input" name="user" placeholder="E-mail ou usuário"  required minlength="3">
        <input type="password" class="input senha" name="senha" placeholder="Senha" required minlength="8">
        <button type="submit" class="btn">Entrar</button>
    </form>

    <a id="link-signup" href="/signup">Criar uma conta</a> | <a id="link-forget" href="/forget">Esqueceu sua senha?</a>
</div>

`

export const view = { login }
