import express from 'express'
import uniqid from 'uniqid'
import fs, {
    writeFileSync
} from 'fs'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'

const productRouter = express.Router();

const url = fileURLToPath(
    import.meta.url)

const currentFolderPath = dirname(dirname(dirname(url))) // path della cartella contenente il file

const arrayJsonPathproducts = join(currentFolderPath, "./data/products.json") // path del file JSON

//const productsArray = JSON.parse(fs.readFileSync(arrayJsonPathproducts)) // give the array in to the file

// GET =============
// =================

productRouter.get("/", (req, res, next) => {
    const productsArray = JSON.parse(fs.readFileSync(arrayJsonPath))
    res.send(productsArray)
})

// GET =============
// =================
productRouter.get("/:id", (req, res, next) => {
    const productsArray = JSON.parse(fs.readFileSync(arrayJsonPath))
    console.log(productsArray)
    const searchedUser = productsArray.find(id => id.id === req.params.id)
    console.log(searchedUser)
    res.send(searchedUser)
})

// POST =============
// =================
// productRouter.post("/", (req, res, next) => {

//         const newProduct = {
//             id: uniqid(),
//             ...req.body,
//             createdAt: new Date()
//         }
//         const productsArray = JSON.parse(fs.readFileSync(arrayJsonPath)) //(contains array of json file)
//         productsArray.push(newProduct)
//         fs.writeFileSync(arrayJsonPath, JSON.stringify(productsArray))
//         res.status(201).send({
//             id: newProduct.id
//         })
//     })
// PUT =============
// =================
// productRouter.put("/:id", (req, res, next) => {
//         const productsArray = JSON.parse(fs.readFileSync(arrayJsonPath))
//         const index = productsArray.findIndex(e => e.id === req.params.id)
//         const productToChange = {
//             ...productsArray[index],
//             ...req.body
//         }
//         productsArray[index] = productToChange
//         fs.writeFileSync(arrayJsonPath, JSON.stringify(productsArray))
//         res.send(productsArray)
//     })
// DEL =============
// =================
// productRouter.delete("/:id", (req, res, next) => {
//     const productsArray = JSON.parse(fs.readFileSync(arrayJsonPath))
//     const productsRemaining = productsArray.filter(e => e.id !== req.params.id)
//     fs.writeFileSync(arrayJsonPath, JSON.stringify(productsRemaining))
//     res.status(204).send()
// })


export default productRouter