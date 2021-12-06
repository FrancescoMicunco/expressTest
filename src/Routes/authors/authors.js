import express from 'express'
import uniqid from 'uniqid'
import fs, { writeFileSync } from 'fs'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'
import { authorsValidation, body } from '../../middlewares/validator'

const userRouter = express.Router();

const url = fileURLToPath(
    import.meta.url)

const currentFolderPath = dirname(dirname(dirname(url))) // path della cartella contenente il file

const arrayJsonPath = join(currentFolderPath, "./data/users.json") // path del file JSON

const usersArray = JSON.parse(fs.readFileSync(arrayJsonPath)) // give the array in to the file

// GET =============
// =================

userRouter.get("/", (req, res, next) => {
    const usersArray = JSON.parse(fs.readFileSync(arrayJsonPath))
    res.send(usersArray)
})

// GET =============
// =================
userRouter.get("/:id", (req, res, next) => {
    const usersArray = JSON.parse(fs.readFileSync(arrayJsonPath))
    console.log(usersArray)
    const searchedUser = usersArray.find(id => id.id === req.params.id)
    res.send(searchedUser)
})

// POST =============
// =================
userRouter.post("/", authorsValidation, (req, res, next) => {
        const newUser = {
            id: uniqid(),
            ...req.body,
            createdAt: new Date()
        }
        const usersArray = JSON.parse(fs.readFileSync(arrayJsonPath)) //(contains array of json file)
        usersArray.push(newUser)
        fs.writeFileSync(arrayJsonPath, JSON.stringify(usersArray))
        res.status(201).send({ id: newUser.id })
    })
    // PUT =============
    // =================
userRouter.put("/:id", (req, res, next) => {
        const usersArray = JSON.parse(fs.readFileSync(arrayJsonPath))
        const index = usersArray.findIndex(e => e.id === req.params.id)
        const userToChange = {...usersArray[index], ...req.body }
        usersArray[index] = userToChange
        fs.writeFileSync(arrayJsonPath, JSON.stringify(usersArray))
        res.send(usersArray)
    })
    // DEL =============
    // =================
userRouter.delete("/:id", (req, res, next) => {
    const usersArray = JSON.parse(fs.readFileSync(arrayJsonPath))
    const usersRemaining = usersArray.filter(e => e.id !== req.params.id)
    console.log(usersRemaining)
    fs.writeFileSync(arrayJsonPath, JSON.stringify(usersRemaining))
    res.status(204).send()
})


export default userRouter