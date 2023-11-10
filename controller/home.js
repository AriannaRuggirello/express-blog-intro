// Importo i moduli necessari
const express = require("express");
const fs = require("fs");
const path = require("path");

// Importo i dati JSON da un file
const posts = require('../db/posts.json');

/**
 * Gestisco la route dell'indice.
 * @param {express.Request} req - L'oggetto di richiesta.
 * @param {express.Response} res - L'oggetto di risposta.
 */
function index(req, res) {
    // Gestisco diversi formati di risposta
    res.format({
        'html': () => {
            // Leggo il contenuto HTML dal file
            let htmlContent = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf-8");
            res.type('html').send(htmlContent);
        }
    });
}

/**
 * Gestisco la route dei post.
 * @param {express.Request} req - L'oggetto di richiesta.
 * @param {express.Response} res - L'oggetto di risposta.
 */
function post(req, res) {
    // Gestisco diversi formati di risposta
    res.format({
        'html': () => {
            // Creo una pagina HTML con i post
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
        },
        'json': () => {
            // Rispondo con i dati dei post in formato JSON
            res.type('json').send({
                totalElement: posts.length,
                list: posts
            });
        }
    });
}

// Esporto le funzioni
module.exports = {
    index,
    post
};
