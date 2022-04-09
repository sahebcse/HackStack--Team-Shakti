const DropPoint=require('../models/dropPointModel')

const createDropPoint=async (req, res)=>
{
    try{
        const tempDropPoint=new DropPoint({
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            city: req.body.city
        })
    }
    catch(error)
    {
        console.log(error)
        res.status(400).json(error)
    }
}

const getDropPointsByCity=async (req, res)=>
{
    try{
        const dropPoints=await DropPoint.find({city: req.params.city})
        res.json(dropPoints)
    }
    catch(error)
    {
        console.log(error)
        res.json(error)
    }
}

module.exports={createDropPoint, getDropPointsByCity}