const sequelize = require('sequelize')
const models = require('../../models')


const create = async (req,res)=> {
    try{
        console.log("Controller")
        const user = await models.users.create({
            name: req.body.name
        })
        return res.send(user)
    }catch(err) {
        return res.send(err)
    }
    
}

const read = async (req,res) => {
    try {
        const user = await models.users.findAll()
        return res.send(user)
    } catch(e) {
        return res.send(err)
    }
}



module.exports = {create,read}
