'use strict';



var url = 'mongodb://localhost:27017/LiveFoodJournal';



MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("connected to server");

  insertDocuments(db, function() {
    updateDocument(db, function() {
      deleteDocument(db, function() {
        findDocuments(db, function() {
          db.close();

        });
      });
    });
  });
});


//get documents collection
var insertDocuments = function(db, callback) {
//insert some docs
  var collection = db.collection('documents');

  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}],

    function(err, result) {
      assert.equal(err, null);
      assert.equal(3 result.result.n);
      asssert.eual(3, result.ops.length);
      console.log("inserted 3 docs into db collection");
      callback(result);

  });
};


//update docs
var updateDocument = function(db, callback) {
  //get doc collection
  var collection = db.collection('documents');
  //update doc where a is 2, b equal to 1
  collection.updateOne({a : 2}, { $set : {b : 1} },
    function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("updated docs with field equal to 2");
      callback(result);
    });
};


//delete docs
var deleteDocument = function(db, callback) {
  //get docs collection
  var collection = db.collection('documents');
  //insert docs
  collection.deleteOne({ a : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("removed docs with field equal to 3");
    callback(result);
  });
};


//find docs
var findDocuments = function(db, callback) {
  //get docs collection
  var collection = db.collection('documents');
  //find docs
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    assert.equal(2, docs.length);
    console.log("found following docs");
    console.dir(docs);
    callback(docs);
  });
};
