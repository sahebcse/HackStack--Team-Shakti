const express=require('express')
const router=express.Router()

router.post('/drop_point', createDropPoint)

router.get('/drop_points/:city', getDropPointsByCity)

module.exports=router