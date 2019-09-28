const express = require("express")
const firebase = require("firebase")

const config = {
    apiKey: "AIzaSyBfj4tRY_IE2NloFNOmZR6jEMxY1Co2oqM",
    authDomain: "andre-bdf99.firebaseapp.com",
    databaseURL: "https://andre-bdf99.firebaseio.com/",
    projectId: "andre-bdf99",
}

firebase.initializeApp(config)

const db = firebase.firestore();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/static', express.static('public'));

app.get("/",function(req,res){
    res.render("index.ejs");
})

app.post("/register",function(req,res){
    const {email,username,password} = req.body
    console.log(`[ REGISTRO ] O Usuário ${username} tentou criar uma conta!`);
    if (password.length > 5) {
        if (/\S+@\S+\.\S+/.test(email)) {
            if(username.length >= 4){
                firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
                    res.json({"name":username});
                    console.log("[ REGISTRO ] Conta criada!");
                })
                
                .catch(function(error) {
                    res.json({"err":error.message});
                });
                firebase.auth().onAuthStateChanged(function(user) {
                    if(user){
                        user.updateProfile({ displayName: username });
                        const docRef = db.collection('users').doc();
                        const setUser = docRef.set({
                            name: username,
                            email: email,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        });
                            }
                });
            }else{
                res.end("O nome do usuário deve ter no minimo 4 caracteres");
            }
        }else{
            res.end("Email invalido!");
        }
    } else {
        res.end("A senha deve ter no minimo 6 caracteres")
    }
})

app.post("/login",function(req,res){
    const {email,password} = req.body;
    console.log(`[ REGISTRO ] Tentativa de login de ${email}`);
    if (/\S+@\S+\.\S+/.test(email)) {
        if(password.length >= 6){
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(result){
                console.log(`[ REGISTRO ] Login de ${email} realizado!!`);
                res.json({"name":result.user.displayName});
            }).catch(function(error) {
                console.log(`[ REGISTRO ] Login de ${email} falhou!!`);
                if(error.code == 'auth/user-not-found' || error.code == "auth/wrong-password"){
                    res.json({"err":"Incorrect username or password"});   
                }else{
                    res.end({"err":"Error!"});
                }
            });
        }else{
            res.end("A senha deve ter no minimo 6 caracteres");
        }
    }else{
        res.end("Email invalido");
    }
})

app.listen(3000, function(){
    console.log(`[ Server ] rodando na porta 3000`)
})