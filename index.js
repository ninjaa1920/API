import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app=express();
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/",(req,res)=>{
    res.render("index.ejs");
});
app.post("/unlock",async(req,res)=>{
    try{
        const result=await axios.get("https://api.api-onepiece.com/v2/characters/en");
        const characters=result.data;
        const randomIndex = Math.floor(Math.random() * characters.length);
        const character = characters[randomIndex];
        res.render("index.ejs",{name:character.name,bounty:character.bounty||"unknown"});
    }catch(error){
        res.send(404);
    }
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});