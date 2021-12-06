import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'


const prodRouter = express.Router()


const folderPath = dirname(dirname(dirname(fileURLToPath(
    import.meta.url))))

const pathProdJson = join(folderPath, './data/products.json')

const getProd = () => {
    JSON.parse(fs.readFileSync(pathProdJson))
}
const writeProd = (content) => {
    fs.writeFileSync(pathProdJson, JSON.stringify(content))
}

prodRouter.get("/", (req, res, next) => {
    const prods = getProd()
    res.send("right request")
})


export default prodRouter