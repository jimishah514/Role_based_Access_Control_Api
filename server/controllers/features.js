const db = require('../../models')

const create = async (req,res) => {
    try {
        const feature = await db.features.findOrCreate({
            where: {
                action : req.body.action,
                resource_type: req.body.resourceType
            }
        })
        res.send(feature) 
    }catch(e) {
        res.send(e)
    }
}

const read = async (req,res ) => {
    try {
        console.log("Featers Read")
        const feature = await db.features.findAll()

        res.send(feature)
    }catch(e) {
        res.send(e)
    }
    
}

const readSpecific = async (action,resourceType) => {
    console.log("Feature -> action : ",action)
    console.log("Feature -> resourceType : ",resourceType)
    try {
        const feature = await db.features.findOne({
            attributes: ["id"],
            where:{
                action : action,
                resource_type: resourceType
            }
        })
        return feature.dataValues.id
    }catch(e) {
        return "error in getting featureId"
    }
}


module.exports = {create,read,readSpecific}