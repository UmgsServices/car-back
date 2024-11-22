
const Drivers=require('../../model/driver')

const getDrivers= async(req,res)=>{

const Driver=await Drivers.find().select({drivercode:1,_id:1,car:1})

try{

console.log('got Drivers list')
res.json(Driver)
}catch(err){
    console.log('err car',err)
res.status(401).json({message:'Request error'})
}
}
module.exports={getDrivers}
