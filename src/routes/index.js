// Este apartado me permite redireccionar al usuario a todas las instancias del programa.
// Tambien es donde puedo ver en tiempo real la interaccion que tienen los usuarios con mi pagina
// mediante el metodo post y get. 

const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('index');
  });

router.get('/signup',(req,res,next)=>{
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/signin',
    failureRedirect: '/signup',
    passReqToCallback: true

}));

router.get('/signin',(req,res,next)=>{

    res.render('signin');

});

// Si el usuario inicio sesion correctamente sera redireccionado a la pagina de automatica y control(/profile)
// de lo contrario se quedara en la pagina de inicio de sesion

router.post('/signin',passport.authenticate('local-signin',{
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));



router.get('/profile', isAuthenticated, (req,res,next)=>{
    res.render('profile')
 
});

router.get('/logout',(req,res,next)=>{
    req.logOut();
    res.redirect('/');
    
});


// Esta funcion nos ayuda a no dejar ingresar al usuario a la pagina principal(/profile) si no se ha autenticaado
// previamente

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/');
    }
}


module.exports = router;