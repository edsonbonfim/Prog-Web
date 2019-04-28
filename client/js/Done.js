'use strict'

import { Route } from './Route.js'

export class Done {

    constructor() {
        new Route(window.location.pathname)
    }
}
