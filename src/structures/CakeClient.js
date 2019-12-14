const Eris = require("eris")

class CakeClient extends Eris {
    constructor(token, options) {
        super(token, options)

        this.config = require("../../config.json")
    }
}

module.exports = CakeClient;