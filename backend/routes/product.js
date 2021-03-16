const router = require("express").Router();
const Product = require("../models/product.model");

router.route("/").get((req,res)=>{
    Product.find().then(products => res.send(products))
})

router.route("/item").get((req,res)=>{
    Product.findOne({_id:req.query.id}).then(product => res.send(product))
})

router.route("/").post((req,res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;

    const newProduct = new Product({name,description,price,image});

    newProduct.save().then(
        ()=>{res.json("Product added")}
    ).catch(err => res.status(400).json("Error: " + err));
})

router.route("/").delete((req,res)=>{
    Product.findOneAndDelete({_id:req.query.id}).then(()=>{
        res.send({text:`Produkt s id ${req.query.id} odstraněn`,error:false});
    }).catch(() => res.status(400).send({text:"Nastala chyba - zkuste to znovu",error:true}));
})

router.route("/").put((req,res)=>{
    const _id = req.body._id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const image = req.body.image;

    Product.findById(_id).then((model)=>{
        return Object.assign(model,{name:name,description:description,price:price,image:image});
    }).then((model)=>{
        return model.save();
    }).then(()=>{
        res.send("Produkt upraven");
    }).catch((error)=>{
        res.send(error);
    })
})


module.exports = router;
