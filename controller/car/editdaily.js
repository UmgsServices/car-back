

const Car=require('../../model/car')
const {format}=require('date-fns')
const addInput= async(req,res)=>{
const carid=req.body?.carid
const editdata=req.body?.editdata
const editfield=req.body?.editfield
const fieldid=req.body?.fieldid

if(carid?.length>23){
    const isCar=await Car.findOne({_id:carid}).exec()
if(isCar){

   const fields=['amount','daybalance','comment','transactiontype',]
   const isFieldCorrect=fields.includes(editfield)
   //const selector=`dailyinput.$.${editfield}`
   
   switch (editfield) {
    case 'comment':

       await Car.findOneAndUpdate({"dailyinput._id":fieldid},{$set:{"dailyinput.$.comment":editdata.toString()}})
 
        break;
        case 'amount':
           await Car.findOneAndUpdate({"dailyinput._id":fieldid},{$set:{"dailyinput.$.amount":editdata}})
     
            break;
            case 'transactiontype':
                await Car.findOneAndUpdate({"dailyinput._id":fieldid},{$set:{"dailyinput.$.transactiontype":editdata}})
         
                break;
                case 'daybalance':
        await Car.findOneAndUpdate({"dailyinput._id":fieldid},{$set:{"dailyinput.$.daybalance":editdata}})
         
                break;
   
    default:
        break;
   }                 
   console.log('car uploaded')
   const daily=await Car.findOne({_id:carid}).select({dailyinput:1}).exec()
  return res.json(daily)     
   
}
}
console.log(carid)
res.status(404).json({message:'car not found'})

}
module.exports={addInput}
