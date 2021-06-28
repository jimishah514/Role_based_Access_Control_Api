const db = require("../../models")
const rolesController = require("../controllers/roles")
const scopeController = require("../controllers/scope")
const rolePermsController = require("../controllers/role-perms")
const userPermsController = require("../controllers/user-perms")
const featureController = require("../controllers/features")

const checkPermission_ = async (req,res) => {
    try {
        const roleId = await rolesController.readSpecific(req.body.role)
        console.log("checkPermissions -> roleId : ",roleId)
        const scopeId = await scopeController.readSpecific(req.body.scope)
        console.log("checkPermissions -> scopeId : ",scopeId)
        const featId = await featureController.readSpecific(req.body.action,req.body.resourcetype)
        console.log("checkPermissions -> featId : ",featId)
        const rolePermsId = await rolePermsController.checkPermitStatus(roleId,featId)
        console.log("checkPermissions -> rolePermsId : ",rolePermsId)
        if(rolePermsId) {
            console.log("checkPermitStatus ->  Status: true" )
            const userPermsId = await userPermsController.readSpecific(req.body.userId,scopeId,req.body.reportingLink,rolePermsId)
            console.log("checkPermissions -> userPermsId : ",userPermsId)
            let permitStatus =false;
            if(userPermsId) permitStatus = true
            res.send(permitStatus)
        }
       
        // const permitStatus = await rolePermsController.checkPermitStatus(userRoleId,featId)
        
    }catch(e) {
        res.send(e)
    }
}

const checkPermission = async (req,res) => {
    try {
        const roleId = await rolesController.readByRoleName(req.body.role)
        console.log("checkPermissions -> roleId : ",roleId)
        const featId = await featureController.readSpecific(req.body.action,req.body.resourcetype)
        console.log("checkPermissions -> featId : ",featId)
        const status = await rolePermsController.checkPermitStatus(roleId,featId)
        console.log("checkPermissions -> rolePermsId : ",rolePermsId)
        if(status) {
            // HOW to get Scope to check it with user's scope????? where to get scope???
            const userScopeId = await scopeController.readScopeByRole(req.body.userId,roleId)
            console.log("checkPermissions -> userScope : ",userScope)
            console.log("checkPermitStatus ->  Status: true" )
            const scopeId = userScope.find(scope => scope == req.body.scopeId)
            // const userPermsId = await userPermsController.readSpecific(req.body.userId,scopeId,req.body.reportingLink,rolePermsId)
            // console.log("checkPermissions -> userPermsId : ",userPermsId)
            
            let permitStatus =false;
            if(scopeId) permitStatus = true

            res.send(permitStatus)
        }
        
    }catch(e) {
        res.send(e)
    }
}

module.exports = { checkPermission}