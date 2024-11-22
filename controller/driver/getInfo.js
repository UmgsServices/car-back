
const Driver=require('../../model/driver')
const Car=require('../../model/car')
const getInfo= async(req,res)=>{
const param=req?.params?.id
if(param.length==24){
    const Driverd=await Driver.findOne({_id:param}).exec()
    const car=await Car.findOne({_id:Driverd.car})
    const info=await Driver.findOne({_id:param}).select({drivercode:1,name:1,contract:1,dailybalance:1,initialdeposit:1,purcahseprice:1,}).exec()

    try{
    console.log('got driver info')
    return res.json({...info._doc,car:car.carcode,carid:car._id})
    }catch(err){
        console.log('err car',err)
   return res.status(401).json({message:'Request error'})
    }
}
res.status(401).json({message:'Request error'})
}
module.exports={getInfo}
