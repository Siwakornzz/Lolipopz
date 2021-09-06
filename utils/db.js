const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Siwakornzz:Aunda132@cluster0.8fj52.mongodb.net/lolipopz',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.once('open', ()=>{
    console.log("Database Connected :) ");
})