const db = require('../../models')

const rolePerms = {
    create : async (req,res) =>{
        console.log("Role-Perms -> Create : ",req.body)
        try {
            const foundItem = await db.rolePermissions.findOne({
                where: {
                    role_id: req.body.roleId,
                    feat_id: req.body.featId
                }
            })
    
            console.log("rolePermissions -> foundItem: ",foundItem)
    
            if(!foundItem) {
                const rolePermsCreate = await db.rolePermissions.create({
                        role_id: req.body.roleId,
                        feat_id: req.body.featId,
                        value: req.body.value
                })
                res.status(200).send(rolePermsCreate)
            }  
    
        }catch(e){
            res.status(400).send(e)
        }
    }
    ,
    
    update : async (req,res) => {
        console.log("Role-Perms -> Create : ",req.body)
        try {
            const foundItem = await db.rolePermissions.findOne({
                where: {
                    role_id: req.body.roleId,
                    feat_id: req.body.featId
                }
            })
    
            console.log("rolePermissions -> foundItem: ",foundItem)
    
            if(foundItem) {
                const rolePermsUpdate = await db.rolePermissions.update(
                    { 
                        role_id: req.body.roleId,
                        feat_id: req.body.featId,
                        value: req.body.value
                    },
                    {
                    where: {
                        role_id: req.body.roleId,
                        feat_id: req.body.featId,
                    }
                    
                })
               
                console.log("rolePermissions -> rolePermsUpdate: ",rolePermsUpdate)
                res.status(200).send(rolePermsUpdate)
            }  
            
        }catch(e){
            res.status(400).send(e)
        }
    }
    ,
    read : async (req,res) =>{
        try {
            const rolePerms = await db.rolePermissions.findAll({
                include: [
                    db.roles,db.features
                ]
            })
            res.status(200).send(rolePerms)
        }catch(e){
            res.status(400).send(e)
        }
    }
    ,
    checkPermitStatus :async (roleId,featId) => {
        try {
            const permitStatus = await db.rolePermissions.findAll({
                attributes: ["value"],
                where: {
                    role_id : roleId,
                    feat_id: featId,
                }
            })
    
            console.log("permitStatus : ",permitStatus[0].dataValues.value)
            return permitStatus[0].dataValues.value
        }catch(e) {
            return "error while retreiving permitStatus"
        }
    }
}



module.exports = rolePerms