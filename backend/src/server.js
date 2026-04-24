const app = require('./app');
const sequelize = require('./config/db');
require('./models/User');
require('./models/Task')
require('dotenv').config();

const PORT = process.env.PORT || 5000;

sequelize.sync()
.then(() => {
    app.listen(PORT, () => {
        console.log("Server and Database sync successfully...!")
    })
})
.catch((error) => {
    console.log("Something went wrong during sync: ", error)
})
