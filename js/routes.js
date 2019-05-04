'use strict'

import { Route } from './Done.js'

import { Login } from './login/Login.js'
import { Signup } from './signup/Signup.js'
import { Logout } from './logout/Logout.js'
import { Tarefas } from './tarefas/Tarefas.js'

Route.register({
    '/': Login,
    '/signup': Signup,
    '/tarefas': Tarefas,
    '/logout': Logout
})

new Route(window.location.pathname)
