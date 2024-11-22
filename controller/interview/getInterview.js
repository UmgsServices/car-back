const { response } = require('express')
const Interview=require('../../model/interview')
const getInterview=async (req, res)=>{
try{
const data=await Interview.find()
const pending= data.filter((item)=>item.status=='Pending')
const aproved= data.filter((item)=>item.status=='Aproved')
const rejected= data.filter((item)=>item.status=='Rejected')
res.json({all:data,pending,aproved,rejected})
}catch(err){
res.status(402)
}
}
module.exports=getInterview