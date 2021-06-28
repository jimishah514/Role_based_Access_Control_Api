const db = require('../../models')

const create = async (req,res) => {
    try {
        const scope = await db.scope.findOrCreate({
            where: {
                country_id: req.body.countryId,
                region_id: req.body.regionId,
                zone_id: req.body.zoneId,
                area_group_id: req.body.areaGroup
            }
        })
        res.send(scope)
    }catch(e){
        res.send(e)
    } 
}

const read = async (req,res) => {
    try {
        const scope = await db.scope.findAll()
        res.send(scope)
    }catch(e){
        res.send(e)
    } 
}

const readSpecific = async (req,res) => {
    try {
        const scope = await db.scope.findAll({
            where: {
                country_id: req.body.countryId,
                region_id: req.body.regionId,
                zone_id: req.body.zoneId,
                area_group_id: req.body.areaGroup
            }
        })
        res.send(scope[0].dataValues)
    }catch(e) {
        return "error in getting scopeId"
    }
}

const readScopeById = async (scopeId) => {
    try {
        const scope = await db.scope.findAll({
            where: {
                id: scopeId
            }
        })
        return scope[0].dataValues
    }catch(e){
        res.send(e)
    }
}

const readScopeByRoleId = async (userId,roleId) => {
    console.log("userId : ",userId)
    console.log("roleId : ",roleId)
    try {
        const scope = await db.user_perms.findAll({
            where: {
                user_id : userId,
                role_id : roleId
            }
        })
        console.log("readScopeByRoleId scope: ",scope)
        return scope
    }catch(e){
        res.send(e)
    }
}

const readLimited = async (req,res) => {
    try {
        const scope = await db.scope.findAll()
        res.send(scope)
    }catch(e){
        res.send(e)
    } 
}

module.exports = { create,read,readSpecific,readScopeByRoleId}