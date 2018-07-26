import "jquery";
import "popper.js";
import "bootstrap";
import css from "./scss/style.scss";
import { PubSub } from "pubsub-js";
import { ArticlesService } from "./js/ArticlesService";
import { ArticlesListController } from "./js/ArticlesListController";
import { CommentsService } from "./js/CommentsService";
import { CommentsListController } from "./js/CommentsListController";
import { FormController } from "./js/FormController";

document.addEventListener("DOMContentLoaded", () => {
  let articlesService = new ArticlesService("http://localhost:3001/articles/");
  let articlesListController = new ArticlesListController(
    ".articles-list",
    articlesService
  );
  articlesListController.loadArticles();

  let commentsService = new CommentsService("http://localhost:3001/comments/");
  let commentsListController = new CommentsListController(".comments-list", commentsService, PubSub);
  commentsListController.loadComments();

  let formController = new FormController(".commentsForm", commentsService, PubSub);
});
