import 'jquery';
import 'popper.js';
import 'bootstrap';
import css from './scss/style.scss';
import moment from 'moment';

document.addEventListener("DOMContentLoaded", () => {

document.querySelector(".articles-list").innerHTML = '<div class="loadingr">Cargando artículos...</div>';

fetch('http://localhost:3001/articles/').then((response) => {
    console.log("Respuesta JSON-SERVER", response);

    if (response.ok) {
    response.json().then(articles => {
        console.log("ARTICLES", articles);
        let html = "";
        if (articles.length == 0){
            html = '<div class="info">No hay artículos para mostrar</div>';
        }
        for (let arti of articles) {
            html += `<article class="article">
            <a href="detail.html"
            <div class="article-pic">
                <img src="${arti.media}" alt="Foto de ${arti.title}">
            </div>
            <div class="article-content">
                <div class="article-title">${arti.title}</div>
                <div class="article-text">${arti.text}</div>
            </div>
            <div class="creation">
            <div class="article-date">${moment(arti.date).format('YYYY MM DD')}</div>
            <div class="author-pic">
            <img src="${arti.authorPic}" alt="Foto de ${arti.authorPic}"></div>
            </div>
            <div class="author">${arti.author}</div>
            </div></a>
        </article>`
        }
        document.querySelector(".articles-list").innerHTML = html;
    });
} else { document.querySelector(".articles-list").innerHTML = '<div class="error">Error en la recuperacion de datos de JSON-SERVER</div>';

}
}).catch((error) => {
    console.error("ERROR CON ARTICLES", error);
    document.querySelector(".articles-list").innerHTML = '<div class="error">Error en la recuperacion de datos de JSON-SERVER</div>';
});
});