
const Interview=require('../../model/interview')

const addInterview= async(req,res)=>{
const name=req.body?.name
const rname=req.body?.rname
const phonenumber=req.body?.phonenumber
const state=req.body?.state
const localgovernment=req.body?.localgovernment
const address=req.body?.address
const lastjob=req.body?.lastjob
const reason=req.body?.reason
const froute=req.body?.froute
const bolt=req.body?.bolt
const taxi=req.body?.taxi
const licence=req.body?.licence
const edate=req.body?.edate
const contract=req.body?.contract
const date=new Date
try{
const result= await Interview.create({
    name,rname,phonenumber,state,localgovernment,address,lastjob,reason,froute,bolt,taxi,licence,edate,contract,date
})
console.log('good')
res.json({message:`New Interview Uploaded`})
}catch(err){
    console.log('err interview')
res.status(401).json({message:'data incomplete'})
}
}
module.exports={addInterview}
