export class CommentsListController {
    

    constructor(selector, commentsService) {
        this.element = document.querySelector(selector);
        this.commentsService = commentsService;
            
    }

    

    showLoadingMessage() {
        this.element.innerHTML = '<div class="loading">Cargando comentarios...</div>';
    }

    showErrorMessage() {
        this.element.innerHTML = '<div class="error">Error en la recuperación de datos de JSON-SERVER</div>';
    }

    showBlankMessage() {
        this.element.innerHTML = '<div class="info">No hay comentarios para mostrar</div>';
    }

    renderComments(comments) {
        let html = '';
        for (let come of comments) {
            html += `<article class="comment">
            <div class="article-content">
            <div class="comment-text">${come.comment}</div>
                <div class="comment-author">${come.author}</div>
            </div>
            </article>`
        }
        this.element.innerHTML = html;
    }

    loadComments() {
        this.showLoadingMessage();
        this.commentsService.list().then(come => {
            if (come.length == 0) {
                this.showBlankMessage();
            } else {
                this.renderComments(come);
            }
        }).catch((error) => {
            console.error("ERROR CON COMMENTS", error);
            this.showErrorMessage();
        });

    }

}
