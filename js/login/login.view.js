const login = /*html*/ `

<div class="auth">
    <div class="logo">
        <span>NOte</span>
    </div>

    <p>Entre com a sua conta</p>

    <form>
        <input type="text" class="input" name="user" placeholder="E-mail ou usuário"  required minlength="3">
        <input type="password" class="input senha" name="senha" placeholder="Senha" required minlength="8">
        <button type="submit" class="btn">Entrar</button>
        <!--button type="button" id="fb" style="background: #4267B2; margin-bottom: 20px;" class="btn">Entrar com o facebook</button-->
        <fb:login-button scope="public_profile,email" onlogin="checkLoginState()"; style="width:350px;height:60px;font-size: 18px;font-style: bold;font-family: 'Acme', sans-serif;">
		</fb:login-button>
    </form>

    <a id="link-signup" href="/signup">Criar uma conta</a><!-- | <a id="link-forget" href="/forget">Esqueceu sua senha?</a-->
</div>

`

export const view = { login }