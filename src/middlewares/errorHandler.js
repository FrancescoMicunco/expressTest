export const notFoundError = (err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send("Not Found!")
    } else {
        next(err)
    }
}

export const badrequestError = (err, req, res, next) => {
    if (err.status === 400) {
        res.status(400).send("Bad request!")
    } else {}
    next(err)
}

export const unauthorizedError = (err, req, res, next) => {
    if (condition) {
        res.status(401).send("Bad request!")
    } else {}
    next(err)
}
export const genericError = (err, req, res, next) => {
    if (err.status === 500) {
        res.status(500).send("Generic error!")
    } else {
        next(err)
    }
}