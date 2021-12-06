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
    try {
        const prods = getProd()
        res.send("right request")
    } catch (error) {
        next(error)
    }

})
prodRouter.get("/:id", (req, res, next) => {
    try {
        const prods = getProd()
        const requestedProd = prods.find(e => e.id === req.params.id)
        if (requestedProd) {
            res.send(requestedProd)
        } else {
            next(createHttpError(404, "Not found!"))
        }

    } catch (error) {
        next(error)
    }

})

prodRouter.post("/", (req, res, next) => {
    try {
        const newProd = {...req.body, createdAt: new Date(), id: uniqid() }
        const prods = getProd()
        prods.push(newProd)
        writeProd(prods)
        res.send({ id: newProd.id })
    } catch (error) {
        next(error)
    }

})

prodRouter.put("/:id", (req, res, next) => {
    try {
        const prods = getProd()
        const index = prods.findIndex(e => e.id === req.params.id)
        if (index) {
            const prodToModify = prods[index]
            const updatedProd = {...prods[index], ...req.body, upDatedAt: new Date() }
            writeProd(prods)
            res.send("File updated!")
        } else {
            next(createHttpError(404, "Not Founded!"))
        }

    } catch (error) {
        next(error)
    }
    prodRouter.delete("/:id", (req, res, next) => {
        try {
            const prods = getProd()
            const prodsRemaining = prods.filter(e => e.id !== req.params.id)
            fs.writeFileSync(arrayJsonPath, JSON.stringify(prodsRemaining))
            res.status(204).send()
        } catch (error) {
            next(error)
        }

    })



})


export default prodRouter