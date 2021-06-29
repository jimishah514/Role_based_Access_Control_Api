const db = require('../../models')

const rolePerms = {
    create : async (req,res) =>{
        console.log("Role-Perms -> Create : ",req.body)
        try {
            const foundItem = await db.role_perms.findOne({
                where: {
                    role_id: req.body.roleId,
                    feat_id: req.body.featId
                }
            })
    
            console.log("role_perms -> foundItem: ",foundItem)
    
            if(!foundItem) {
                const rolePermsCreate = await db.role_perms.create({
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
            const foundItem = await db.role_perms.findOne({
                where: {
                    role_id: req.body.roleId,
                    feat_id: req.body.featId
                }
            })
    
            console.log("role_perms -> foundItem: ",foundItem)
    
            if(foundItem) {
                const rolePermsUpdate = await db.role_perms.update(
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
               
                console.log("role_perms -> rolePermsUpdate: ",rolePermsUpdate)
                res.status(200).send(rolePermsUpdate)
            }  
            
        }catch(e){
            res.status(400).send(e)
        }
    }
    ,
    read : async (req,res) =>{
        try {
            const rolePerms = await db.role_perms.findAll({
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
            const permitStatus = await db.role_perms.findAll({
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