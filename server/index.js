const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const userModel=require("./Models/UserModel")

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/crud")

app.get('/',(req,res)=>{
    userModel.find()
    .then(users=>res.json(users))
    .catch(err =>res.json(err))
})

app.post('/create',(req,res)=>{
    userModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const id=req.params.id;
    userModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        age:req.body.age
    }) 
    .then(user => res.json(user))
    .catch(err => res.json(err))

})

app.delete('/deleteuser/:id',(req,res)=>{
    const id=req.params.id;
    userModel.findByIdAndDelete({_id:id})
    .then(response => res.json())
    .catch(err =>res.json(err))
})

app.listen(3001,()=>{
    console.log("server is running");
})