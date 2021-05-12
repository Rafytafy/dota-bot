const mongoose = require('mongoose');

mongoose.connect('mongodb://rafael_m:oakland2021@mern-stack-shard-00-00.acx9h.mongodb.net:27017,mern-stack-shard-00-01.acx9h.mongodb.net:27017,mern-stack-shard-00-02.acx9h.mongodb.net:27017/dota?ssl=true&replicaSet=atlas-k7kxyz-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("mongoDB Connected..."))
  .catch(err => console.log("error"))