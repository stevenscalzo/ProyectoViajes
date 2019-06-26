function isAdmind(req, res, next){
    if(req.session.admin){
        next();
    }else{
        res.render('user/noPermitido');
    }
}

 module.exports = {
    isAdmind
}