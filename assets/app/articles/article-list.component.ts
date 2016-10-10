import {Component} from 'angular2/core';
import { ArticleComponent} from "./Article.component";

import { ArticleService} from "./article.service";
import {OnInit} from "angular2/src/core/linker/interfaces";
import {Article} from "./article";

@Component({
    selector: 'my-article-list',
    template:` <section class="col-md-8 col-md-offset-2">
            <my-article *ngFor="#article of articles" [article]="article" (editClicked)="article.content=$event"></my-article>
        </section>`,
directives:[ArticleComponent]})

export class ArticleListComponent implements  OnInit{
    ngOnInit(): any {
        this._articleService.getArticle().subscribe(
            articles=>{
                this.articles=articles;
                this._articleService.articles=articles;
            }
        );
    }
    constructor(private _articleService: ArticleService){}

    articles:Article[];
}