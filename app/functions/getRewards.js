'use strict';

const fs = require('fs')
class User {
    id
    rewards
}
let file = process.env.FILE
let jsonData = fs.readFileSync(file)  // read from our local json file
let users = JSON.parse(jsonData)   // parse the retrieve data into JSON format

const checkIfUserExist = async (idUser, date) => {   // Date function check if the user exist and retrieves it if it does not it creates one

    let userExist = false
    let user
    await users.forEach(async retrievedUser => {
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

const checkRewardExist = async (user, date) => {  // we check if the reward exist, Date function is called if the user exist
    let rewardExist = false
    let indexReward    // Date is the index of the reward in rewards array
    let indexUser    // Date is the index of the user in the users array
    await user.rewards.forEach((reward) => {
        if (reinitializeToMidnight(reward.availableAt) == reinitializeToMidnight(date)) {  // we look into the dates to see if we have a match
            rewardExist = true
            indexReward = user.rewards.indexOf(reward)
            indexUser = users.indexOf(user)
        }
    });
    if (rewardExist) { // if we find the date we return the user
        return getReward(indexUser, indexReward, date)  // Date function get the rewards 
    } else {
        // if we do not find it we generate the rewards and we add to the user data
        const newRewards = createRewards(date)
        await newRewards.forEach(async reward => {
            await user.rewards.push(reward)
        });
        users = JSON.stringify(users, null, 2);   // stringigy the users data to save it in the local file
        await fs.writeFileSync(file, users)  // save the data to the local json file
        return newRewards  // return the rewards once saved
    }
}

function createUser(idUser, date) {  // this function create the user if he does not exist and create also the rewards

    let user = new User() // generate new User
    user.id = idUser    // create user id
    user.rewards = createRewards(date)   // generate rewards and add them to the user
    users.push(user)
    users = JSON.stringify(users, null, 2);
    fs.writeFileSync(file, users)
    return user.rewards

}

function createRewards(date) {  // this function create all the rewards in the same week of searched reward
    date = reinitializeToMidnight(date)  // reinitialize time to midnight

    let dateArray = []  // prepare array for the rewards

    let dayOfTheWeek = new Date(date).getDay() // retrieve the day of the week of the searched rewards
    let firstDay = new Date(date).setDate(new Date(date).getDate() - dayOfTheWeek)  // get the first day of that week
    for (let i = 0; i < 7; i++) {
        dateArray.push(  // create an array of all the rewards of that week
            {
                "availableAt": reinitializeToMidnight(new Date(firstDay).setDate(new Date(firstDay).getDate() + i)),
                "redeemedAt": null,
                "expiresAt": reinitializeToMidnight(new Date(firstDay).setDate(new Date(firstDay).getDate() + i + 1))
            }
        )
    }
    return dateArray   // return the final week
}

function getReward(indexUser, indexReward, date) {
    date = reinitializeToMidnight(date)  // reinitialize time to midnight

    let dateArray = []  // prepare array for the rewards

    let dayOfTheWeek = new Date(date).getDay() // retrieve the day of the week of the searched rewards

    let firstRewardIndex = indexReward - dayOfTheWeek   // we retrieve the index of the first reward of the week

    for (let i = firstRewardIndex; i < (firstRewardIndex + 7); i++) {

        dateArray.push(  // create an array of all the rewards of that week
            users[indexUser].rewards[i]
        )
    }
    return dateArray   // return the final week
}




function reinitializeToMidnight(date) {

    date = new Date(date).setUTCHours(0)  // reinitialize time to midnight


    return new Date(date).toISOString().split('.')[0] + 'Z'
}

function dateWithoutMilliSeconds(date) {
    return new Date(date).toISOString().split('.')[0] + 'Z'

}

module.exports = {
    checkIfUserExist, reinitializeToMidnight, getReward,
    createRewards, createUser, checkRewardExist, dateWithoutMilliSeconds
}