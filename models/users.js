//using mongoose to connect mongodb
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/nodeauth');
var db = mongoose.connection;

// 連接成功
db.on('open', function(){
    console.log('MongoDB Connection Successed');
});
// 連接失敗
db.on('error', function(){
    console.log('MongoDB Connection Error');
});


// 聲明一個數據集 對象
var userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    createAt: {
        type: Date,
        default : Date.now()
    }
});
// 將數據模型暴露出去
var User = module.exports = mongoose.model('users', userSchema);

//export createUser function
module.exports.createUser = function(newUser, callback){
    newUser.save(callback); //mongoose function to insert to DB
};