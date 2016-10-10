
import {Component} from 'angular2/core';
import {ArticleInputComponent} from "./article-input.component";
import {ArticleListComponent} from "./article-list.component";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: 'articles',
    template:`
<div class="blog-masthead"  >
      <div class="container">
        <nav class="blog-nav" >
            <img src="https://cdn.auth0.com/blog/angular2-series/angular2-logo.png" style="left: 40px; position: absolute;"/>
           
         <a   style="right: 63px; color:white;text-decoration: none; font-size: 16px; font-family:Arial; position: absolute;  top: 28px;" [routerLink]="['Blog']">
            Back to blog
            </a>
            
        </nav>
    </div>
</div>


<div class="row spacing" style="top:55px; position: relative;">
              <my-article-input></my-article-input>
            </div>
    <div class="row spacing" style="top:55px; position: relative;">
        <my-article-list></my-article-list>
    </div>
`,directives:[ArticleInputComponent,ArticleListComponent,ROUTER_DIRECTIVES],styles:[`


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
        `]})


export class ArticlesComponent{}