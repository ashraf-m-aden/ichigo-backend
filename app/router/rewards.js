const express = require("express")
const router = new express.Router()
const { checkIfUserExist } = require('../functions/getRewards.js')
const { startRedeeming } = require('../functions/redeemReward')

router.get('/users/:id/rewards', async (req, res) => {   // retrieve the rewards

    try {
        const result = await checkIfUserExist(req.params.id, req.query.at)
        res.status(200).send({ "data": result })   // send back the rewards 
    } catch (error) {
        res.status(500).send({ 'error': "there is an error" })
    }

})


router.patch('/users/:id/rewards/:date/redeem', async (req, res) => {   //  try to redeem the rewards
    try {


        const result = await startRedeeming(req.params.id, req.params.date)

        res.status(200).send({ data: result }) // send back the result

    } catch (error) {
        res.status(405).send({ "message": "This reward is already expired" })  // error
    }
})



module.exports = router