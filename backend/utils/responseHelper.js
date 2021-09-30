export class responseHelper {
    constructor(res) {
        this.res = res
    }
    sender(code, message) {
        this.res.status(code).send({ message: message })
    }
    badRequest(message) {
        this.sender(400, { message: message })
    }
    forbiddenRequest(message) {
        this.sender(401, { message: message })
    }
    unauthorizedRequest(message) {
        this.sender(403, { message: message })
    }
    internalError(message) {
        this.sender(500, { message: message })
    }
    notFoundRequest(message) {
        this.sender(404, { message: message })
    }
}