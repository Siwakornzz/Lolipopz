const Topup = require('../modules/users/models/Topup');

exports.topupcreate = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content Can't be empty! " });
        return;
    }

    // new Topup
    const topup = new Topup({
        username: req.body.username,
        amount: req.body.amount,
        ref: req.body.ref,
        status: req.body.status,

    })

    // save topup in database
    topup
        .save(topup)
        .then(data => {

            res.redirect('/topup')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            })
        })
}

// retrieve and return all topup / retrive and return a single topup

exports.topupfind = (req, res) => {
    if (req.query.id) {
        const id = req.query.id

        Topup.findById(id).then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not Found Topup With Id " + id })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({ message: "error retrieving Topup with id " + id })
            })
    } else {
        Topup.find().then(topup => {
                res.send(topup)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred while retriving Topup information" })
            })
    }
}

// Update a new identified user by user id 

exports.topupupdate = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can't be empty" })
    }

    const id = req.params.id;
    Topup.findByIdAndUpdate(id, req.body, { topupFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update Topup with ${id}. Maybe Topup not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update User " })
        })
}

// Delete a user with specified user id in the request
exports.topupdelete = (req, res) => {
    const id = req.params.id;

    Topup.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Topup was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Topup with id=" + id
            });
        });
}