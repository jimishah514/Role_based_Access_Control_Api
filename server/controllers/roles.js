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

const readByRoleId = async (roleId) => {
    try {
        const role = await db.roles.findAll({
            where: {
                id : roleId
            }
        })
        return role[0].dataValues.id
    }catch(e) {
        return "error in getting roleId"
    }
}

const readRoleParentId = async (roleId) => {
    
    try {
        const role = await db.roles.findAll({
            where: {
                id : roleId
            }
        })
        return role[0].dataValues.parent
    }catch(e) {
        return "error in getting parent"
    }
}

const readRoleReprtingLink = async (roleId) => {
    try {
        const role = await db.roles.findAll({
            where: {
                id : roleId
            }
        })
        return role[0].dataValues.reporting_link
    }catch(e) {
        return "error in getting reporting_link"
    }
}



module.exports = {create,read,readByRoleName,readByRoleId,readRoleParentId,readRoleReprtingLink}