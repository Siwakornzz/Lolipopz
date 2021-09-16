const axios = require('axios');

exports.users = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response) {
            res.render('user', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        })


}

exports.adduser = (req, res) => {
    res.render('adduser');
}

exports.updateuser = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
        .then(function(userdata) {

            res.render("updateuser", { users: userdata.data })
        })
        .catch(err => {
            res.send(err);
        })
}

exports.products = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/product')
        .then(function(response) {
            res.render('products', { products: response.data });
        })
        .catch(err => {
            res.send(err);
        })


}

exports.checkproduct = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/product')
        .then(function(response) {
            res.render('checkproduct', { products: response.data });
        })
        .catch(err => {
            res.send(err);
        })


}

exports.addproduct = (req, res) => {
    res.render('addproduct');
}

exports.updateproduct = (req, res) => {
    axios.get('http://localhost:3000/api/product', { params: { id: req.query.id } })
        .then(function(productdata) {
            res.render("updateproduct", { product: productdata.data })
        })
        .catch(err => {
            res.send(err);
        })
}

// Topup
exports.topup = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/topup')
        .then(function(response) {
            res.render('topup', { topup: response.data });
        })
        .catch(err => {
            res.send(err);
        })


}

exports.checktopup = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/topup')
        .then(function(response) {
            res.render('checktopup', { topup: response.data });
        })
        .catch(err => {
            res.send(err);
        })


}


exports.addtopup = (req, res) => {
    res.render('topup');
}

exports.updatetopup = (req, res) => {
    axios.get('http://localhost:3000/api/topup', { params: { id: req.query.id } })
        .then(function(topup) {
            res.render("updatetopup", { topup: topup.data })
        })
        .catch(err => {
            res.send(err);
        })
}