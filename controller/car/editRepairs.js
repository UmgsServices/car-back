

const Car=require('../../model/car')
const {format}=require('date-fns')
const addRepairs= async(req,res)=>{
const carid=req.body?.carid
const editdata=req.body?.editdata
const editfield=req.body?.editfield
const fieldid=req.body?.fieldid

if(carid.length>23){
    const isCar=await Car.findOne({_id:carid}).exec()
if(isCar){

   const fields=['amount','description','type',]
   const isFieldCorrect=fields.includes(editfield)
   //const selector=`dailyinput.$.${editfield}`
   
   switch (editfield) {
    case 'description':

       await Car.findOneAndUpdate({"repairs._id":fieldid},{$set:{"repairs.$.description":editdata.toString()}})
 
        break;
        case 'amount':
           await Car.findOneAndUpdate({"repairs._id":fieldid},{$set:{"repairs.$.amount":editdata}})
     
            break;
            case 'type':
                await Car.findOneAndUpdate({"repairs._id":fieldid},{$set:{"repairs.$.transactiontype":editdata}})
         
                break;
   
    default:
        break;
   }                 
   console.log('car uploaded')
   const repairs=await Car.findOne({_id:carid}).select({repairs:1}).exec()
   console.log(repairs)
  return res.json(repairs)     
   
}
}
res.status(404).json({message:'car not found'})
}
module.exports={addRepairs}
