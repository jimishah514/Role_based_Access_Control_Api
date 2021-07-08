const express = require("express")
const router = express.Router()
//const {userRouter} = require('./users.js')
const userController = require("../controllers/users")
const rolesController = require("../controllers/roles")
const scopeController = require("../controllers/scope")
const featureController = require("../controllers/features")
const rolePermsController = require("../controllers/rolePerms")
const userPermsController = require("../controllers/userPerms")
const checkPermsController = require("../controllers/checkPermissions")
const reportingLinkController = require("../controllers/reportingLinks")

//router.use("user",userRouter)


router.post('/user',userController.create)
router.get('/users',userController.read)
router.post('/role',rolesController.create)
router.get('/roles',rolesController.read)
router.post('/scope',scopeController.create)
router.get('/scopes',scopeController.read)
router.post('/feature',featureController.create)
router.get('/features',featureController.read)

router.post('/role-perms',rolePermsController.create)
router.get('/role-perms',rolePermsController.read)

router.post('/user-perms',userPermsController.create)
router.put('/user-perms',userPermsController.update)
router.get('/user-perms',userPermsController.read)
router.get('/user-perms-specific',userPermsController.readByIds)
router.delete('/user-perms',userPermsController.destroy)
router.delete('/user-perms/:id',userPermsController.destroy)

router.post('/user-perms-updated',userPermsController.createUpdated)

router.post('/reporting-link',reportingLinkController.create)
router.get('/reporting-links',reportingLinkController.read)

router.get('/userManagersByDirect',userPermsController.readUserManagersByDirect)



router.get('/check-perms',checkPermsController.checkPermission)








module.exports = {router}
