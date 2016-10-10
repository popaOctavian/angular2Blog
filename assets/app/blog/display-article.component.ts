import {Component} from 'angular2/core';
import {ArticleService} from "../articles/article.service";
import {Article} from "../articles/article";
import {Input} from "angular2/src/core/metadata";
import {OnInit} from "angular2/src/core/linker/interfaces";
@Component({
    selector: 'my-display-article',
    template:`
    
        <div class="blog-post">
             <h2 class="blog-post-title">{{article.title}}</h2>
            <p class="blog-post-meta">  <em>By {{article.author}} </em> </p>
            <p>{{article.content}}</p>
        
        </div>
     
        
    


`
})


export class DisplayArticleComponent {
    @Input() article:Article;
}