function statusChangeCallback(response) {
    if (response.status === 'connected') {
        testAPI();
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId: '361908191090116',
        cookie: true,
        xfbml: true,
        version: 'v3.3'
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
    FB.api('/me?fields=name,email,username', function(response) {

        body = new FormData();

        body.append('nome', response.name)
        body.append('usuario', response.username)
        body.append('email', response.email)
        body.append('senha', reponse.id)

        fetch('/api/?acao=signup', { method: 'post', body })
            .then(response => response.json())
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user))
                fetch(`/api?acao=getUser&user=${body.get('user')}`)
                    .then(response => response.json())
                    .then(user => {
                        if (!user) this.error('Usuário inválido')

                        fetch('/api?acao=login', { method: 'post', body })
                            .then(response => response.json())
                            .then(user => {
                                if (!user)
                                    this.error('Senha inválida')

                                localStorage.setItem('user', JSON.stringify(user))
                                window.location.href += '/tarefas';
                            })
                    })
            })
            .catch(e => { throw Error(e) })
    });
}