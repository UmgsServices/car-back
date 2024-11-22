const Car=require('../../model/car')
const Driver=require('../../model/driver')

const getDaily= async(req,res)=>{
const param=req?.params?.id
if(param.length==24){
    const driver=await Driver.findOne({_id:param}) 
    const daily=await Car.findOne({_id:driver.car}).select({dailyinput:1}).exec()
    const data =daily.dailyinput.filter((item)=>item.driver==param)
    

    try{
    
    console.log('got car daily',data)
    return res.json({dailyinput:data})
    }catch(err){
        console.log('err car',err)
   return res.status(401).json({message:'Request error'})
    }
}
res.status(401).json({message:'Request error'})
}
module.exports={getDaily}
