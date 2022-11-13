Para poder iniciar correctamente el programa, mongodb y npm deben estar instalados en el sistema y agregados a las variables
de entorno para poder ejecutarlas desde el terminal.

Una vez instaladas, ejecute en la consola de visual code el comando: npm run dev , para poder iniciar el servidor y conectarse a la base de datos
automaticamente. Si todo sale bien, en consola deben aparecer 2 mensajes diciendo que el servidor esta en el puerto 3000 y que la base de datos esta conectada.

En este punto ya puede ingresar a su navegador web y poner localhost:3000 para poder abrir el servidor.

Una vez haya completado los pasos anteriores, abra otra consola y digite el comando mongosh para abrir la base de datos, luego ingrese a la base de de datos
que hemos creado, con el comando: use node-login-passport-local , una vez adentro, digite el comando: db.users.find() , para poder ver los usuarios registrados 
en ese momento. 

En este punto la aplicacion esta lista para guardar usuarios en la base de datos y autenticarlos. Por otra parte usted puede ver en la base de datos a medida
que los usuarios se van registrando.
