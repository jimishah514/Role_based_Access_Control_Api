const db = require('../../models')

const create = async (req,res)=> {
    console.log("create :",req.body.name)
    const role = await db.roles.findOrCreate({
        where : {
            name: req.body.name,
            parent: req.body.parent,
            reporting_link: req.body.reportingLink
        }
    })
    res.send(role)
}

const read = async (req,res) => {
    try {
        const role = await db.roles.findAll()
        res.send(role)
    }catch(e) {
        res.send.status(400).json(e)
    }
    
}

const readByRoleName = async (rolename) => {
    try {
        const role = await db.roles.findAll({
            where: {
                name:rolename
            }
        })
        return role[0].dataValues.id
    }catch(e) {
        return "error in getting roleId"
    }
}

const readByRoleId = async (rolename) => {
    try {
        const role = await db.roles.findAll({
            where: {
                name:rolename
            }
        })
        return role[0].dataValues.id
    }catch(e) {
        return "error in getting roleId"
    }
}



module.exports = {create,read,readByRoleName,readByRoleId}