'use strict';

const fs = require('fs')
const { checkIfUserExist, reinitializeToMidnight, dateWithoutMilliSeconds } = require('../functions/getRewards.js')

let file = process.env.FILE



const startRedeeming = async (idUser, date) => {
    let rewards = await checkIfUserExist(idUser, date)  // in case the reward does not exist we create it on the fly

    let jsonData = fs.readFileSync(file)  // read from our local json file
    let users = JSON.parse(jsonData)   // parse the retrieve data into JSON format
    let result   // if we redeem the reward , it will be assigned to this variable
    let redeemed = false   // a boolean to check if we redeemed this time or not
    for (let i = 0; i < users.length; i++) {

        if (users[i].id == idUser) {

            for (let y = 0; y < users[i].rewards.length; y++) {

                // we look for a reward with the same available date & that is not redeemed yet
                if ((reinitializeToMidnight(users[i].rewards[y].availableAt) == reinitializeToMidnight(date)) && users[i].rewards[y].redeemedAt == null) {

                    if (Date.parse(users[i].rewards[y].expiresAt) >= Date.parse(new Date())) { // if it is not expired

                        users[i].rewards[y].redeemedAt = dateWithoutMilliSeconds(new Date())

                        result = users[i].rewards[y]
                        users = JSON.stringify(users, null, 2);   // stringify the users data to save it in the local file

                        fs.writeFileSync(file, users)  // save the data to the local json file
                        redeemed = true

                    } else {  // if it is expired

                        throw new Error
                    }
                    // if it is already redeemed
                } else if ((reinitializeToMidnight(users[i].rewards[y].availableAt) == reinitializeToMidnight(date)) && users[i].rewards[y].redeemedAt !== null) {

                    throw new Error
                }

                if (redeemed) {
                    return result
                }

            }

            break  // if we find the user break the loop
        }

    }
}




module.exports = { startRedeeming }
