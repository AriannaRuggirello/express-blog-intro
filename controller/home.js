// importo json
const posts = require('../db/posts.json');

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function index(req,res){
    res.send("<h1>Benvenuto nel mio blog! </h1>");
}




/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function posts(req,res){
    res.format({
        'html' : ()=>{
            const html = [`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
          <h1>POST</h1>`];
    
          html.push("<ul>");
    
          for (const post of posts) {
            html.push(`<li>
              <h3>${post.title}</h3>
           
            </li>`);
          }
    
          html.push("</ul>");
    
          res.send(html.join(""));
           
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
    posts
}