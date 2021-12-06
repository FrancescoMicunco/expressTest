import express from 'express'

const prodRouter = express.Router()

prodRouter.get("/", (req, res, next) => {
    rex.send("right request")
})

export default prodRouter