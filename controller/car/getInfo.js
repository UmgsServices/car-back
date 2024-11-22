
const Car=require('../../model/car')

const getInfo= async(req,res)=>{
const param=req?.params?.id
if(param.length==24){
    const info=await Car.findOne({_id:param}).select({carcode:1,make:1,model:1,color:1,chasisnumber:1,purchasedate:1,purcahseprice:1,}).exec()

    try{
    
    console.log('got car list')
    return res.json(info)
    }catch(err){
        console.log('err car',err)
   return res.status(401).json({message:'Request error'})
    }
}
res.status(401).json({message:'Request error'})
}
module.exports={getInfo}
