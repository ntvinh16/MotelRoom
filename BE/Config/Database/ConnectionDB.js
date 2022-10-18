const MongoClient = require('mongoose');
require('dotenv').config()


// MongoClient.set('useNewUrlParser', true);
// MongoClient.set('useFindAndModify', false);
// MongoClient.set('useCreateIndex', true)



const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await MongoClient.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB
