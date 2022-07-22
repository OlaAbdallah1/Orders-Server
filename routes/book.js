
const express = require('express')
const request = require('request')
const log = require('../middleware/log')
const router = express.Router()
// check book 
const checkBooks = (id)=>{
    return new Promise((resolve, reject)=>{
        const url = 'http://192.168.56.102:3007/books/info/'+id
        request({url, json:true}, (error, res, body)=>{
            if(error){
                return reject(error)
            } else if(res.statusCode ==404){
                return reject(body)
            }  
            const count = body.numberOfItems
            if(count<=0){
                 return reject("Out of stock")
                 console.log("Out Of stock")
            }
            return resolve({msg:"available", count})

        })
    })
}
//buy book
const buyBook = (id,count)=>{
    return new Promise((resolve, reject)=>{
        const decUrl = 'http://192.168.56.102:3007/books/'+id
        request.patch(
            decUrl,
            {json:{numberOfItems: count-1}},
            (error, res)=>{ 
                if(error){
                    return reject(error)
                }else if(res.statusCode == 200){
                    return resolve("Succesfully ordered")
                            }
                        })  
    }) 
}

//purchase a book
router.get('/books/purchase/:id', log, async(req, res)=>{
    try{
        const id = req.params.id
        const checked = await checkBooks(id)
        console.log(checked)
        const buy = await buyBook(id, checked.count)
        console.log(buy)
        res.status(200).send(buy)
    } catch(error){
      res.status(404).send(error)
    }
})
module.exports = router