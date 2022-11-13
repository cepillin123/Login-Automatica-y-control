// En este apartado se llevan a cabo las funciones de autenticado del usuario
// se hacen validaciones en la base de datos para que no hayan errores a la hora
// de registrar o iniciar sesion. Este apartado funciona en conjunto con el archivo en
// models/user.js que es donde se guardan los usuarios y las contrasenas en la base de datos.

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.serializeUser((user,done)=>{
    done(null, user.id);
});

passport.deserializeUser(async(id,done)=>{
    const user = await User.findById(id);
    done(null, user);
});

// En caso de haber alguna novedad a la hora del registro o inicio de sesion se ejecuta el req.flash
// para enviar mensajes de error en caso de que el email ya exista, que la contrasena es incorrecta o que el
// usuario no existe

passport.use('local-signup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true    
},async (req,email,password,done) =>{

   const user = await User.findOne({email: email});
   if(user){

    return done(null, false, req.flash('signupMessage','El email ya ha sido tomado.'));

   } else {

    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    await newUser.save();
    done(null, newUser);

   }
  
})); 

passport.use('local-signin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true  

} , async (req,email,password, done)=>{
    const user = await User.findOne({email:email});
    if(!user){
        return done(null, false, req.flash('signinMessage','Usuario no encontrado'));
    }
    if(!user.comparePassword(password)){
        return done(null,false, req.flash('signinMessage','Contraseña incorrecta'));
    }
    done(null,user);
}));