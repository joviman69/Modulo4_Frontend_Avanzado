import moment from "moment";
import Lib from "./Lib";
moment.locale("es");

export class ArticlesListController {
  constructor(selector, articlesService) {
    this.element = document.querySelector(selector);
    this.articlesService = articlesService;
  }

  showLoadingMessage() {
    this.element.innerHTML = '<div class="loading">Cargando artículos...</div>';
  }

  showErrorMessage() {
    this.element.innerHTML =
      '<div class="error">Error en la recuperación de datos de JSON-SERVER</div>';
  }

  showBlankMessage() {
    this.element.innerHTML =
      '<div class="info">No hay artículos para mostrar</div>';
  }

  renderArticles(articles) {
    let html = "";
    for (let arti of articles) {
      html += `<article class="article">
            <div class="card"
            <a href="detail.html" style="text-decoration: none">
            <div class="article-pic">`;
      let reg = new RegExp("mp4$");
      if (reg.test(arti.media)) {
        html += ` 
                <video class="card-img-top col-sm-8" id="video" width="500" height="500" controls>
                    <source src="${arti.media}" type="video/mp4">
                </video>`;
      } else {
        html += ` 
                <img class="card-img-top col-sm-8" src="${
                  arti.media
                }" alt="Foto de ${arti.title}">`;
      }
      html += `     
            </div>
            <div class="article-content card-body">
                <div class="article-title"><h4 class="card-title">${
                  arti.title
                }</h4></div>
                <div class="article-text card-text">${arti.text}</div>
            </div>
            </a>
            `;
      let creado = Lib.calcDate(arti.date);
      html += `
            <div class="article-date card-footer">
            <small class="text-muted">${creado}</small><br>
            `;

      if (arti.authorPic == "") {
        html += `<img class="col-sm-1" src="./assets/img/nopic.png" alt="imagen predeterminada">`;
      } else {
        html += ` 
            <img class="col-sm-1" src="${arti.authorPic}" alt="Foto de ${
          arti.authorPic
        }">`;
      }
      html += `     
            <div class="author">${arti.author}
            
            <i class="fas fa-heart"></i> <a href="detail.html"> <i class="fas fa-comments"></i></a>
            <a href="detail.html" class="btn ">Ir al artículo</a>
            
            
        </article>`;
    }
    this.element.innerHTML = html;
  }

  loadArticles() {
    if (!this.element) {
      return;
    } else {
      this.showLoadingMessage();
      this.articlesService
        .list()
        .then(arti => {
          if (arti.length == 0) {
            this.showBlankMessage();
          } else {
            this.renderArticles(arti);
          }
        })
        .catch(error => {
          console.error("ERROR CON ARTICLES", error);
          this.showErrorMessage();
        });
    }
  }
}
