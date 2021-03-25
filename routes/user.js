const router = require("express").Router();
const User = require("../models/user.model");

router.route("/specific").get((req,res)=>{
    User.findOne({username:req.query.username,password:req.query.password}).then(user => res.send(user))
        .catch(err => res.status(400).json("Error: " + err));
})

router.route("/").get((req,res)=>{
    User.find().then(users => res.send(users))
        .catch(err => res.status(400).json("Error: " + err));
})

router.route("/").post((req,res)=>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const admin = req.body.admin;

    const newUser = new User({firstname,lastname,username,email,password,admin});

    newUser.save().then(
        ()=>{res.send({user:newUser,message:{text:"Informace upraveny",error:false}})}
    ).catch(err => res.status(400).json("Error: " + err));
})

router.route("/remove").delete((req,res)=>{
    User.findOneAndDelete({_id:req.query.id}).then(()=>{
        res.send({text:"Uživatel odstraněn",error:false});
    }).catch(() => res.status(400).send({text:"Nastala chyba - zkuste to znovu",error:true}));
})

router.route("/").put((req,res)=>{
    const _id = req.body._id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const username = req.body.username;
    const admin = req.body.admin;
    const email = req.body.email;

    User.findById(_id).then((model)=>{
        return Object.assign(model,{firstname:firstname,lastname:lastname,username:username,email:email,password:password,admin:admin});
    }).then((model)=>{
        return model.save();
    }).then((user)=>{
        res.send(user);
    }).catch((error)=>{
        res.send(error);
    })
})


module.exports = router;

