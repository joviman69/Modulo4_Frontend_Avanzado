import moment from 'moment';
export class ArticlesListController {
    

    constructor(selector, articlesService) {
        this.element = document.querySelector(selector);
        this.articlesService = articlesService;
        
    }

    showLoadingMessage() {
        this.element.innerHTML = '<div class="loadingr">Cargando artículos...</div>';
    }

    showErrorMessage() {
        this.element.innerHTML = '<div class="error">Error en la recuperacion de datos de JSON-SERVER</div>';
    }

    showBlankMessage() {
        this.element.innerHTML = '<div class="info">No hay artículos para mostrar</div>';
    }

    renderArticles(articles) {
        let html = '';
        for (let arti of articles) {
            html += `<article class="article">
            <a href="detail.html">
            <div class="article-pic">
                <img src="${arti.media}" alt="Foto de ${arti.title}">
            </div>
            <div class="article-content">
                <div class="article-title">${arti.title}</div>
                <div class="article-text">${arti.text}</div>
            </div>
            </a>
            <div class="creation">
            <div class="article-date">Creado el ${moment(arti.date).format('DD/MM/YYYY HH:mm:ss')}</div>
            <div class="author-pic">
            <img src="${arti.authorPic}" alt="Foto de ${arti.authorPic}"></div>
            </div>
            <div class="author">${arti.author}</div>
            <div> <i class="fas fa-heart"></i> <a href="detail.html"> <i class="fas fa-comments"></i></a>
            </div>
        </article>`
        }
        this.element.innerHTML = html;
    }

    loadArticles() {
        this.showLoadingMessage();
        this.articlesService.list().then(arti => {
            if (arti.length == 0) {
                this.showBlankMessage();
            } else {
                this.renderArticles(arti);
            }
        }).catch((error) => {
            console.error("ERROR CON ARTICLES", error);
            this.showErrorMessage();
        });

    }

}