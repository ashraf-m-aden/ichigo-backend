'use strict';

const fs = require('fs')
const {checkIfUserExist,reinitializeToMidnight} = require('../functions/getRewards.js')


class User {
    id
    rewards
}

let jsonData = fs.readFileSync('app/storage/users.json')  // read from our local json file
let users = JSON.parse(jsonData)   // parse the retrieve data into JSON format

const redeemRewards= async (idUser, date) =>{   
    let rewards = await checkIfUserExist(idUser, date)  // we retrieve the rewards
// a trouver
}


module.exports = {redeemRewards}
