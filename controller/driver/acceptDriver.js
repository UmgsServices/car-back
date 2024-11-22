const Driver=require('../../model/driver')
const Car=require('../../model/car')
const Interview=require('../../model/interview')
const addDriver=async (req,res)=>{
    const interviewid=req.body?.interviewid
    const carcode=req.body?.car
    const dailybalance=req.body?.dailybalance
    const initialdeposite=req.body?.initialdeposite
    const purchaseamount=req.body?.purchaseamount
    const contract=req.body?.contract
   
    const foundcar=await Car.findOne({carcode}).exec()
    const foundInterview=await Interview.findOne({_id:interviewid}).exec()
    const verifyduplicate=await Driver.findOne({car:foundcar?._id}).exec()
    const drivercode=`${foundInterview.name.slice(0,foundInterview.name.indexOf(' '))}-${interviewid.slice(interviewid?.length-6)}`
    if(!verifyduplicate&&foundInterview!='Aproved'){
        const result =Driver.create({
            name:foundInterview.name,
            car:foundcar._id,
            drivercode:drivercode,
            contract:contract,
            dailybalance:dailybalance,
            initialdeposite:initialdeposite,
            purchaseamount:purchaseamount,
            startdate:new Date()
        })
        foundcar.driver=(await result)._id
        foundcar.dailybalance=dailybalance
        foundInterview.status='Aproved'
        await foundInterview.save()
        await foundcar.save()
       console.log(foundcar)
       res.send('done')
    }else{
        console.log(verifyduplicate,'i am safe')
        res.status(404)
        res.json({message:'car error'})
    }
   
    
}
module.exports={addDriver}