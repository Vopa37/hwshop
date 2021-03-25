const router = require("express").Router();
const Order = require("../models/order.model");


router.route("/").get((req,res)=>{
    const userId = req.query.userId;
    Order.find({userId:userId}).then((orders)=>{
        res.send(orders);
    })
})

router.route("/all").get((req,res)=>{
    Order.find().then((orders)=>{
        res.send(orders);
    })
})

router.route("/").post((req,res)=>{
    const userId = req.body.userId;
    const items = req.body.items;
    const price = req.body.price;
    const completed = req.body.completed;

    const newOrder = new Order({userId,items,price,completed});

    newOrder.save().then(
        ()=>{res.send({text:"Objednávka odeslána",error:false})}
    ).catch(err => res.status(400).json("Error: " + err));
})

router.route("/complete").put((req,res)=>{
    const id = req.body.id;

    Order.findById(id).then((model)=>{
        return Object.assign(model,{completed:true});
    }).then((model)=>{
        return model.save();
    }).then(()=>{
        res.send("Objednavka dokoncena");
    });
})

router.route("/").delete((req,res)=>{
    const id = req.query.userId;
    Order.deleteMany({userId:id}).then(()=>{
        res.send(`Objednávky od uživatele ${id} byly smazány`);
    })
})



module.exports = router;