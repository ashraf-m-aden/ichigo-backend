'use strict';

const fs = require('fs')
const { checkIfUserExist, reinitializeToMidnight } = require('../functions/getRewards.js')



let jsonData = fs.readFileSync('app/storage/users.json')  // read from our local json file
let users = JSON.parse(jsonData)   // parse the retrieve data into JSON format

const startRedeeming = async (idUser, date) => {
    await checkIfUserExist(idUser, date)  // in case the reward does not exist we create it on the fly
    let rewardDate = await reinitializeToMidnight(date)  // format the date to change the hour to midnight


    for (let i = 0; i < users.length; i++) {
        if (users[i].id == idUser) {
            for (let y = 0; y < users[i].rewards.length; y++) {
                if ((new Date(users[i].rewards[y].availableAt)).toDateString() == (new Date(rewardDate)).toDateString()) {

                    redeemReward(users[i].rewards[y].expiresAt) // we see if we can redeem the reward
                }
                break  // we break the loop if we have a match
            }
            break  // we break the loop if we have a match
        }

    }
}

const redeemReward = (date) => {
    if (new Date(date) >= new Date()) { // if it is not expired

        users[i].rewards[y].redeemedAt = new Date()
        console.log(users[i].rewards[y].redeemedAt);

        users = JSON.stringify(users, null, 2);   // stringigy the users data to save it in the local file
        fs.writeFileSync('app/storage/users.json', users)  // save the data to the local json file

        return users[i].rewards[y]

    } else {  // if it is expired

        throw new Error
    }
}



module.exports = { redeemReward, startRedeeming }
