const mongoose = require("mongoose");

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50,
    },
    lastname:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50,
    },
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:50,
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Prosím zadejte platnou emailovou adresu'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Prosím zadejte platnou emailovou adresu']
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    admin:{
        type:Boolean,
        required:true,
        default:false,
    }
},{
        timestamps:true,
})

const User = mongoose.model("User",userSchema);

module.exports = User;