const express = require("express")
const { PrismaClient } = require("@prisma/client")
const prisma =new PrismaClient()

const app = new express()
app.use(express.json())
app.get("/products",async(req,res) =>{
    const products= await prisma.product.findMany();
    res.status(200).json({message:"Products data fetched",data:products })
})

app.get("/products/:product_id",async(req,res)=>{
    const data= req.params;
    const products= await prisma.product.findUnique({
        where:{
            product_id:data.product_id,
        }
    })
    res.status(200).json({message:"products data fetched",data: products})
})
app.listen(3000)