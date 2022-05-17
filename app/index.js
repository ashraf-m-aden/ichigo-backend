const express = require("express")

const rewards = require('./router/rewards') // import the router rewards


const app = express()

app.use(rewards)
const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log('Server is up on port ' + port);
  })
