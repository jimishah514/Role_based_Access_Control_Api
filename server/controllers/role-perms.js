const db = require('../../models')


const create = async (req,res) =>{
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
    }catch(e){
        res.status(400).send(e)
    }
}

const read = async (req,res) =>{
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

const checkPermitStatus = async (roleId,featId) => {
    console.log("checkPermitStatus -> roleId : ",roleId)
    console.log("checkPermitStatus -> featId : ",featId)
    try {
        const permitStatus = await db.role_perms.findAll({
            //attributes: ["value"],
            where: {
                role_id : roleId,
                feat_id: featId,
                value: true
            }
        })

        console.log("permitStatus : ",permitStatus[0].dataValues.id)
        return permitStatus[0].dataValues.id
    }catch(e) {
        return "error while retreiving permitStatus"
    }
}

module.exports = {create,read,checkPermitStatus}