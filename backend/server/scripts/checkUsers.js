const mongoose = require('mongoose');
const User = require('../../models/user.model');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/complaint-system';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');
    const users = await User.find({});
    console.log('Users in database:', users);
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
