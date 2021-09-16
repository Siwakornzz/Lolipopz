const User = require('../modules/users/models/User');


// retrieve and return all users / retrive and return a single users

exports.userfind = (req, res) => {
    if (req.query.id) {
        const id = req.query.id

        User.findById(id).then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not Found user Witth Id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retrieving user with id " + id })
            })
    } else {
        User.find().then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving user information" })
            })
    }
}

// Update a new identified user by user id 

exports.userupdate = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can't be empty" })
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { userFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update User " })
        })
}

// Delete a user with specified user id in the request
exports.userdelete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}