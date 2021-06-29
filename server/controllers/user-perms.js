const db = require('../../models')
const rolesController = require("../controllers/roles")

const create = async (req,res) => {
    try {
        console.log("user-perms create : ",req.body)
        const userPerms = await db.user_perms.findAll({
            where: {
                user_id:req.body.userId,
                scope_id:req.body.scopeId
            }
        })
        console.log("user-perms userPerms.length  : ",userPerms.length )
        if(userPerms.length == 0) {
            console.log("user-perms userPerms.length if : ",userPerms.length )
            const user_perms = await db.user_perms.create({
                    user_id:req.body.userId,
                    role_id:req.body.roleId,
                    manager_id: req.body.managerId,
                    scope_id:req.body.scopeId
            })
            res.send(user_perms)
        }

        res.send(user_perms)
    }catch(e) {
        res.send(e)
    }
}


const update = async (req,res) => {
    try {
        console.log("user-perms update : ",req.body)
        
            const user_perms = await db.user_perms.update({
                    user_id:req.body.userId,
                    role_id:req.body.roleId,
                    manager_id: req.body.managerId,
                    scope_id:req.body.scopeId,
            },{
                where : {
                    id: req.body.userPermsId
                }
            })

        res.send(user_perms)
    }catch(e) {
        res.send(e)
    }
}


const createUpdated = async (req,res) => {

    try {
        const user_role_perms = await db.role_perms.findAll({
            where : {
                role_id: req.body.roleId,
                value: true
            }
        })

        const user_perms = await addUserPerms(req,user_role_perms)
        console.log("user-perms -> user_perms : ",user_perms)

        res.send(user_perms)
    }catch(e) {
        console.log("Error : ",e)
        res.send(e)
    }
}

const addUserPerms = async (req) => {
    console.log("<<<req.body>>>: ",req.body)
    console.log("<<<req.body>>>user_role_perms: ",user_role_perms)
    status = "ALready Exist"
    const user_perms_promises = user_role_perms.map(async (item) => {
        console.log("<<<Map>>>: ",item)

        try {
            const user_perm = await db.user_perms.findAll({
                where: {
                    user_id: req.body.userId,
                    role_permissions_id: item.dataValues.id,
                }
            })
            
            if(!user_perm.length)  {
                console.log("<<<Map>>>item.dataValues.id: ",item.dataValues.id)
                console.log("<<<Map>>> item.dataValues.id: ", item.dataValues.id)
                const user_perm2 = await db.user_perms.create({
                        user_id: req.body.userId,
                        role_permissions_id: item.dataValues.id,
                        scope_id: req.body.scopeId,
                })
            }
            status = "Added"
        }catch(e){
            status = "Error"
        }
    })

    const user_perms = await Promise.all(user_perms_promises)

    return status
}


const read = async (req,res) => {
    try{
        const userPermissions = await db.user_perms.findAll( {
            // include: [
            //     db.users,db.scope,db.role_perms
            // ]
        }  
        )
        res.send(userPermissions)
    }catch(e) {
        res.send(e)
    }
}


const readSpecific = async (userId) => {
    console.log("user_perms -> userId : ",userId)
    try {
        const user_perms = await db.user_perms.findOne({
            where: {
                user_id : userId
            }
        })
        console.log("user_perms -> user_perms : ",user_perms.dataValues)
        return user_perms.dataValues.role_id
    }catch(e){
        return false
    } 
}


const readByIds = async (req,res) => {

    try {
        const user_perms = await db.user_perms.findAll({
            where: {
                user_id : req.body.userId,
                role_permissions_id : req.body.rolePermsId,
            }
        })
        console.log("user_perms : ",user_perms[0].dataValues.scope_id)
        res.send(user_perms[0].dataValues)
    }catch(e){
        return false
    }
}


const readUserManagersByDirect = async (req,res) => {
    console.log("readUserManagersByDirect : ",req.body.roleId)

    try {
        const parentRoleId = await rolesController.readRoleParentId(req.body.roleId)
        const user_perms = await db.user_perms.findAll({
            where: {
                role_id : parentRoleId
            }
        })
        console.log("readUserManagersByDirect : ",user_perms)
        res.send(user_perms)
    }catch(e){
        return false
    }
}

const readUserManagersByRZA = async (scopeId) => {

    try {
        const user_perms = await db.user_perms.findAll({
            where: {
                scopeId : scopeId
            }
        })
        console.log("readUserManagersByRZA : ",user_perms[0].dataValues)
        res.send(user_perms[0].dataValues)
    }catch(e){
        return false
    }
}

const destroy = async (req,res) => {
    console.log("Req.params : ",req.params)
    console.log("Req.query : ",req.query)
    try{
        if(req.params) {
            const user_perms = await db.user_perms.destroy({
                where: {
                    id :req.params.id
                }
            })
        }
        else {
            const user_perms = await db.user_perms.destroy({
                where: {
                    id :req.query.id
                }
            })
        }
        res.sendStatus(200)
    }catch(e){
        res.sendStatus(500)
    }
}

module.exports = {create,update,read,readSpecific,readByIds,destroy, createUpdated,readUserManagersByDirect,readUserManagersByRZA}