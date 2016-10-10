import {Component} from 'angular2/core';
import { Article} from "./article";
import {Input, Output} from "angular2/src/core/metadata";
import {EventEmitter} from "angular2/src/facade/async";
import { ArticleService} from "./article.service";
@Component({
    selector: 'my-article',
    template: `  

    <ul style="list-style-type: none"> 
    <li  id="list">
        <article class="panel panel-default"  >
       
            <textarea style="display: block;width: 100%;resize:vertical ;" class="panel-body">{{article.content}}</textarea>
    
            <footer class="panel-footer">
                <div class="author">
                   {{article.title}} - {{article.author}}
                </div>
                <div class="config" >
                    <a (click)="onEdit()">Edit&nbsp;&nbsp;&nbsp;</a>
                    <a  (click)="onDelete()">Delete</a>
                </div>
            </footer>
       </article>
       </li>
    </ul>

    `,styles:[`


ul {
   -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}
ul > li {
 -moz-transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    transform: rotate(-180deg);
}
        .author{
            display:inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
            
        }
    #list{
    list-style-type: none;
  
   float:none;
    }
        .config{
        
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }`]
})

export class ArticleComponent{
       @Input() article:Article;
    @Output() editClicked=new EventEmitter<string>();

    constructor(private _articleService:ArticleService){

    }
    onEdit(){
        this._articleService.editArticle(this.article);
    }
    onClick(){
       this.editClicked.emit('changed');
    }
    onDelete(){
        this._articleService.deleteArticle(this.article).subscribe(
            data=>console.log(data),
            error=>console.error(error)
        );
    }
}