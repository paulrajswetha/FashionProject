const express = require("express")
const { PrismaClient } = require("@prisma/client")
const prisma =new PrismaClient()
const { z } = require("zod"); 
const cors = require("cors");
 // Enable CORS for all routes


const app = new express()
app.use(cors({ origin: 'http://localhost:5173' })); 
// app.use(cors());
app.use(express.json())
app.get("/product",async(req,res) =>{
    const products= await prisma.product.findMany();
    res.status(200).json({message:"Products data fetched",data:products })
    console.log(products)
})

app.get("/product/:product_id",async(req,res)=>{
    const data= req.params;
    const products= await prisma.product.findUnique({
        where:{
            product_id:data.product_id,
        }
    })
    res.status(200).json({message:"products data fetched",data: products})
    console.log(products)
})




app.post("/product",async(req,res)=>{
            const productSchema = z.object({
                images:z.string().url(),
                product_id:z.string(),
                title:z.string(),
                price:z.string(),
                discount_percentage:z.string(),
                rating:z.string(),
                review:z.string(),
                
            })
            const data=productSchema.parse(req.body);
    
            const newData = await prisma.product.create({
                data:{
                    images:data.images,
                    product_id:data.product_id,
                    title:data.title,
                    price:data.price,
                    discount_percentage:data.discount_percentage,
                    rating:data.rating,
                    review:data.review,
                
                }
            })
            res.status(201).json({data: newData})          
});

app.delete("/product",async (req,res)=>{    
    const data=req.body
    console.log(data)
    await prisma.product.delete({
    
        where:{
            product_id:data.product_id
        }
    })
    res.status(200).json({message:"Data Deleted successfully"})
    
})
    


app.listen(3000)

