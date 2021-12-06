export const genericError = (err, req, res, next) => {
    res.status(500).send("Generic error!")
}

export const notFoundError = (err, req, res, next) => {
    res.status(404).send("Not Found!")
}

export const badrequestError = (err, req, res, next) => {
    res.status(400).send("Bad request!")
}