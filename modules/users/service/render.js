const axios = require('axios');

exports.adduser = (req, res) =>{
    res.render('adduser');
}

exports.updateuser = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("updateuser", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.addproduct = (req, res) =>{
    res.render('addproduct');
}

exports.updateproduct = (req, res) =>{
    axios.get('http://localhost:3000/api/product', { params : { id : req.query.id }})
        .then(function(productdata){
            res.render("updateproduct", { product : productdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
    }