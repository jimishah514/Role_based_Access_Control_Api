const db = require('../../models')


const create = async (req,res) => {
    try {
        const reportingLink = await db.reporting_links.findOrCreate({
            where: {
                name: req.body.name
            }
        })
        res.send(reportingLink)
    }catch(e){
        console.log("Error : ",e)
        res.send(e)
    }
}


const read = async (req,res) => {
    try {
        const reportingLinks = await db.reporting_links.findAll()
        res.send(reportingLinks)

    }catch(e){
        console.log("Error : ",e)
        res.send(e)
    }
}

module.exports = {create,read}