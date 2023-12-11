import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  images: [String], // Assuming you're storing image filenames as strings
});

const User = mongoose.model('User', userSchema);

export default User;
