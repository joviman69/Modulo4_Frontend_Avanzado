import 'jquery';
import 'popper.js';
import 'bootstrap';
import css from './scss/style.scss';
import moment from 'moment';
import { ArticlesService } from './js/ArticlesService';
import { ArticlesListController } from './js/ArticlesListController';
import { CommentsService } from './js/CommentsService';
import { CommentsListController } from './js/CommentsListController';

document.addEventListener("DOMContentLoaded", () => {

    //let appController = new AppController("body", PubSub);
    //let headerController = new HeaderController(".web-header", appController);

    let articlesService = new ArticlesService('http://localhost:3001/articles/');

    let articlesListController = new ArticlesListController(".articles-list", articlesService);
    articlesListController.loadArticles();

    //let formController = new FormController('.songs-form', songsService, PubSub);


    
});


document.addEventListener("DOMContentLoaded", () => {
    
    let commentsService = new CommentsService('http://localhost:3001/comments/');
    
    let commentsListController = new CommentsListController(".comments-list", commentsService);
    commentsListController.loadComments();
    
});
