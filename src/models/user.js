// Se ejecuta la base de datos y se le envia un esquema con 1 tabla de 2 columnas
// que van a contener los usuarios y las contrasenas. El nombre de la coleccion es users.
// Mediante el metodo de encryptpassword se encripta la contrasena para agregar seguridad al programa.

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} =  mongoose;

const userSchema = new Schema({
    email:String,
    password:String
});

// Estos 2 metodos son para recibir la contrasena encriptada y compararla con las que hay en la base de 
// datos para hacer la debida validacion.

userSchema.methods.encryptPassword = (password) =>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10));

};

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password);

};

module.exports = mongoose.model('users',userSchema);