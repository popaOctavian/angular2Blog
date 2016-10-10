import {Component} from 'angular2/core';
import {DisplayArticleComponent} from "./display-article.component";
import {OnInit} from "angular2/src/core/linker/interfaces";
import {ArticleService} from "../articles/article.service";
import {Article} from "../articles/article";
import {ROUTER_DIRECTIVES} from "angular2/router";
@Component({
    selector: 'my-blog',
    template:`

<div class="blog-masthead"  >
      <div class="container">
        <nav class="blog-nav" >
            <img src="https://cdn.auth0.com/blog/angular2-series/angular2-logo.png" style="left: 40px; position: absolute;"/>
            
                <a [routerLink]="['Articles']" style="right: 50px; color:white;text-decoration: none; font-size: 16px; font-family:Arial; position: absolute;  top: 28px;">
            Admin Zone
                </a>
            
           
        </nav>
    </div>
</div>

<div class="blog-header">
       <h1 class="blog-title">Angular 2 Blog</h1>
       <p class="lead blog-description">The official Angular 2 Blog. Here you can find news and info about Angular 2</p>
</div>

<div class="col-sm-8 blog-main" style="position: relative;  top: 250px; left: 30px;">
<div class="container">
<my-display-article *ngFor="#article of articles" [article]="article"></my-display-article>
</div>
</div>

<div class="col-sm-3 col-sm-offset-1 blog-sidebar" style="top:200px; position: relative">
          <div class="sidebar-module sidebar-module-inset">
            <h4>About</h4>
            <p>Angular 2 Blog created by Popa Octavian-Mihai</p>
          </div>
 </div>

`,directives:[DisplayArticleComponent,ROUTER_DIRECTIVES]
})


export class BlogComponent implements  OnInit{
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