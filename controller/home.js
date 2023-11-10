const express = require("express");

const fs = require("fs");
const path = require("path");
// importo json
const posts = require('../db/posts.json');


/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function index(req,res){
    res.format({
        'html' : ()=>{
            let htmlContent = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");
       
            res.type('html').send(htmlContent)
        }
     
    })

   
}


/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function post(req,res){
    res.format({
        'html' : ()=>{
            const html = [`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
          <h1>POST</h1>`];
    
          html.push("<div class='row row-cols-3 justify-content-between '>");
    
          for (const post of posts) {
            html.push(`
            <div class='col'>
            <div class="card" style="width: 250px;">
            <img src="/imgs/${post.image}" class="card-img-top" alt="...">
            <h5 class="card-title"></h5>
            <div class="card-body">
                <p class="card-text">${post.content}</p>
            </div>
            </div>
            </div>`);
          }
    
          html.push("</div>");
    
          res.send(html.join(""));

        // let postContent = fs.readFileSync(path.resolve(__dirname, "../post.html"), "utf-8");
       
        // res.type('html').send(postContent)

           
        },
        'json' :()=>{
            res.type('json').send({
                totalElement: posts.length,
                list: posts
            })
        }
    })
    
}


// esporto
module.exports={
    index,
    post
}