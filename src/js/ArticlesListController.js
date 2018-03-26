import moment from 'moment';
export class ArticlesListController {
    

    constructor(selector, articlesService) {
        this.element = document.querySelector(selector);
        this.articlesService = articlesService;
            
    }

    

    showLoadingMessage() {
        this.element.innerHTML = '<div class="loading">Cargando artículos...</div>';
    }

    showErrorMessage() {
        this.element.innerHTML = '<div class="error">Error en la recuperación de datos de JSON-SERVER</div>';
    }

    showBlankMessage() {
        this.element.innerHTML = '<div class="info">No hay artículos para mostrar</div>';
    }

    renderArticles(articles) {
        let html = '';
        for (let arti of articles) {
            html += `<article class="article">
            <a href="detail.html">
            <div class="article-pic">`
            let reg = new RegExp("mp4$");
            if (reg.test(arti.media)) {
                html += ` 
                <video id="video" width="500" height="500" controls>
                    <source src="${arti.media}" type="video/mp4">
                </video>`
            } 
            else {
                html += ` 
                <img src="${arti.media}" alt="Foto de ${arti.title}">`
                };
            html += `     
            </div>
            <div class="article-content">
                <div class="article-title"><h4>${arti.title}</h4></div>
                <div class="article-text">${arti.text}</div>
            </div>
            </a>
            <div class="creation">
            <div class="article-date">Creado el ${moment(arti.date).format('DD/MM/YYYY HH:mm:ss')}</div>
            <div class="author-pic">`
            if (arti.authorPic == "") {
                html += `<img src="./assets/img/nopic.png" alt="imagen predeterminada">`
            } 
            else {
                html += ` 
            <img src="${arti.authorPic}" alt="Foto de ${arti.authorPic}"></div>`
            };
            html += `     
            <div class="author">${arti.author}</div>
            </div>
            <div> <i class="fas fa-heart"></i> <a href="detail.html"> <i class="fas fa-comments"></i></a>
            </div>
        </article>`
        }
        this.element.innerHTML = html;
    }

    loadArticles() {
        if (!this.element) {
            return
        }
        else {
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

}
