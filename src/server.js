import express from 'express'
import listendpoints from 'express-list-endpoints'
import mainRouter from './Routes/mainroute.js'
import userRouter from './Routes/authors/authors.js'
import productRouter from './Routes/products/products.js'
import prodRouter from './Routes/products/prod.js'


const server = express()
const port = 3001

//========= Middlewares

server.use(express.json())

// ======== Endpoints

server.use("/mainroute", mainRouter)
server.use("/users", userRouter)
server.use("/products", productRouter)
server.use("/prod", prodRouter)




console.table(listendpoints(server))
server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})