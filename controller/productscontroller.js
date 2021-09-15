const Products = require('../modules/users/models/Products');

exports.productscreate = (req,res) =>{
    if (!req.body){
        res.status(400).send({message : "Content Can't be empty! "});
        return;
    }



// new user
const product = new Products({
    name : req.body.name,
    img : req.body.img,
    price : req.body.price
})

// save user in database
product
    .save(product)
    .then(data =>{

        res.redirect('/addproduct')
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating a create operation"
        })
    })
}

// retrieve and return all users / retrive and return a single users

exports.productfind = (req,res) =>{
    if (req.query.id){
        const id = req.query.id

        Products.findById(id).then(data =>{
            if (!data){
                res.status(404).send({message : "Not Found product With Id " + id})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({message: "error retrieving product with id " + id})
        })
    }else{
        Products.find().then(product =>{
            res.send(product)
        })
        .catch(err =>{
            res.status(500).send({ message : err.message || "Error Occurred while retriving Product information" })
        })
    }
}

// Update a new identified user by user id 

exports.productupdate = (req, res) => {
    if(!req.body){
        return res.status(400).send ({message : "Data to update can't be empty"})
    }

    const id = req.params.id;
    Products.findByIdAndUpdate(id, req.body,{ userFindAndModify : false})
    .then(data =>{
        if(!data){
            res.status(404).send({ message : `Cannot Update product with ${id}. Maybe product not found!`})
        }
        else{
            res.send(data)
        }
    })
    .catch(err =>{
        res.status(500).send({ message : "Error Update product "})
    })
}

// Delete a user with specified user id in the request
exports.productdelete = (req, res)=>{
    const id = req.params.id;

    Products.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Product was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
}