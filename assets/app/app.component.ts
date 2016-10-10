import {Component} from 'angular2/core';

import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {ArticlesComponent} from "./articles/articles.component";
import {BlogComponent} from "./blog/blog.component";



@Component({
    selector: 'my-app',
    template:
        `
               <router-outlet></router-outlet>
            
`
    ,directives:[ROUTER_DIRECTIVES,BlogComponent]
})

@RouteConfig([
    {path:'/blog', name:'Blog',component:BlogComponent,useAsDefault:true},
    {path: '/article', name: 'Articles', component: ArticlesComponent}
  ])

export class AppComponent {

}