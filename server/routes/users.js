const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/users")

userRouter.post('/',userController.create)
userRouter.get('/',userController.read)

module.exports = { userRouter}