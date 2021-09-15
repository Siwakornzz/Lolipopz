const isAdmintogetdata = (req, res, next) => {
    if (req.isAuthenticated()){
        if (req.user.admin == true){
          
        }
        else{
            return res.status(404).render('404')
        } 
    }
    else{
        return res.status(404).render('404')
    }
  }
  
  module.exports = isAdmintogetdata