'use strict'

import { Auth, Route } from '../Done.js'

export class Logout
{
    constructor() {

        Auth.checkLogin(true)
        localStorage.clear()
        new Route('/')
    }
}
