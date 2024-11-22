
const Car=require('../../model/car')

const getRepairs= async(req,res)=>{
const param=req?.params?.id
if(param.length==24){
    const repairs=await Car.findOne({_id:param}).select({repairs:1}).exec()

    try{
    
    console.log('got car repairs')
    return res.json(repairs)
    }catch(err){
        console.log('err car',err)
   return res.status(401).json({message:'Request error'})
    }
}
res.status(401).json({message:'Request error'})
}
module.exports={getRepairs}
