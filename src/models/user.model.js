import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profilePic: {
    type: String,
    default: ''
  }, 
  bio: {
    type: String,
  },

  followers: {
    type:[String],
    default: []
  },
},
{
  timestamps: true
}
);

const User = mongoose.model('User',userSchema)
export default User