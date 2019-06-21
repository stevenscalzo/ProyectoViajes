function isAdmind(req, res, next){
    if(req.session.admin == 1){
        next();
    }else{
        res.status(403).send('NO tienes permisos')
    }
}

 module.exports = {
    isAdmind
}