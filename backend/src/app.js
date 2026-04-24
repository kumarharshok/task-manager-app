require('dotenv').config();
const express = require('express');
const app = express();
const User = require('./models/User');
const Task = require('./models/Task');
const signupRoute = require('./routes/signupRoute');
const loginRoute = require('./routes/loginRoute');
const taskRoute = require('./routes/taskRoute');
const meRoute = require('./routes/me');
const path = require('path');
const cors = require("cors");

app.use(cors({
  origin: "*"
}));app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log("Static path:", path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, '../public')));

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

//Routes
app.use('/api', signupRoute);
app.use('/api', loginRoute);
app.use('/api', taskRoute);
app.use('/api', meRoute);



module.exports = app;