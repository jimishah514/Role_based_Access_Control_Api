const db = require('../../models')


const create = async (req,res) => {
    try {
        const user_perms = await db.user_perms.findOrCreate({
            where : {
                user_id:req.body.userId,
                role_id:req.body.roleId,
                scope_id:req.body.scopeId,
            }
        })
        res.send(user_perms)
    }catch(e) {
        res.send(e)
    }
}


const createUpdated = async (req,res) => {

    try {
        const user_role_perms = await db.role_perms.findAll({
            where : {
                role_id: req.body.roleId,
                value: true
            }
        })

       // console.log("user-perms -> user_role_perms : ",user_role_perms)

      
        // let user_perms = []
        // user_role_perms.forEach(async (dataValue,i) => {
        //     console.log("user-perms -> dataValue : ",dataValue)
        //     console.log("user-perms -> dataValue.userPermsId : ",dataValue.id)

        //     const user_perm = await db.user_perms.findOrCreate({
        //         where: {
        //             user_id: req.body.userId,
        //             role_permissions_id: dataValue.id,
        //             scope_id: req.body.scopeId,
        //             reporting_link: req.body.reportingLink
        //         }
        //     })
        //     console.log("user-perms -> user_perm : ",user_perm)
        //     user_perms[i]=user_perm[0].dataValues
        //     console.log("user-perms -> user_perms[",i,"] : ",user_perms)
        // })

        const user_perms = await addUserPerms(req,user_role_perms)


        console.log("user-perms -> user_perms : ",user_perms)


        // const user_perms = await db.user_perms.findOrCreate({
        //     where : {
        //         user_id:req.body.userId,
        //         role_permissions_id:req.body.rolePermissionsId,
        //         scope_id:req.body.scopeId,
        //         reporting_link:req.body.reportingLink
        //     }
        // })
        res.send(user_perms)
    }catch(e) {
        console.log("Error : ",e)
        res.send(e)
    }
}

const addUserPerms = async (req) => {
    console.log("<<<req.body>>>: ",req.body)
    console.log("<<<req.body>>>user_role_perms: ",user_role_perms)
    // scope = []
    // req.body.scopeId.forEach((scope,i) => {
    //     scope[i]= scope;
    // })
    // console.log("Scope : ",scope)
    status = "ALready Exist"
    const user_perms_promises = user_role_perms.map(async (item) => {
        console.log("<<<Map>>>: ",item)

        try {
            // const user_perm = await db.user_perms.findOrCreate({
            //     where: {
            //         user_id: req.body.userId,
            //         role_permissions_id: item.dataValues.id,
            //     },
            //     scope_id: req.body.scopeId,
            // })
            // if(!user_perm[1]) status = "Already Exist"

            const user_perm = await db.user_perms.findAll({
                where: {
                    user_id: req.body.userId,
                    role_permissions_id: item.dataValues.id,
                }
            })
            //console.log("user-user_perm *********** -> user_perm : ",user_perm)
            
            if(!user_perm.length)  {
                console.log("<<<Map>>>item.dataValues.id: ",item.dataValues.id)
                console.log("<<<Map>>> item.dataValues.id: ", item.dataValues.id)
                const user_perm2 = await db.user_perms.create({
                    
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

    const user_perms = await Promise.all(user_perms_promises)

    return status
}


const read = async (req,res) => {
    try{
        const userPermissions = await db.user_perms.findAll( {
            // include: [
            //     db.users,db.scope,db.role_perms
            // ]
        }  
        )
        res.send(userPermissions)
    }catch(e) {
        res.send(e)
    }
}


const readSpecific = async (userId,rolePermsId) => {
    console.log("user_perms -> userId : ",userId)
    console.log("user_perms -> rolePermsId : ",rolePermsId)
    try {
        const user_perms = await db.user_perms.findAll({
            where: {
                user_id : userId,
                role_permissions_id : rolePermsId,
            }
        })
        return user_perms[0].dataValues.id
    }catch(e){
        return false
    } 
}


const readByIds = async (req,res) => {

    try {
        const user_perms = await db.user_perms.findAll({
            where: {
                user_id : req.body.userId,
                role_permissions_id : req.body.rolePermsId,
            }
        })
        console.log("user_perms : ",user_perms[0].dataValues.scope_id)
        res.send(user_perms[0].dataValues)
    }catch(e){
        return false
    }
}


const readUserManagersByDirect = async (roleId) => {

    try {
        const parentRoleId = await db.roles.readByRoleId(roleId)
        const user_perms = await db.user_perms.findAll({
            where: {
                role_id : parentRoleId
            }
        })
        console.log("readUserManagersByDirect : ",user_perms[0].dataValues)
        res.send(user_perms[0].dataValues)
    }catch(e){
        return false
    }
}

const readUserManagersByRZA = async (scopeId) => {

    try {
        const user_perms = await db.user_perms.findAll({
            where: {
                scopeId : scopeId
            }
        })
        console.log("readUserManagersByRZA : ",user_perms[0].dataValues)
        res.send(user_perms[0].dataValues)
    }catch(e){
        return false
    }
}

const destroy = async (req,res) => {
    console.log("Req.params : ",req.params)
    console.log("Req.query : ",req.query)
    try{
        if(req.params) {
            const user_perms = await db.user_perms.destroy({
                where: {
                    id :req.params.id
                }
            })
        }
        else {
            const user_perms = await db.user_perms.destroy({
                where: {
                    id :req.query.id
                }
            })
        }
       /// console.log("userRole : ",userRole)
        res.sendStatus(200)
    }catch(e){
        res.sendStatus(500)
    }
}

module.exports = {create,read,readSpecific,readByIds,destroy, createUpdated,readUserManagersByDirect,readUserManagersByRZA}