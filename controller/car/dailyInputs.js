

const Car=require('../../model/car')
const {format}=require('date-fns')
const addField= async(req,res)=>{
const carid=req.body?.carid
const comment=req.body?.comment
const amount=req.body?.ammount
const transactiontype=req.body?.transactiontype
const Transactionid=req.body?.date
const daystatus=req.body?.dates
const id=req?.params?.id
const foundCar=await Car.findOne({_id:id}).exec()

//console.log(new Date)
// res.json({foundCar,result})
if(foundCar){
    try{
    const date=new Date
    const ini=new Date
    ini.setFullYear(0)
    
   
    const dailyinput=foundCar.dailyinput
    const lastDate=dailyinput[dailyinput.length-1]?.date
    const dates=[lastDate]
    const lastDiff=lastDate-ini
    if(lastDate){
        const lastDay=lastDate.getDate()
        const difference=Math.ceil((date-dailyinput[dailyinput.length-1]?.date)/(1000*60*60*24))
        console.log(difference)
        while(Math.ceil((date-dailyinput[dailyinput.length-1]?.date)/(1000*60*60*24)) >= 1){
            
            lastDate.setMilliseconds(lastDate.getMilliseconds()+(1000*60*60*24))
            const result=await foundCar.dailyinput.create({
                comment:'',
                daybalance:foundCar?.dailybalance,
                daystatus:true,
                driver:foundCar?.driver,
                amount:0,
                date:new Date(lastDate)
            })
            const resultR=await foundCar.repairs.create({
                description:'',
                driver:foundCar?.driver,
                amount:0,
                date:new Date(lastDate)
            })
    foundCar.dailyinput.push(result)
    foundCar.repairs.push(resultR)
    await foundCar.save()
        }
        console.log('car uploaded',difference,dates,foundCar.repairs)
        res.json(foundCar)  
    }else{
        const result=await foundCar.dailyinput.create({
            comment:'',
            daybalance:foundCar?.dailybalance,
            daystatus:true,
            amount:0,
            driver:foundCar?.driver,
            date:new Date()
        })
        const resultR=await foundCar.repairs.create({
            description:'',
            driver:foundCar?.driver,
            amount:0,
            date:new Date()
        })
        foundCar.dailyinput.push(result)
        foundCar.repairs.push(resultR)
        await foundCar.save()
console.log('car uploaded',lastDate,result,foundCar.repairs)
        res.json(foundCar)
    }
        }catch(err){
            console.log('err car',err)
        res.status(401).json({message:'data incomplete',foundCar})
        }
}

}
module.exports={addField}
