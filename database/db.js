const mongoose = require('mongoose');

// let url ="mongodb+srv://kyawzaywin:kzw1234567@cluster0-d7ykp.mongodb.net/test?retryWrites=true&w=majority";           //place your db name
let url = "mongodb://localhost:27017/myDBnewblabla";   
const connect = mongoose.connect(url, { useNewUrlParser: true });
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const mongoosePaginate = require('mongoose-paginate');
let Schema = mongoose.Schema;


let UserScheme = new Schema({
    name: { type: String, require: true,minlength:1,maxlength:50},
    email: { type: String, require: true,minlength:5,maxlength:255,unique:true },
    password: { type: String, require: true, minlength:1,maxlength:1024},
    isAdmin:{type:Boolean,default:false}, 
    ppImage: { type: String, required: true ,default:"hi"},
    since: { type: Date, require: true },
    
})

let placeScheme = new Schema({
    name: { type: String, require: true,minlength:1,maxlength:250},
    firstPara: { type: String, require: true, minlength:5,maxlength:1024},
    SecondPara: { type: String, require: true, minlength:5,maxlength:1024},
    
    history: { type: String, require: true, minlength:5,maxlength:1024},
    location: { type: String, require: true, minlength:5,maxlength:1024},  
    imageOne: {type:String, require:true,minlength:2,maxlength:1024},
    imageTwo: {type:String, require:true,minlength:2,maxlength:1024},
    imageThree: {type:String, require:true,minlength:2,maxlength:1024},
    imageFour: {type:String, require:true,minlength:2,maxlength:1024},
    since: { type: Date, require: true },
    
})

let RoomScheme = new Schema({
    u1: { type: String, require: true,minlength:5,maxlength:200,unique:false},
    u2: { type: String, require: true,minlength:5,maxlength:255,unique:false },
    roomId: { type: String, require: true, minlength:5,maxlength:1024},
   
})

let User = mongoose.model('user', UserScheme);
let Room = mongoose.model('room', RoomScheme);
let Place = mongoose.model('place',placeScheme)
module.exports = {
    User,
    Room,
    Place
}