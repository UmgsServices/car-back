
const Car=require('../../model/car')

const getDaily= async(req,res)=>{
const param=req?.params?.id
if(param.length==24){
    const daily=await Car.findOne({_id:param}).select({dailyinput:1}).exec()

    try{
    
    console.log('got car list')
    return res.json(daily)
    }catch(err){
        console.log('err car',err)
   return res.status(401).json({message:'Request error'})
    }
}
res.status(401).json({message:'Request error'})
}
module.exports={getDaily}
