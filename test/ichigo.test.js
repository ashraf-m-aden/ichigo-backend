const { checkIfUserExist, reinitializeToMidnight, dateWithoutMilliSeconds, getReward, createRewards, createUser, checkRewardExist } = require('../app/functions/getRewards')
const { startRedeeming } = require('../app/functions/redeemReward')

/////////// testing getting rewards functions /////////////////

const user = {
    "id": 1,
    "rewards": [
        {
            "availableAt": "2020-03-15T00:00:00Z",
            "redeemedAt": null,
            "expiresAt": "2020-03-16T00:00:00Z"
        },
        {
            "availableAt": "2020-03-16T00:00:00Z",
            "redeemedAt": null,
            "expiresAt": "2020-03-17T00:00:00Z"
        },
        {
            "availableAt": "2020-03-17T00:00:00Z",
            "redeemedAt": null,
            "expiresAt": "2020-03-18T00:00:00Z"
        },
        {
            "availableAt": "2020-03-18T00:00:00Z",
            "redeemedAt": null,
            "expiresAt": "2020-03-19T00:00:00Z"
        },
        {
            "availableAt": "2020-03-19T00:00:00Z",
            "redeemedAt": null,
            "expiresAt": "2020-03-20T00:00:00Z"
        },
        {
            "availableAt": "2020-03-20T00:00:00Z",
            "redeemedAt": null,
            "expiresAt": "2020-03-21T00:00:00Z"
        },
        {
            "availableAt": "2020-03-21T00:00:00Z",
            "redeemedAt": null,
            "expiresAt": "2020-03-22T00:00:00Z"
        }
    ]
}
const data = [
    { "availableAt": "2020-03-15T00:00:00Z", "redeemedAt": null, "expiresAt": "2020-03-16T00:00:00Z" },
    { "availableAt": "2020-03-16T00:00:00Z", "redeemedAt": null, "expiresAt": "2020-03-17T00:00:00Z" },
    { "availableAt": "2020-03-17T00:00:00Z", "redeemedAt": null, "expiresAt": "2020-03-18T00:00:00Z" },
    { "availableAt": "2020-03-18T00:00:00Z", "redeemedAt": null, "expiresAt": "2020-03-19T00:00:00Z" },
    { "availableAt": "2020-03-19T00:00:00Z", "redeemedAt": null, "expiresAt": "2020-03-20T00:00:00Z" },
    { "availableAt": "2020-03-20T00:00:00Z", "redeemedAt": null, "expiresAt": "2020-03-21T00:00:00Z" },
    { "availableAt": "2020-03-21T00:00:00Z", "redeemedAt": null, "expiresAt": "2020-03-22T00:00:00Z" }
]
const testDate = "2020-03-19T12:00:00Z"


test('shoud remove milliseconds', () => {
    const date = dateWithoutMilliSeconds("2020-03-19T12:00:00.00Z")

    expect(date).toBe("2020-03-19T12:00:00Z")
})

test('should put the hour to midnight', () => {

    const date = reinitializeToMidnight(testDate)

    expect(date).toBe('2020-03-19T00:00:00Z')
})

test('should check if user exists and retrieve its rewards', () => {
    return checkIfUserExist(1, testDate).then(
        (result) => {
            expect(result).toEqual(data)

        }
    );

})

test('should get the rewards', () => {
    const rewards = getReward(1, 4, testDate)

    expect(rewards).toEqual(data)
})

