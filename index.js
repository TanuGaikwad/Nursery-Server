import express from "express";
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())

//This is temporary db
const plants = [
    {
        "id": 2,
        "name": "Bamboo",
        "category": "indoor",
        "image": "https://m.media-amazon.com/images/I/41bDyuyrJdL._SX300_SY300_QL70_FMwebp_.jpg",
        "price": 150,
        "description": "3 Layer Lucky Bamboo In A Glass Vase"
    },

    {
        "id": 4,
        "name": "Rose",
        "category": "outdoor",
        "image": "https://m.media-amazon.com/images/I/41bDyuyrJdL._SX300_SY300_QL70_FMwebp_.jpg",
        "price": 200,
        "description": "Rose Plant"
    },

    {
        "id": 8,
        "name": "Mango",
        "category": "indoor",
        "image": "https://m.media-amazon.com/images/I/41bDyuyrJdL._SX300_SY300_QL70_FMwebp_.jpg",
        "price": 250,
        "description": "Mango Plant"
    }
]


app.post("/plant", (req, res)=>{
    const {
        name, 
        category,
        image,
        price,
        description
    } = req.body

    if(!name){
   return res.json({
        success:false,
        data:null,
        message:"Name is required..."
    })    
    }

    if(!category){
        return res.json({
             success:false,
             data:null,
             message:"  category is required..."
         })    
         }

         if(!image){
            return res.json({
                 success:false,
                 data:null,
                 message:"image is required..."
             })    
             }

             if(!price){
                return res.json({
                     success:false,
                     data:null,
                     message:"price is required..."
                 })    
                 }

                 
             if(!description){
                return res.json({
                     success:false,
                     data:null,
                     message:"description is required..."
                 })    
                 }

    const randomId = Math.round(Math.random() * 10000)

    const newPlant = {
        id: randomId,
        name: name,
        category: category,
        image: image,
        price: price,
        description: description
    }

    plants.push(newPlant)
    
    res.json({
        success: true,
        data:newPlant,
        message: "New plant added successfully"
    })
})

app.get("/plants", (req, res)=>{

  res.json({
   success: true,
   data: plants,
   message:"All plants fetched successfully "

  })  
})

app.get("/plant/:id", (req, res)=>{

    const {id} =  req.params

    const plant = plants.find((p)=>p.id == id)

    res.json({
        success: plant ? true : false,
        data:plant || null,
        message: plant ? "Plant fetched successfully" : "Plant not found"
    })
})


app.put("/plant/:id", (req, res)=>{
    const {id} = req.params

   let index = -1

   plants.forEach((plant, i)=>{
    if(plant.id == id){
        index = i
    }
   })

   const newObj = {
    id,
    name,
    category,
    image,
    price,
    description
   }

   if(index == -1){

    return  res.json({
    success: false,
    message:`Plant not found for id ${id}`,
    data: null
    })
   }

   else{
    plants[index] = newObj

    return  res.json({
        success: true,
        message:`Plant updated successfully`,
        data: newObj
        })
   } 
   
})

app.delete("/plant/:id", (req, res)=>{
    console.log("Point 1")
    const {id} = req.params
    let index = -1

    plants.forEach((plant, i)=>{
      if(plant.id==id) {

        index = i
      }
    })

    if(index==-1){
        return res.json({
            success: false,
            message: `Plant not found with id ${id}`
        })
    }

    plants.splice(index, 1)


    res.json({
        success: true,
        message: "Plant deleted successfully",
        data: null
    })
})

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})
