
const Car=require('../../model/car')
const addCar= async(req,res)=>{
const make=req.body?.make
const model=req.body?.model
const purchaseprice=req.body?.purchaseprice
const purchasedate=req.body?.purchasedate
const driver=req.body?.driver
const platenumber=req.body?.platenumber
const paperdate=req.body?.paperdate
const lastservice=req.body?.lastservice
const chasisnumber=req.body?.chasisnumber
const color=req.body?.color
const carcode=`${make}-${chasisnumber?.slice(chasisnumber?.length-6)}`
const verifyDuplicate=await Car.findOne({chasisnumber}).exec()
if(verifyDuplicate) return res.status(404).json({message:'car is aready uploaded'})
try{
const result= await Car.create({
    make,model,purchaseprice,purchasedate,driver,platenumber,paperdate,lastservice,chasisnumber,color,carcode
})
console.log(`Car Uploaded as ${carcode} `)
res.json({message:`Car Uploaded as ${carcode} `})
}catch(err){
    console.log('err car',err)
res.status(401).json({message:'data incomplete'})
}
}
module.exports={addCar}
