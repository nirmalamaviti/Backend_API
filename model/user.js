const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true}
  
    //   age: data.age,
    //   phone: data.phone,
    //   address: data.address,
    //   birthDate: data.birthDate,
    //   bloodGroup: data.bloodGroup,
    //   gender: data.gender,
    //   country: data.country,
    //   additionalNotes: data.additionalNotes,
});

module.exports = mongoose.model('User', UserSchema);
