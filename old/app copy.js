// Importe le paquet express
const express = require('express');

// Création d'une application express
const app = express();

// ??
app.use(express.json());

// Gestion de la sécurité
app.use((req, res, next) => {
    // permet l'accès à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // permet d'ajouter des headers spécifiques aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // permet d'envoyer des requêtes avec les méthodes mentionnée
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });
  

const dataSauce = require('../backend/models/sauce');

//---Revoir l'adresse ici !!!
app.post('/api/stuff', (req, res, next) => {
    //----suppression du faux id envoyé par le frontend
    delete req.body._id;
    //----création d'une instance du modèle dataSauce
    const dataSauce = new dataSauce({

        ...req.body
});
dataSauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});


module.exports = app;


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Pauldt:Ds2022abcd@cluster0.uv2ht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));