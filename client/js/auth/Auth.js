'use strict'

import { Route } from '../Route.js'

export class Auth {

    static checkLogin(status) {

        let user = localStorage.getItem('user')

        if (status && user === null) {
            new Route('/')
            throw ''
        }

        if (!status && user != null) {
            new Route('/dashboard')
            throw ''
        }
    }
}
