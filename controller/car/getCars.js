
const Car=require('../../model/car')

const getCars= async(req,res)=>{

const car=await Car.find().select({carcode:1,_id:1,driver:1})

try{

console.log('got car list')
res.json(car)
}catch(err){
    console.log('err car',err)
res.status(401).json({message:'Request error'})
}
}
module.exports={getCars}
