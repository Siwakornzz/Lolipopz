const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name can\'t be smaller than 2 characters'],
        maxlength: [64, 'Name can\'t be greater than 64 characters']
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Email is required'],
        maxlength: [128, 'Email can\'t be smaller than 128 characters'],
        index: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    admin: {
        type: Boolean,
        default: false
    },
    point: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    typeofproduct: [{
        userid: {
            type: ObjectId
        }
    }]

}, {
    timestamps: true
})

// unique email and username 
userSchema.path('username').validate(async(username) => {
    const usernameCount = await mongoose.models.users.countDocuments({ username })
    return !usernameCount
}, 'Username already exists')
userSchema.path('email').validate(async(email) => {
    const emailCount = await mongoose.models.users.countDocuments({ email })
    return !emailCount
}, 'Email already exists')


// checkpassword compare hash 
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.checkPassword = async function(password) {
    const result = await bcrypt.compare(password, this.password)
    return result
}

const User = mongoose.model('users', userSchema)

module.exports = User