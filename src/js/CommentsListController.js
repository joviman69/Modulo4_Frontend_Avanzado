export class CommentsListController {
  constructor(selector, commentsService) {
    this.element = document.querySelector(selector);
    this.commentsService = commentsService;
    PubSub.subscribe("comment:created", (event, comment) => {
      console.log("CommentsListController", comment);
      this.loadComments();
    });
  }

  showLoadingMessage() {
    this.element.innerHTML =
      '<div class="loading">Cargando comentarios...</div>';
  }

  showErrorMessage() {
    this.element.innerHTML =
      '<div class="error">Error en la recuperación de datos de JSON-SERVER</div>';
  }

  showBlankMessage() {
    this.element.innerHTML =
      '<div class="info">No hay comentarios para mostrar</div>';
  }

  renderComments(comments) {
    let html = "";
    for (let come of comments) {
      html += `<article class="comment">
            <div class="article-content card ">
            <div class="comment-text card-body">${come.comment}</div>
            <div class="comment-author card-footer bg-transparent">
            ${come.author} 
            <br>
            ${come.email}
            </div>
            </article>`;
    }
    this.element.innerHTML = html;
  }

  loadComments() {
    if (!this.element) {
      return;
    } else {
      this.showLoadingMessage();
      this.commentsService
        .list()
        .then(come => {
          if (come.length == 0) {
            this.showBlankMessage();
          } else {
            this.renderComments(come);
          }
        })
        .catch(error => {
          console.error("ERROR CARGANDO COMMENTS", error);
          this.showErrorMessage();
        });
    }
  }
}
