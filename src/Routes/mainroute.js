import express from 'express'


const mainRouter = express.Router()

mainRouter.get("/", (req, res) => {
    res.send("it works")
})

export default mainRouter