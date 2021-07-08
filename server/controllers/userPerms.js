const db = require('../../models')
const rolesController = require("./roles")

const create = async (req,res) => {
    try {
        console.log("user-perms create : ",req.body)
        const userPerms = await db.userPermissions.findAll({
            where: {
                user_id:req.body.userId,
                scope_id:req.body.scopeId
            }
        })
        console.log("user-perms userPerms.length  : ",userPerms.length )
        if(userPerms.length == 0) {
            console.log("user-perms userPerms.length if : ",userPerms.length )
            const userPermissions = await db.userPermissions.create({
                    user_id:req.body.userId,
                    role_id:req.body.roleId,
                    manager_id: req.body.managerId,
                    scope_id:req.body.scopeId
            })
            res.send(userPermissions)
        }

        res.send(userPermissions)
    }catch(e) {
        res.send(e)
    }
}


const update = async (req,res) => {
    try {
        console.log("user-perms update : ",req.body)
        
            const userPermissions = await db.userPermissions.update({
                    user_id:req.body.userId,
                    role_id:req.body.roleId,
                    manager_id: req.body.managerId,
                    scope_id:req.body.scopeId,
            },{
                where : {
                    id: req.body.userPermsId
                }
            })

        res.send(userPermissions)
    }catch(e) {
        res.send(e)
    }
}


const createUpdated = async (req,res) => {

    try {
        const user_rolePermissions = await db.rolePermissions.findAll({
            where : {
                role_id: req.body.roleId,
                value: true
            }
        })

        const userPermissions = await addUserPerms(req,user_rolePermissions)
        console.log("user-perms -> userPermissions : ",userPermissions)

        res.send(userPermissions)
    }catch(e) {
        console.log("Error : ",e)
        res.send(e)
    }
}

const addUserPerms = async (req) => {
    console.log("<<<req.body>>>: ",req.body)
    console.log("<<<req.body>>>user_rolePermissions: ",user_rolePermissions)
    status = "ALready Exist"
    const userPermissions_promises = user_rolePermissions.map(async (item) => {
        console.log("<<<Map>>>: ",item)

        try {
            const user_perm = await db.userPermissions.findAll({
                where: {
                    user_id: req.body.userId,
                    role_permissions_id: item.dataValues.id,
                }
            })
            
            if(!user_perm.length)  {
                console.log("<<<Map>>>item.dataValues.id: ",item.dataValues.id)
                console.log("<<<Map>>> item.dataValues.id: ", item.dataValues.id)
                const user_perm2 = await db.userPermissions.create({
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

    const userPermissions = await Promise.all(userPermissions_promises)

    return status
}


const read = async (req,res) => {
    try{
        const userPermissions = await db.userPermissions.findAll( {
            include: [
                db.users,db.scope
                // ,db.rolePermissions
            ]
        }  
        )
        res.send(userPermissions)
    }catch(e) {
        res.send(e)
    }
}


const readSpecific = async (userId) => {
    console.log("userPermissions -> userId : ",userId)
    try {
        const userPermissions = await db.userPermissions.findOne({
            where: {
                user_id : userId
            }
        })
        console.log("userPermissions -> userPermissions : ",userPermissions.dataValues)
        return userPermissions.dataValues.role_id
    }catch(e){
        return false
    } 
}


const readByIds = async (req,res) => {

    try {
        const userPermissions = await db.userPermissions.findAll({
            where: {
                user_id : req.body.userId,
                role_permissions_id : req.body.rolePermsId,
            }
        })
        console.log("userPermissions : ",userPermissions[0].dataValues.scope_id)
        res.send(userPermissions[0].dataValues)
    }catch(e){
        return false
    }
}


const readUserManagersByDirect = async (req,res) => {
    console.log("readUserManagersByDirect : ",req.body.roleId)

    try {
        const parentRoleId = await rolesController.readRoleParentId(req.body.roleId)
        const userPermissions = await db.userPermissions.findAll({
            where: {
                role_id : parentRoleId
            }
        })
        console.log("readUserManagersByDirect : ",userPermissions)
        res.send(userPermissions)
    }catch(e){
        return false
    }
}

const readUserManagersByRZA = async (scopeId) => {

    try {
        const userPermissions = await db.userPermissions.findAll({
            where: {
                scopeId : scopeId
            }
        })
        console.log("readUserManagersByRZA : ",userPermissions[0].dataValues)
        res.send(userPermissions[0].dataValues)
    }catch(e){
        return false
    }
}

const destroy = async (req,res) => {
    console.log("Req.params : ",req.params)
    console.log("Req.query : ",req.query)
    try{
        if(req.params) {
            const userPermissions = await db.userPermissions.destroy({
                where: {
                    id :req.params.id
                }
            })
        }
        else {
            const userPermissions = await db.userPermissions.destroy({
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