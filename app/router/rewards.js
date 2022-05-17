const express = require("express")
const router = new express.Router()
const {checkIfUserExist} = require('../functions/getRewards.js')
const {redeemRewards} = require('../functions/redeemReward')

router.get('/users/:id/rewards', async (req, res) => { 
    // await console.log(req.query.at);

    const result = checkIfUserExist(req.params.id, req.query.at)
    res.status(200).send(result)
})


router.patch('/users/:id/rewards/:date/redeem', async (req, res) => { 
    try {


    const result = await redeemRewards(req.params.id, req.params.date)
        res.status(200).send(result)

    } catch (error) {
        res.status(405).send({"message":"This reward is already expired"})
    }
})



module.exports = router