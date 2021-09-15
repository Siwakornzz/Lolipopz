const User = require('../modules/users/models/User');
const bcrypt = require('bcrypt')

exports.usercreate = (req,res) =>{
    if (!req.body){
        res.status(400).send({message : "Content Can't be empty! "});
        return;
    }



// new user
const user = new User({
    username : req.body.username,
    email : req.body.email,
    password : bcrypt.hash(req.body.password, 10),
    admin : req.body.admin,
    point: req.body.point
})

// save user in database
user
    .save(user)
    .then(data =>{

        res.redirect('/adduser')
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating a create operation"
        })
    })
}

// retrieve and return all users / retrive and return a single users

exports.userfind = (req,res) =>{
    if (req.query.id){
        const id = req.query.id

        User.findById(id).then(data =>{
            if (!data){
                res.status(404).send({message : "Not Found user Witth Id " + id})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message: "error retrieving user with id " + id})
        })
    }else{
        User.find().then(user =>{
            res.send(user)
        })
        .catch(err =>{
            res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
        })
    }
}

// Update a new identified user by user id 

exports.userupdate = (req, res) => {
    if(!req.body){
        return res.status(400).send ({message : "Data to update can't be empty"})
    }

    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body,{ userFindAndModify : false})
    .then(data =>{
        if(!data){
            res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
        }
        else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({ message : "Error Update User "})
    })
}

// Delete a user with specified user id in the request
exports.userdelete = (req, res)=>{
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}