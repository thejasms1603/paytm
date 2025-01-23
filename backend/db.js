const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/paytm")
.then(()=>{
    console.log("Successfully Connected to Database")
}).catch((e)=>{
    console.log("error while connecting to the database", e);
})

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});


const AccountSchema = mongoose.Schema({
  posts:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  balance: {
    type:Number,
    required:true
  }
})

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = {
    User,
    Account
}