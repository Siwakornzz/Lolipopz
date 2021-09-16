const User = require('../models/User')
/**
 * Create a new user and returns it 
 * @param {Object} userInput - it's user input with all variables for user model 
 */
const addUser = async (data) =>{
    const user = new User(data)
    await user.save()
    console.log(data)
    return user
}

module.exports = {addUser}