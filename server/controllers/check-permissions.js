const db = require("../../models")
const rolesController = require("../controllers/roles")
const scopeController = require("../controllers/scope")
const rolePermsController = require("../controllers/role-perms")
const userPermsController = require("../controllers/user-perms")
const featureController = require("../controllers/features")


const checkPermission = async (req,res) => {
    try {
        const roleId = await userPermsController.readSpecific(req.body.userId)
        console.log("checkPermissions -> roleId : ",roleId)
        if(!roleId) {
            res.send("No Role Exist for this user")
        }
        const featId = await featureController.readSpecific(req.body.action,req.body.resourcetype)
        console.log("checkPermissions -> featId : ",featId)
        if(!featId) {
            res.send("No featId Exist for this action and resourceType")
        }
        
        const status = await rolePermsController.checkPermitStatus(roleId,featId)
        console.log("checkPermissions -> status : ",status)
        let permitStatus =false;
        const reportingLink = await rolesController.readRoleReprtingLink(roleId)
        if(!feareportingLinktId) {
            res.send("No reportingLink Exist for this roleß")
        }
        
        if(status) {
            const userScope = await scopeController.readScopeByRoleId(req.body.userId,roleId)
            console.log("checkPermissions -> userScope : ",userScope)
            if(!userScope) {
                res.send("No userScope Exist for this user")
            }
            const scopeId = userScope.find(scope => {
                console.log("checkPermitStatus ->  scope.dataValues" ,scope.dataValues.scope_id)
                console.log("checkPermitStatus ->  req.body.scopeId" ,req.body.scopeId)
                return scope.dataValues.scope_id == req.body.scopeId}
                )
                console.log("checkPermissions -> scopeId : ",scopeId)
            if(scopeId) permitStatus = true

        }
        res.send(permitStatus)
        
    }catch(e) {
        res.send(e)
    }
}

module.exports = { checkPermission}