const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const db = "MotelRoom";
// const client = new MongoClient(
//   "mongodb+srv://vinhdev:DbdFT8BPfm2vHNLt@cluster0.hd4rsle.mongodb.net/MotelRoom?retryWrites=true&w=majority",
//   { useUnifiedTopology: true }
//   );
  
  var collectionOne = [];
  var collectionTwo = [];
  
  const BackupData = async () => {

  MongoClient.connect("mongodb+srv://vinhdev:DbdFT8BPfm2vHNLt@cluster0.hd4rsle.mongodb.net/MotelRoom?retryWrites=true&w=majority", function(err, db) {
    if(!err) {
      console.log("We are connected");
    }
    // console.log(db)
    db.collection("rooms", function(err, collection) {
      collection.find().sort({order_num: 1}).toArray(function(err, result) {
        if (err) {
          throw err;
        } else {
          for (i=0; i<result.length; i++) {
            collectionOne[i] = result[i];
          }
        }
      });
      db.collection("images", function(err, collection) {
        collection.find().sort({order_num: 1}).toArray(function(err, result) {
          if (err) {
            throw err;
          } else {
            for (i=0; i<result.length; i++) {
              collectionTwo[i] = result[i];
            }
          }
        });
      });
      console.log(collectionOne)
      // // Thank you aesede!
      // res.render('index.html', {
      //   collectionOne: collectionOne,
      //   collectionTwo: collectionTwo
      // });
    });
  });


  // client.connect(function (err) {
  //   const db = client.db(dbName);
  //   //assert.equal(null, err);



  //   getDocuments(db, function (room) {
  //     console.log("Closing connection.");
  //     client.close();

  //     // Write to file
  //     try {
  //       fs.writeFileSync("src/Backup/room.json", JSON.stringify(room));
  //       console.log("Done writing to file.");
  //     } catch (err) {
  //       console.log("Error writing to file", err);
  //     }
  //   });
  // });

  // const getDocuments = function (db, callback) {
  //   const query = {}; // this is your query criteria
  //   db.collection("rooms")
  //     .find(query)
  //     .toArray(function (err, result) {
  //       if (err) throw err;
  //       callback(result);
  //     });

  // };
};

module.exports = BackupData;
