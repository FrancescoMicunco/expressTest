import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import uniqid from 'uniqid'


const prodRouter = express.Router()


const folderPath = dirname(dirname(dirname(fileURLToPath(
    import.meta.url))))

const pathProdJson = join(folderPath, './data/products.json')

const getProd = () => JSON.parse(fs.readFileSync(pathProdJson))

const writeProd = (content) => {
    fs.writeFileSync(pathProdJson, JSON.stringify(content))
}

prodRouter.get("/", (req, res, next) => {
    const prods = getProd()
    res.send("right request")
})
prodRouter.get("/:id", (req, res, next) => {
    const prods = getProd()
    const requestedProd = prods.find(e => e.id === req.params.id)
    res.send(requestedProd)
})

prodRouter.post("/", (req, res, next) => {
    const newProd = {...req.body, createdAt: new Date(), id: uniqid() }
    const prods = getProd()
    prods.push(newProd)
    writeProd(prods)
    res.send({ id: newProd.id })
})

prodRouter.put("/:id", (req, res, next) => {
    const prods = getProd()
    const index = prods.findIndex(e => e.id === req.params.id)
    const prodToModify = prods[index]
    const updatedProd = {...prods[index], ...req.body, upDatedAt: new Date() }
    writeProd(prods)
    res.send({ id: prods.id })
})


export default prodRouter