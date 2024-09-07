const express = require('express')
const app = express();
const port = 3001;
const mongoose = require('mongoose')
require('dotenv').config();
const mongoUrl = process.env.mongo_url
const UserModel = require('./models/users')
const cors = require('cors')

app.use(express.json());
app.use(cors())

//mongoose.connect(mongoUrl)
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


  app.get('/getUsers', async (req, res) => {
    try {
      const users = await UserModel.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/createUser', async (req, res) => {
    try {
      const user = req.body;
      const newUser = new UserModel(user);
      await newUser.save();
      res.status(201).json(user); // Respond with the created user
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



  

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})