
const Car=require('../../model/car')
const Driver=require('../../model/driver')
const getRepairs= async(req,res)=>{
const param=req?.params?.id
if(param.length==24){
    //const repairs=await Car.findOne({_id:param}).select({repairs:1}).exec()

    const driver=await Driver.findOne({_id:param}) 
    const repairs=await Car.findOne({_id:driver?.car}).select({repairs:1}).exec()
    const data =repairs.repairs.filter((item)=>item.driver==param)
    try{
    
    console.log('got Driver repairs')
    return res.json({repairs:data})
    }catch(err){
        console.log('err car',err)
   return res.status(401).json({message:'Request error'})
    }
}
res.status(401).json({message:'Request error'})
}
module.exports={getRepairs}
