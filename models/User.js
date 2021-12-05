const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: 'You need to provide a user name!',
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        
      },
      thoughts: [ 
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought' 
        }
      ],
      friends: [ 
                {
          type: Schema.Types.ObjectId, 
          ref: 'User' 
        }
      ]
    },
    {
      toJSON: { // allow virtuals to be used
        virtuals: true,
        getters: true // coming from utils
      },
      id: false
    }
);


UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema collection
const User = model('User', UserSchema);

module.exports = User;