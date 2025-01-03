const mongoose = require("mongoose");
const { isEmail, isStrongPassword} = require('validator');
const bcrypt = require('bcryptjs');
const debug = require("debug")('sft2:user-model');

const UserSchema = mongoose.Schema({
  emailAddress: {
    type: String,
    trim: true,
    unique: [true, 'Email address has already been registered'],
    required: [true, 'Please enter an email address'],
    validate: [isEmail, 'Please enter a valid email address']
  },
  username: {
    type: String,
    maxlength: 32,
    trim: true,
    required: [true, 'Please enter a username'],
  },
  firstName: {
    type: String,
    maxLength: [32, 'Names must be no greater than 32 characters'],
    trim: true,
    default: null
  },
  lastName: {
    type: String,
    maxLength: [32, 'Names must be no greater than 32 characters'],
    trim: true,
    default: null
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minLength: [8, 'Password must be at least 8 characters long'],
    maxLength: [32, 'Password must be no greater than 32 characters'],
    validate: [isStrongPassword, 'Must include 1 uppercase, 1 lowercase, 1 number, & 1 symbol']
  },
  campaigns: {
    type: Array,
    default: []
  },
  characters: {
    type: Array,
    default: []
  },
}, {
  timestamps: true
});

// pre/post model functions
UserSchema.post('save', function (doc, next) {
  debug('new user was created:', doc.username);
  next();
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static methods
UserSchema.statics.login = async function (userString, password) {
  const findUsername = await this.findOne({username: userString});
  const findUserEmail = await this.findOne({ emailAddress: userString });
  const user = findUsername || findUserEmail;

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
  }
  throw Error('Invalid email/password');
}
UserSchema.statics.register = async function(firstName, lastName, username, emailAddress, password) {
  const existingUser = await this.findOne({
    username,
    emailAddress
  });

  if (existingUser) {
    throw new Error('Registration failed. Please try again');
  }

  try {
    const newUser = new User({
      firstName,
      lastName,
      username,
      emailAddress,
      password
    });

    await newUser.save();
    return newUser;
  } catch (err) {
    throw new Error('Registration failed. Please try again');
  }

}
UserSchema.statics.fetchUser = async function (id) {
  const user = await this.findOne({
    _id: id
  });
  if (user) {
    return user;
  } else {
    throw Error('Session expired, please log in');
  }
}
UserSchema.statics.pushCampaign = async function (userId, campaignId) {
  const user = await this.findOne({
    _id: userId
  });
  if (user) {
    const res = await this.findOneAndUpdate({
      _id: userId
    }, {
      $push: {
        campaigns: campaignId
      }
    });
    if (res) {
      return res;
    } else {
      throw Error('Campaign could not be added to user');
    }
  } else {
    throw Error('User could not be found');
  }
}
UserSchema.statics.pushCharacter = async function (userId, characterId) {
  const user = await this.findOne({
    _id: userId
  });
  if (user) {
    const res = await this.findOneAndUpdate({
      _id: userId
    }, {
      $push: {
        characters: characterId
      }
    });
    if (res) {
      return res;
    } else {
      throw Error('Character could not be added to user');
    }
  } else {
    throw Error('User could not be found');
  }
}

// export model User with UserSchema
const User = mongoose.model("User", UserSchema);
module.exports = User;