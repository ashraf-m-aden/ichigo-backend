'use strict';

const fs = require('fs')
class User {
    id
    rewards
}
let jsonData = fs.readFileSync('app/storage/users.json')  // read from our local json file
let users = JSON.parse(jsonData)   // parse the retrieve data into JSON format

function checkIfUserExist(idUser, date) {   // this function check if the user exist and retrieves it if it does not it creates one

    let userExist = false
    let user
    users.forEach(async retrievedUser => {
        if (retrievedUser.id == idUser) {   // search for the user
            userExist = true
            user = retrievedUser
        }
    });
    if (userExist) {
        return checkRewardExist(user, date)
    } else
        return createUser(idUser, date)  // if do not find the user at all creat the user and send back the rewards

}

function checkRewardExist(user, date) {  // we check if the reward exist, this function is called if the user exist
    let rewardExist = false
    user.rewards.forEach((reward) => {
        if (reinitializeToMidnight(reward.availableAt) == reinitializeToMidnight(date)) {  // we look into the dates to see if we have a match
            rewardExist = true
        }
    });
    if (rewardExist) { // if we find the date we return the user
        return getRewards(date)  // this function get the rewards 
    } else {
        // if we do not find it we generate the rewards and we add to the user data
        const newRewards = createRewards(date)
        newRewards.forEach(async reward => {
            await user.rewards.push(reward)
        });
        users = JSON.stringify(users, null, 2);   // stringigy the users data to save it in the local file
        fs.writeFileSync('app/storage/users.json', users)  // save the data to the local json file
        return newRewards  // return the rewards once saved
    }
}

function createUser(idUser, date) {  // this function create the user if he does not exist and create also the rewards

    let user = new User() // generate new User
    user.id = idUser    // create user id
    user.rewards = createRewards(date)   // generate rewards and add them to the user
    users.push(user)
    users = JSON.stringify(users, null, 2);
    fs.writeFileSync('app/storage/users.json', users)
    return user.rewards

}

function createRewards(date) {  // this function create all the rewards in the same week of searched reward
    date = reinitializeToMidnight(date)  // reinitialize time to midnight

    return getRewards(date)   // return the final week
}

function getRewards(date) {
    let dateArray = []  // prepare array for the rewards

    let dayOfTheWeek = new Date(date).getDay() // retrieve the day of the week of the searched rewards
    let firstDay = new Date(date).setDate(new Date(date).getDate() - dayOfTheWeek)  // get the first day of that week
    for (let i = 0; i < 7; i++) {
        dateArray.push(  // create an array of all the rewards of that week
            {
                "availableAt": new Date(reinitializeToMidnight(new Date(firstDay).setDate(new Date(firstDay).getDate() + i))),
                "redeemedAt": null,
                "expiresAt": new Date(reinitializeToMidnight(new Date(firstDay).setDate(new Date(firstDay).getDate() + i + 1)))
            }
        )
    }
    return dateArray   // return the final week
}

function reinitializeToMidnight(date) {
    return new Date(date).setUTCHours(0)  // reinitialize time to midnight

}

module.exports = { checkIfUserExist, reinitializeToMidnight }