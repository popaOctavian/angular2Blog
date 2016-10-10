var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("articles/article", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Article;
    return {
        setters:[],
        execute: function() {
            Article = (function () {
                function Article(title, content, author, articleId) {
                    this.content = content;
                    this.author = author;
                    this.title = title;
                    this.articleId = articleId;
                }
                return Article;
            }());
            exports_1("Article", Article);
        }
    }
});
System.register("articles/article.service", ["articles/article", "angular2/http", "angular2/src/http/headers", 'rxjs/Rx', "rxjs/Observable", "angular2/src/core/di/decorators", "angular2/src/facade/async"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var article_1, http_1, headers_1, Observable_1, decorators_1, async_1;
    var ArticleService;
    return {
        setters:[
            function (article_1_1) {
                article_1 = article_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (headers_1_1) {
                headers_1 = headers_1_1;
            },
            function (_1) {},
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            ArticleService = (function () {
                function ArticleService(_http) {
                    this._http = _http;
                    this.articles = [];
                    this.articleIsEdit = new async_1.EventEmitter();
                }
                ArticleService.prototype.addArticle = function (article) {
                    var body = JSON.stringify(article);
                    var headers = new headers_1.Headers({ 'Content-Type': 'application/json' });
                    return this._http.post('http://localhost:3000/article', body, { headers: headers })
                        .map(function (response) {
                        var data = response.json().obj;
                        var article = new article_1.Article(data.title, data.content, data.author, data._id);
                        return article;
                    })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                ArticleService.prototype.getArticle = function () {
                    return this._http.get('http://localhost:3000/article').map(function (response) {
                        var data = response.json().obj;
                        var objs = [];
                        for (var i = 0; i < data.length; i++) {
                            var article = new article_1.Article(data[i].title, data[i].content, data[i].author, data[i]._id);
                            objs.push(article);
                        }
                        ;
                        return objs;
                    }).catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                ArticleService.prototype.updateArticle = function (article) {
                    var body = JSON.stringify(article);
                    var headers = new headers_1.Headers({ 'Content-Type': 'application/json' });
                    // this.articles[this.articles.indexOf(message)]=new Message('edited',null,'dummy');
                    return this._http.patch('http://localhost:3000/article/' + article.articleId, body, { headers: headers })
                        .map(function (response) { return response.json(); }).catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                ArticleService.prototype.editArticle = function (article) {
                    this.articleIsEdit.emit(article);
                    // this.articles[this.articles.indexOf(message)]=new Message('edited',null,'dummy');
                };
                ArticleService.prototype.deleteArticle = function (article) {
                    this.articles.splice(this.articles.indexOf(article), 1);
                    return this._http.delete('http://localhost:3000/article/' + article.articleId)
                        .map(function (response) { return response.json(); }).catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                ArticleService = __decorate([
                    decorators_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ArticleService);
                return ArticleService;
            }());
            exports_2("ArticleService", ArticleService);
        }
    }
});
System.register("articles/article-input.component", ['angular2/core', "articles/article", "articles/article.service"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_1, article_2, article_service_1;
    var ArticleInputComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (article_2_1) {
                article_2 = article_2_1;
            },
            function (article_service_1_1) {
                article_service_1 = article_service_1_1;
            }],
        execute: function() {
            ArticleInputComponent = (function () {
                function ArticleInputComponent(_articleService) {
                    this._articleService = _articleService;
                    this.article = null;
                }
                ArticleInputComponent.prototype.onCancel = function () {
                    this.article = null;
                };
                ArticleInputComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._articleService.articleIsEdit.subscribe(function (article) {
                        _this.article = article;
                    });
                };
                ArticleInputComponent.prototype.onSubmit = function (form) {
                    var _this = this;
                    if (this.article) {
                        //edit
                        this.article.title = form.title;
                        this.article.content = form.content;
                        this.article.author = form.author;
                        this._articleService.updateArticle(this.article)
                            .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
                        this.article = null;
                    }
                    else {
                        var article = new article_2.Article(form.title, form.content, form.author, null);
                        this._articleService.addArticle(article).subscribe(function (data) {
                            console.log(data);
                            _this._articleService.articles.push(data);
                        }, function (error) { return console.error(error); });
                    }
                };
                ArticleInputComponent = __decorate([
                    core_1.Component({
                        selector: 'my-article-input',
                        template: "\n        <section class=\"col-md-8 col-md-offset-2\">\n        <form (ngSubmit)=\"onSubmit(f.value)\" #f=\"ngForm\" >\n            <div class=\"form-group\">\n            <label for=\"title\">Title</label>\n                   <input required  ngControl=\"title\" type=\"text\" class=\"form-control\" id=\"title\" #input [ngModel]=\"article?.title\" />\n                  <br>\n                <label for=\"content\">Content</label>\n                <textarea style=\"resize:vertical;\" required ngControl=\"content\" type=\"text\" class=\"form-control\" id=\"content\" #input [ngModel]=\"article?.content\"></textarea>\n                <br>\n                 <label for=\"author\">Author and Date</label>\n                <input required  ngControl=\"author\" type=\"text\" class=\"form-control\" id=\"author\" #input [ngModel]=\"article?.author\" />\n            </div>\n            <button type=\"submit\" class=\"btn btn-primary\">{{ !article ? 'Post Article':'Save Article'}}</button>\n            <button type=\"submit\" (onClick)=\"onCancel()\" *ngIf=\"article\" class=\"btn btn-danger\">Cancel</button>\n        </form>\n               \n        </section>\n"
                    }), 
                    __metadata('design:paramtypes', [article_service_1.ArticleService])
                ], ArticleInputComponent);
                return ArticleInputComponent;
            }());
            exports_3("ArticleInputComponent", ArticleInputComponent);
        }
    }
});
System.register("articles/Article.component", ['angular2/core', "articles/article", "angular2/src/core/metadata", "angular2/src/facade/async", "articles/article.service"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_2, article_3, metadata_1, async_2, article_service_2;
    var ArticleComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (article_3_1) {
                article_3 = article_3_1;
            },
            function (metadata_1_1) {
                metadata_1 = metadata_1_1;
            },
            function (async_2_1) {
                async_2 = async_2_1;
            },
            function (article_service_2_1) {
                article_service_2 = article_service_2_1;
            }],
        execute: function() {
            ArticleComponent = (function () {
                function ArticleComponent(_articleService) {
                    this._articleService = _articleService;
                    this.editClicked = new async_2.EventEmitter();
                }
                ArticleComponent.prototype.onEdit = function () {
                    this._articleService.editArticle(this.article);
                };
                ArticleComponent.prototype.onClick = function () {
                    this.editClicked.emit('changed');
                };
                ArticleComponent.prototype.onDelete = function () {
                    this._articleService.deleteArticle(this.article).subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
                };
                __decorate([
                    metadata_1.Input(), 
                    __metadata('design:type', article_3.Article)
                ], ArticleComponent.prototype, "article", void 0);
                __decorate([
                    metadata_1.Output(), 
                    __metadata('design:type', Object)
                ], ArticleComponent.prototype, "editClicked", void 0);
                ArticleComponent = __decorate([
                    core_2.Component({
                        selector: 'my-article',
                        template: "  \n\n    <ul style=\"list-style-type: none\"> \n    <li  id=\"list\">\n        <article class=\"panel panel-default\"  >\n       \n            <textarea style=\"display: block;width: 100%;resize:vertical ;\" class=\"panel-body\">{{article.content}}</textarea>\n    \n            <footer class=\"panel-footer\">\n                <div class=\"author\">\n                   {{article.title}} - {{article.author}}\n                </div>\n                <div class=\"config\" >\n                    <a (click)=\"onEdit()\">Edit&nbsp;&nbsp;&nbsp;</a>\n                    <a  (click)=\"onDelete()\">Delete</a>\n                </div>\n            </footer>\n       </article>\n       </li>\n    </ul>\n\n    ", styles: ["\n\n\nul {\n   -moz-transform: rotate(180deg);\n    -webkit-transform: rotate(180deg);\n    transform: rotate(180deg);\n}\nul > li {\n -moz-transform: rotate(-180deg);\n    -webkit-transform: rotate(-180deg);\n    transform: rotate(-180deg);\n}\n        .author{\n            display:inline-block;\n            font-style: italic;\n            font-size: 12px;\n            width: 80%;\n            \n        }\n    #list{\n    list-style-type: none;\n  \n   float:none;\n    }\n        .config{\n        \n            display: inline-block;\n            text-align: right;\n            font-size: 12px;\n            width: 19%;\n        }"]
                    }), 
                    __metadata('design:paramtypes', [article_service_2.ArticleService])
                ], ArticleComponent);
                return ArticleComponent;
            }());
            exports_4("ArticleComponent", ArticleComponent);
        }
    }
});
System.register("articles/article-list.component", ['angular2/core', "articles/Article.component", "articles/article.service"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_3, Article_component_1, article_service_3;
    var ArticleListComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (Article_component_1_1) {
                Article_component_1 = Article_component_1_1;
            },
            function (article_service_3_1) {
                article_service_3 = article_service_3_1;
            }],
        execute: function() {
            ArticleListComponent = (function () {
                function ArticleListComponent(_articleService) {
                    this._articleService = _articleService;
                }
                ArticleListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._articleService.getArticle().subscribe(function (articles) {
                        _this.articles = articles;
                        _this._articleService.articles = articles;
                    });
                };
                ArticleListComponent = __decorate([
                    core_3.Component({
                        selector: 'my-article-list',
                        template: " <section class=\"col-md-8 col-md-offset-2\">\n            <my-article *ngFor=\"#article of articles\" [article]=\"article\" (editClicked)=\"article.content=$event\"></my-article>\n        </section>",
                        directives: [Article_component_1.ArticleComponent] }), 
                    __metadata('design:paramtypes', [article_service_3.ArticleService])
                ], ArticleListComponent);
                return ArticleListComponent;
            }());
            exports_5("ArticleListComponent", ArticleListComponent);
        }
    }
});
System.register("articles/articles.component", ['angular2/core', "articles/article-input.component", "articles/article-list.component", "angular2/router"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_4, article_input_component_1, article_list_component_1, router_1;
    var ArticlesComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (article_input_component_1_1) {
                article_input_component_1 = article_input_component_1_1;
            },
            function (article_list_component_1_1) {
                article_list_component_1 = article_list_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            ArticlesComponent = (function () {
                function ArticlesComponent() {
                }
                ArticlesComponent = __decorate([
                    core_4.Component({
                        selector: 'articles',
                        template: "\n<div class=\"blog-masthead\"  >\n      <div class=\"container\">\n        <nav class=\"blog-nav\" >\n            <img src=\"https://cdn.auth0.com/blog/angular2-series/angular2-logo.png\" style=\"left: 40px; position: absolute;\"/>\n           \n         <a   style=\"right: 63px; color:white;text-decoration: none; font-size: 16px; font-family:Arial; position: absolute;  top: 28px;\" [routerLink]=\"['Blog']\">\n            Back to blog\n            </a>\n            \n        </nav>\n    </div>\n</div>\n\n\n<div class=\"row spacing\" style=\"top:55px; position: relative;\">\n              <my-article-input></my-article-input>\n            </div>\n    <div class=\"row spacing\" style=\"top:55px; position: relative;\">\n        <my-article-list></my-article-list>\n    </div>\n", directives: [article_input_component_1.ArticleInputComponent, article_list_component_1.ArticleListComponent, router_1.ROUTER_DIRECTIVES], styles: ["\n\n\nul {\n   -moz-transform: rotate(180deg);\n    -webkit-transform: rotate(180deg);\n    transform: rotate(180deg);\n}\nul > li {\n -moz-transform: rotate(-180deg);\n    -webkit-transform: rotate(-180deg);\n    transform: rotate(-180deg);\n}\n        "] }), 
                    __metadata('design:paramtypes', [])
                ], ArticlesComponent);
                return ArticlesComponent;
            }());
            exports_6("ArticlesComponent", ArticlesComponent);
        }
    }
});
System.register("blog/display-article.component", ['angular2/core', "articles/article", "angular2/src/core/metadata"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_5, article_4, metadata_2;
    var DisplayArticleComponent;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (article_4_1) {
                article_4 = article_4_1;
            },
            function (metadata_2_1) {
                metadata_2 = metadata_2_1;
            }],
        execute: function() {
            DisplayArticleComponent = (function () {
                function DisplayArticleComponent() {
                }
                __decorate([
                    metadata_2.Input(), 
                    __metadata('design:type', article_4.Article)
                ], DisplayArticleComponent.prototype, "article", void 0);
                DisplayArticleComponent = __decorate([
                    core_5.Component({
                        selector: 'my-display-article',
                        template: "\n    \n        <div class=\"blog-post\">\n             <h2 class=\"blog-post-title\">{{article.title}}</h2>\n            <p class=\"blog-post-meta\">  <em>By {{article.author}} </em> </p>\n            <p>{{article.content}}</p>\n        \n        </div>\n     \n        \n    \n\n\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], DisplayArticleComponent);
                return DisplayArticleComponent;
            }());
            exports_7("DisplayArticleComponent", DisplayArticleComponent);
        }
    }
});
System.register("blog/blog.component", ['angular2/core', "blog/display-article.component", "articles/article.service", "angular2/router"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_6, display_article_component_1, article_service_4, router_2;
    var BlogComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (display_article_component_1_1) {
                display_article_component_1 = display_article_component_1_1;
            },
            function (article_service_4_1) {
                article_service_4 = article_service_4_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            }],
        execute: function() {
            BlogComponent = (function () {
                function BlogComponent(_articleService) {
                    this._articleService = _articleService;
                }
                BlogComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._articleService.getArticle().subscribe(function (articles) {
                        _this.articles = articles;
                        _this._articleService.articles = articles;
                    });
                };
                BlogComponent = __decorate([
                    core_6.Component({
                        selector: 'my-blog',
                        template: "\n\n<div class=\"blog-masthead\"  >\n      <div class=\"container\">\n        <nav class=\"blog-nav\" >\n            <img src=\"https://cdn.auth0.com/blog/angular2-series/angular2-logo.png\" style=\"left: 40px; position: absolute;\"/>\n            \n                <a [routerLink]=\"['Articles']\" style=\"right: 50px; color:white;text-decoration: none; font-size: 16px; font-family:Arial; position: absolute;  top: 28px;\">\n            Admin Zone\n                </a>\n            \n           \n        </nav>\n    </div>\n</div>\n\n<div class=\"blog-header\">\n       <h1 class=\"blog-title\">Angular 2 Blog</h1>\n       <p class=\"lead blog-description\">The official Angular 2 Blog. Here you can find news and info about Angular 2</p>\n</div>\n\n<div class=\"col-sm-8 blog-main\" style=\"position: relative;  top: 250px; left: 30px;\">\n<div class=\"container\">\n<my-display-article *ngFor=\"#article of articles\" [article]=\"article\"></my-display-article>\n</div>\n</div>\n\n<div class=\"col-sm-3 col-sm-offset-1 blog-sidebar\" style=\"top:200px; position: relative\">\n          <div class=\"sidebar-module sidebar-module-inset\">\n            <h4>About</h4>\n            <p>Angular 2 Blog created by Popa Octavian-Mihai</p>\n          </div>\n </div>\n\n", directives: [display_article_component_1.DisplayArticleComponent, router_2.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [article_service_4.ArticleService])
                ], BlogComponent);
                return BlogComponent;
            }());
            exports_8("BlogComponent", BlogComponent);
        }
    }
});
System.register("app.component", ['angular2/core', "angular2/router", "articles/articles.component", "blog/blog.component"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_7, router_3, articles_component_1, blog_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (articles_component_1_1) {
                articles_component_1 = articles_component_1_1;
            },
            function (blog_component_1_1) {
                blog_component_1 = blog_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_7.Component({
                        selector: 'my-app',
                        template: "\n               <router-outlet></router-outlet>\n            \n",
                        directives: [router_3.ROUTER_DIRECTIVES, blog_component_1.BlogComponent]
                    }),
                    router_3.RouteConfig([
                        { path: '/blog', name: 'Blog', component: blog_component_1.BlogComponent, useAsDefault: true },
                        { path: '/article', name: 'Articles', component: articles_component_1.ArticlesComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_9("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component", "articles/article.service", "angular2/src/router/router_providers", "angular2/src/core/di/provider", "angular2/src/router/location/location_strategy", "angular2/src/router/location/hash_location_strategy", "angular2/http"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var browser_1, app_component_1, article_service_5, router_providers_1, provider_1, location_strategy_1, hash_location_strategy_1, http_2;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (article_service_5_1) {
                article_service_5 = article_service_5_1;
            },
            function (router_providers_1_1) {
                router_providers_1 = router_providers_1_1;
            },
            function (provider_1_1) {
                provider_1 = provider_1_1;
            },
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
            },
            function (hash_location_strategy_1_1) {
                hash_location_strategy_1 = hash_location_strategy_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [article_service_5.ArticleService, router_providers_1.ROUTER_PROVIDERS, provider_1.provide(location_strategy_1.LocationStrategy, { useClass: hash_location_strategy_1.HashLocationStrategy }), http_2.HTTP_PROVIDERS]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFydGljbGVzL2FydGljbGUudHMiLCJhcnRpY2xlcy9hcnRpY2xlLnNlcnZpY2UudHMiLCJhcnRpY2xlcy9hcnRpY2xlLWlucHV0LmNvbXBvbmVudC50cyIsImFydGljbGVzL0FydGljbGUuY29tcG9uZW50LnRzIiwiYXJ0aWNsZXMvYXJ0aWNsZS1saXN0LmNvbXBvbmVudC50cyIsImFydGljbGVzL2FydGljbGVzLmNvbXBvbmVudC50cyIsImJsb2cvZGlzcGxheS1hcnRpY2xlLmNvbXBvbmVudC50cyIsImJsb2cvYmxvZy5jb21wb25lbnQudHMiLCJhcHAuY29tcG9uZW50LnRzIiwiYm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1lBQUE7Z0JBUUksaUJBQVksS0FBWSxFQUFFLE9BQWMsRUFBQyxNQUFhLEVBQUMsU0FBaUI7b0JBQ3BFLElBQUksQ0FBQyxPQUFPLEdBQUMsT0FBTyxDQUFDO29CQUNyQixJQUFJLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQztvQkFDbkIsSUFBSSxDQUFDLEtBQUssR0FBQyxLQUFLLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUMsU0FBUyxDQUFDO2dCQUc3QixDQUFDO2dCQUNMLGNBQUM7WUFBRCxDQWhCQSxBQWdCQyxJQUFBO1lBaEJELDZCQWdCQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lDUEQ7Z0JBRUksd0JBQW9CLEtBQVU7b0JBQVYsVUFBSyxHQUFMLEtBQUssQ0FBSztvQkFEOUIsYUFBUSxHQUFXLEVBQUUsQ0FBQztvQkFFMUIsa0JBQWEsR0FBQyxJQUFJLG9CQUFZLEVBQVcsQ0FBQztnQkFETixDQUFDO2dCQUdqQyxtQ0FBVSxHQUFWLFVBQVcsT0FBZTtvQkFDdEIsSUFBTSxJQUFJLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbkMsSUFBTSxPQUFPLEdBQUMsSUFBSSxpQkFBTyxDQUFDLEVBQUMsY0FBYyxF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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUNmRCxtQkFBUyxDQUFDLDRCQUFZLEVBQUMsQ0FBQyxnQ0FBYyxFQUFDLG1DQUFnQixFQUFDLGtCQUFPLENBQUMsb0NBQWdCLEVBQUUsRUFBQyxRQUFRLEVBQUMsNkNBQW9CLEVBQUMsQ0FBQyxFQUFDLHFCQUFjLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6Ii4uLy4uLy4uL0xhdGVzdCBQcm9qZWN0IFZlcnNpb24vYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFydGljbGV7XHJcblxyXG5cclxuICAgIHRpdGxlOnN0cmluZ1xyXG4gICAgY29udGVudDpzdHJpbmc7XHJcbiAgICBhdXRob3I6c3RyaW5nO1xyXG4gICAgcHVibGljIGFydGljbGVJZDpzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IodGl0bGU6c3RyaW5nLCBjb250ZW50OnN0cmluZyxhdXRob3I6c3RyaW5nLGFydGljbGVJZD86c3RyaW5nKXtcclxuICAgICAgICB0aGlzLmNvbnRlbnQ9Y29udGVudDtcclxuICAgICAgICB0aGlzLmF1dGhvcj1hdXRob3I7XHJcbiAgICAgICAgdGhpcy50aXRsZT10aXRsZTtcclxuICAgICAgICB0aGlzLmFydGljbGVJZD1hcnRpY2xlSWQ7XHJcblxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IEFydGljbGV9IGZyb20gXCIuL2FydGljbGVcIjtcclxuaW1wb3J0IHtIdHRwfSBmcm9tIFwiYW5ndWxhcjIvaHR0cFwiO1xyXG5pbXBvcnQge0hlYWRlcnN9IGZyb20gXCJhbmd1bGFyMi9zcmMvaHR0cC9oZWFkZXJzXCI7XHJcbmltcG9ydCAncnhqcy9SeCc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9kaS9kZWNvcmF0b3JzXCI7XHJcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luY1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXJ0aWNsZVNlcnZpY2V7XHJcbiAgICBhcnRpY2xlczpBcnRpY2xlW109W107XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOkh0dHApe31cclxuYXJ0aWNsZUlzRWRpdD1uZXcgRXZlbnRFbWl0dGVyPEFydGljbGU+KCk7XHJcblxyXG4gICAgYWRkQXJ0aWNsZShhcnRpY2xlOkFydGljbGUpe1xyXG4gICAgICAgIGNvbnN0IGJvZHk9SlNPTi5zdHJpbmdpZnkoYXJ0aWNsZSk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycz1uZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FydGljbGUnLGJvZHkse2hlYWRlcnM6aGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5tYXAocmVzcG9uc2U9PntcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGE9cmVzcG9uc2UuanNvbigpLm9iajtcclxuICAgICAgICAgICAgICAgIGxldCBhcnRpY2xlPW5ldyBBcnRpY2xlKGRhdGEudGl0bGUsZGF0YS5jb250ZW50LGRhdGEuYXV0aG9yLGRhdGEuX2lkKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhcnRpY2xlO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3I9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG4gICAgZ2V0QXJ0aWNsZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FydGljbGUnKS5tYXAocmVzcG9uc2U9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uKCkub2JqO1xyXG4gICAgICAgICAgICBsZXQgb2JqczphbnlbXT1bXTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxkYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IGFydGljbGU9bmV3IEFydGljbGUoZGF0YVtpXS50aXRsZSxkYXRhW2ldLmNvbnRlbnQsZGF0YVtpXS5hdXRob3IsZGF0YVtpXS5faWQpO1xyXG4gICAgICAgICAgICAgICAgb2Jqcy5wdXNoKGFydGljbGUpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqcztcclxuICAgICAgICB9KS5jYXRjaChlcnJvcj0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQXJ0aWNsZShhcnRpY2xlOkFydGljbGUpe1xyXG4gICAgICAgIGNvbnN0IGJvZHk9SlNPTi5zdHJpbmdpZnkoYXJ0aWNsZSk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycz1uZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nfSk7XHJcbiAgICAgICAvLyB0aGlzLmFydGljbGVzW3RoaXMuYXJ0aWNsZXMuaW5kZXhPZihtZXNzYWdlKV09bmV3IE1lc3NhZ2UoJ2VkaXRlZCcsbnVsbCwnZHVtbXknKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5wYXRjaCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FydGljbGUvJythcnRpY2xlLmFydGljbGVJZCxib2R5LHtoZWFkZXJzOmhlYWRlcnN9KVxyXG4gICAgICAgICAgICAubWFwKHJlc3BvbnNlPT5yZXNwb25zZS5qc29uKCkpLmNhdGNoKGVycm9yPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBlZGl0QXJ0aWNsZShhcnRpY2xlOkFydGljbGUpe1xyXG4gICAgICAgIHRoaXMuYXJ0aWNsZUlzRWRpdC5lbWl0KGFydGljbGUpO1xyXG4gICAgICAgLy8gdGhpcy5hcnRpY2xlc1t0aGlzLmFydGljbGVzLmluZGV4T2YobWVzc2FnZSldPW5ldyBNZXNzYWdlKCdlZGl0ZWQnLG51bGwsJ2R1bW15Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlQXJ0aWNsZShhcnRpY2xlOkFydGljbGUpe1xyXG4gICAgICAgIHRoaXMuYXJ0aWNsZXMuc3BsaWNlKHRoaXMuYXJ0aWNsZXMuaW5kZXhPZihhcnRpY2xlKSwxKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5kZWxldGUoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcnRpY2xlLycrYXJ0aWNsZS5hcnRpY2xlSWQpXHJcbiAgICAgICAgICAgIC5tYXAocmVzcG9uc2U9PnJlc3BvbnNlLmpzb24oKSkuY2F0Y2goZXJyb3I9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG5pbXBvcnQgeyBBcnRpY2xlfSBmcm9tIFwiLi9hcnRpY2xlXCI7XHJcbmltcG9ydCB7IEFydGljbGVTZXJ2aWNlfSBmcm9tIFwiLi9hcnRpY2xlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtPbkluaXR9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvaW50ZXJmYWNlc1wiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjonbXktYXJ0aWNsZS1pbnB1dCcsXHJcbiAgICB0ZW1wbGF0ZTpgXHJcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJjb2wtbWQtOCBjb2wtbWQtb2Zmc2V0LTJcIj5cclxuICAgICAgICA8Zm9ybSAobmdTdWJtaXQpPVwib25TdWJtaXQoZi52YWx1ZSlcIiAjZj1cIm5nRm9ybVwiID5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRpdGxlXCI+VGl0bGU8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkICBuZ0NvbnRyb2w9XCJ0aXRsZVwiIHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cInRpdGxlXCIgI2lucHV0IFtuZ01vZGVsXT1cImFydGljbGU/LnRpdGxlXCIgLz5cclxuICAgICAgICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNvbnRlbnRcIj5Db250ZW50PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBzdHlsZT1cInJlc2l6ZTp2ZXJ0aWNhbDtcIiByZXF1aXJlZCBuZ0NvbnRyb2w9XCJjb250ZW50XCIgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiY29udGVudFwiICNpbnB1dCBbbmdNb2RlbF09XCJhcnRpY2xlPy5jb250ZW50XCI+PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgIDxicj5cclxuICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiYXV0aG9yXCI+QXV0aG9yIGFuZCBEYXRlPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCByZXF1aXJlZCAgbmdDb250cm9sPVwiYXV0aG9yXCIgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwiYXV0aG9yXCIgI2lucHV0IFtuZ01vZGVsXT1cImFydGljbGU/LmF1dGhvclwiIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPnt7ICFhcnRpY2xlID8gJ1Bvc3QgQXJ0aWNsZSc6J1NhdmUgQXJ0aWNsZSd9fTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiAob25DbGljayk9XCJvbkNhbmNlbCgpXCIgKm5nSWY9XCJhcnRpY2xlXCIgY2xhc3M9XCJidG4gYnRuLWRhbmdlclwiPkNhbmNlbDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgPC9zZWN0aW9uPlxyXG5gXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXJ0aWNsZUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgIE9uSW5pdHtcclxuICAgIG9uQ2FuY2VsKCl7XHJcbiAgICAgICAgdGhpcy5hcnRpY2xlPW51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgYXJ0aWNsZTpBcnRpY2xlPW51bGw7XHJcbiAgICBuZ09uSW5pdCgpOiBhbnkge1xyXG4gICAgICAgIHRoaXMuX2FydGljbGVTZXJ2aWNlLmFydGljbGVJc0VkaXQuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBhcnRpY2xlPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFydGljbGU9YXJ0aWNsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdWJtaXQoZm9ybTphbnkpe1xyXG4gICAgICAgIGlmKHRoaXMuYXJ0aWNsZSl7XHJcbiAgICAgICAgICAgIC8vZWRpdFxyXG4gICAgICAgICAgICB0aGlzLmFydGljbGUudGl0bGU9Zm9ybS50aXRsZTtcclxuICAgICAgICAgICAgdGhpcy5hcnRpY2xlLmNvbnRlbnQ9Zm9ybS5jb250ZW50O1xyXG4gICAgICAgICAgICB0aGlzLmFydGljbGUuYXV0aG9yPWZvcm0uYXV0aG9yO1xyXG4gICAgICAgICAgICB0aGlzLl9hcnRpY2xlU2VydmljZS51cGRhdGVBcnRpY2xlKHRoaXMuYXJ0aWNsZSlcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YT0+Y29uc29sZS5sb2coZGF0YSksXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I9PmNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLmFydGljbGU9bnVsbDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgY29uc3QgYXJ0aWNsZTogQXJ0aWNsZSA9IG5ldyBBcnRpY2xlKGZvcm0udGl0bGUsIGZvcm0uY29udGVudCwgZm9ybS5hdXRob3IsIG51bGwpO1xyXG4gICAgICAgIHRoaXMuX2FydGljbGVTZXJ2aWNlLmFkZEFydGljbGUoYXJ0aWNsZSkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FydGljbGVTZXJ2aWNlLmFydGljbGVzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yPT5jb25zb2xlLmVycm9yKGVycm9yKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfYXJ0aWNsZVNlcnZpY2U6QXJ0aWNsZVNlcnZpY2Upe31cclxuICAgIFxyXG5cclxuXHJcbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbmltcG9ydCB7IEFydGljbGV9IGZyb20gXCIuL2FydGljbGVcIjtcclxuaW1wb3J0IHtJbnB1dCwgT3V0cHV0fSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGFcIjtcclxuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gXCJhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jXCI7XHJcbmltcG9ydCB7IEFydGljbGVTZXJ2aWNlfSBmcm9tIFwiLi9hcnRpY2xlLnNlcnZpY2VcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ215LWFydGljbGUnLFxyXG4gICAgdGVtcGxhdGU6IGAgIFxyXG5cclxuICAgIDx1bCBzdHlsZT1cImxpc3Qtc3R5bGUtdHlwZTogbm9uZVwiPiBcclxuICAgIDxsaSAgaWQ9XCJsaXN0XCI+XHJcbiAgICAgICAgPGFydGljbGUgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCIgID5cclxuICAgICAgIFxyXG4gICAgICAgICAgICA8dGV4dGFyZWEgc3R5bGU9XCJkaXNwbGF5OiBibG9jazt3aWR0aDogMTAwJTtyZXNpemU6dmVydGljYWwgO1wiIGNsYXNzPVwicGFuZWwtYm9keVwiPnt7YXJ0aWNsZS5jb250ZW50fX08L3RleHRhcmVhPlxyXG4gICAgXHJcbiAgICAgICAgICAgIDxmb290ZXIgY2xhc3M9XCJwYW5lbC1mb290ZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhdXRob3JcIj5cclxuICAgICAgICAgICAgICAgICAgIHt7YXJ0aWNsZS50aXRsZX19IC0ge3thcnRpY2xlLmF1dGhvcn19XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb25maWdcIiA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uRWRpdCgpXCI+RWRpdCZuYnNwOyZuYnNwOyZuYnNwOzwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8YSAgKGNsaWNrKT1cIm9uRGVsZXRlKClcIj5EZWxldGU8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9mb290ZXI+XHJcbiAgICAgICA8L2FydGljbGU+XHJcbiAgICAgICA8L2xpPlxyXG4gICAgPC91bD5cclxuXHJcbiAgICBgLHN0eWxlczpbYFxyXG5cclxuXHJcbnVsIHtcclxuICAgLW1vei10cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcclxufVxyXG51bCA+IGxpIHtcclxuIC1tb3otdHJhbnNmb3JtOiByb3RhdGUoLTE4MGRlZyk7XHJcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKC0xODBkZWcpO1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTE4MGRlZyk7XHJcbn1cclxuICAgICAgICAuYXV0aG9ye1xyXG4gICAgICAgICAgICBkaXNwbGF5OmlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgICAgIHdpZHRoOiA4MCU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICNsaXN0e1xyXG4gICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG4gIFxyXG4gICBmbG9hdDpub25lO1xyXG4gICAgfVxyXG4gICAgICAgIC5jb25maWd7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgICAgICAgICAgd2lkdGg6IDE5JTtcclxuICAgICAgICB9YF1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBBcnRpY2xlQ29tcG9uZW50e1xyXG4gICAgICAgQElucHV0KCkgYXJ0aWNsZTpBcnRpY2xlO1xyXG4gICAgQE91dHB1dCgpIGVkaXRDbGlja2VkPW5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2FydGljbGVTZXJ2aWNlOkFydGljbGVTZXJ2aWNlKXtcclxuXHJcbiAgICB9XHJcbiAgICBvbkVkaXQoKXtcclxuICAgICAgICB0aGlzLl9hcnRpY2xlU2VydmljZS5lZGl0QXJ0aWNsZSh0aGlzLmFydGljbGUpO1xyXG4gICAgfVxyXG4gICAgb25DbGljaygpe1xyXG4gICAgICAgdGhpcy5lZGl0Q2xpY2tlZC5lbWl0KCdjaGFuZ2VkJyk7XHJcbiAgICB9XHJcbiAgICBvbkRlbGV0ZSgpe1xyXG4gICAgICAgIHRoaXMuX2FydGljbGVTZXJ2aWNlLmRlbGV0ZUFydGljbGUodGhpcy5hcnRpY2xlKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGE9PmNvbnNvbGUubG9nKGRhdGEpLFxyXG4gICAgICAgICAgICBlcnJvcj0+Y29uc29sZS5lcnJvcihlcnJvcilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG5pbXBvcnQgeyBBcnRpY2xlQ29tcG9uZW50fSBmcm9tIFwiLi9BcnRpY2xlLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgQXJ0aWNsZVNlcnZpY2V9IGZyb20gXCIuL2FydGljbGUuc2VydmljZVwiO1xyXG5pbXBvcnQge09uSW5pdH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9pbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7QXJ0aWNsZX0gZnJvbSBcIi4vYXJ0aWNsZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ215LWFydGljbGUtbGlzdCcsXHJcbiAgICB0ZW1wbGF0ZTpgIDxzZWN0aW9uIGNsYXNzPVwiY29sLW1kLTggY29sLW1kLW9mZnNldC0yXCI+XHJcbiAgICAgICAgICAgIDxteS1hcnRpY2xlICpuZ0Zvcj1cIiNhcnRpY2xlIG9mIGFydGljbGVzXCIgW2FydGljbGVdPVwiYXJ0aWNsZVwiIChlZGl0Q2xpY2tlZCk9XCJhcnRpY2xlLmNvbnRlbnQ9JGV2ZW50XCI+PC9teS1hcnRpY2xlPlxyXG4gICAgICAgIDwvc2VjdGlvbj5gLFxyXG5kaXJlY3RpdmVzOltBcnRpY2xlQ29tcG9uZW50XX0pXHJcblxyXG5leHBvcnQgY2xhc3MgQXJ0aWNsZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyAgT25Jbml0e1xyXG4gICAgbmdPbkluaXQoKTogYW55IHtcclxuICAgICAgICB0aGlzLl9hcnRpY2xlU2VydmljZS5nZXRBcnRpY2xlKCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBhcnRpY2xlcz0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnRpY2xlcz1hcnRpY2xlcztcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FydGljbGVTZXJ2aWNlLmFydGljbGVzPWFydGljbGVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2FydGljbGVTZXJ2aWNlOiBBcnRpY2xlU2VydmljZSl7fVxyXG5cclxuICAgIGFydGljbGVzOkFydGljbGVbXTtcclxufSIsIlxyXG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbmltcG9ydCB7QXJ0aWNsZUlucHV0Q29tcG9uZW50fSBmcm9tIFwiLi9hcnRpY2xlLWlucHV0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQge0FydGljbGVMaXN0Q29tcG9uZW50fSBmcm9tIFwiLi9hcnRpY2xlLWxpc3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhcnRpY2xlcycsXHJcbiAgICB0ZW1wbGF0ZTpgXHJcbjxkaXYgY2xhc3M9XCJibG9nLW1hc3RoZWFkXCIgID5cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxuYXYgY2xhc3M9XCJibG9nLW5hdlwiID5cclxuICAgICAgICAgICAgPGltZyBzcmM9XCJodHRwczovL2Nkbi5hdXRoMC5jb20vYmxvZy9hbmd1bGFyMi1zZXJpZXMvYW5ndWxhcjItbG9nby5wbmdcIiBzdHlsZT1cImxlZnQ6IDQwcHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTtcIi8+XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgIDxhICAgc3R5bGU9XCJyaWdodDogNjNweDsgY29sb3I6d2hpdGU7dGV4dC1kZWNvcmF0aW9uOiBub25lOyBmb250LXNpemU6IDE2cHg7IGZvbnQtZmFtaWx5OkFyaWFsOyBwb3NpdGlvbjogYWJzb2x1dGU7ICB0b3A6IDI4cHg7XCIgW3JvdXRlckxpbmtdPVwiWydCbG9nJ11cIj5cclxuICAgICAgICAgICAgQmFjayB0byBibG9nXHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgPC9uYXY+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG5cclxuPGRpdiBjbGFzcz1cInJvdyBzcGFjaW5nXCIgc3R5bGU9XCJ0b3A6NTVweDsgcG9zaXRpb246IHJlbGF0aXZlO1wiPlxyXG4gICAgICAgICAgICAgIDxteS1hcnRpY2xlLWlucHV0PjwvbXktYXJ0aWNsZS1pbnB1dD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93IHNwYWNpbmdcIiBzdHlsZT1cInRvcDo1NXB4OyBwb3NpdGlvbjogcmVsYXRpdmU7XCI+XHJcbiAgICAgICAgPG15LWFydGljbGUtbGlzdD48L215LWFydGljbGUtbGlzdD5cclxuICAgIDwvZGl2PlxyXG5gLGRpcmVjdGl2ZXM6W0FydGljbGVJbnB1dENvbXBvbmVudCxBcnRpY2xlTGlzdENvbXBvbmVudCxST1VURVJfRElSRUNUSVZFU10sc3R5bGVzOltgXHJcblxyXG5cclxudWwge1xyXG4gICAtbW96LXRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XHJcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xyXG59XHJcbnVsID4gbGkge1xyXG4gLW1vei10cmFuc2Zvcm06IHJvdGF0ZSgtMTgwZGVnKTtcclxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGUoLTE4MGRlZyk7XHJcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMTgwZGVnKTtcclxufVxyXG4gICAgICAgIGBdfSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQXJ0aWNsZXNDb21wb25lbnR7fSIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcclxuaW1wb3J0IHtBcnRpY2xlU2VydmljZX0gZnJvbSBcIi4uL2FydGljbGVzL2FydGljbGUuc2VydmljZVwiO1xyXG5pbXBvcnQge0FydGljbGV9IGZyb20gXCIuLi9hcnRpY2xlcy9hcnRpY2xlXCI7XHJcbmltcG9ydCB7SW5wdXR9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YVwiO1xyXG5pbXBvcnQge09uSW5pdH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9pbnRlcmZhY2VzXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdteS1kaXNwbGF5LWFydGljbGUnLFxyXG4gICAgdGVtcGxhdGU6YFxyXG4gICAgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJsb2ctcG9zdFwiPlxyXG4gICAgICAgICAgICAgPGgyIGNsYXNzPVwiYmxvZy1wb3N0LXRpdGxlXCI+e3thcnRpY2xlLnRpdGxlfX08L2gyPlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cImJsb2ctcG9zdC1tZXRhXCI+ICA8ZW0+Qnkge3thcnRpY2xlLmF1dGhvcn19IDwvZW0+IDwvcD5cclxuICAgICAgICAgICAgPHA+e3thcnRpY2xlLmNvbnRlbnR9fTwvcD5cclxuICAgICAgICBcclxuICAgICAgICA8L2Rpdj5cclxuICAgICBcclxuICAgICAgICBcclxuICAgIFxyXG5cclxuXHJcbmBcclxufSlcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgRGlzcGxheUFydGljbGVDb21wb25lbnQge1xyXG4gICAgQElucHV0KCkgYXJ0aWNsZTpBcnRpY2xlO1xyXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG5pbXBvcnQge0Rpc3BsYXlBcnRpY2xlQ29tcG9uZW50fSBmcm9tIFwiLi9kaXNwbGF5LWFydGljbGUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7T25Jbml0fSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHtBcnRpY2xlU2VydmljZX0gZnJvbSBcIi4uL2FydGljbGVzL2FydGljbGUuc2VydmljZVwiO1xyXG5pbXBvcnQge0FydGljbGV9IGZyb20gXCIuLi9hcnRpY2xlcy9hcnRpY2xlXCI7XHJcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ215LWJsb2cnLFxyXG4gICAgdGVtcGxhdGU6YFxyXG5cclxuPGRpdiBjbGFzcz1cImJsb2ctbWFzdGhlYWRcIiAgPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgPG5hdiBjbGFzcz1cImJsb2ctbmF2XCIgPlxyXG4gICAgICAgICAgICA8aW1nIHNyYz1cImh0dHBzOi8vY2RuLmF1dGgwLmNvbS9ibG9nL2FuZ3VsYXIyLXNlcmllcy9hbmd1bGFyMi1sb2dvLnBuZ1wiIHN0eWxlPVwibGVmdDogNDBweDsgcG9zaXRpb246IGFic29sdXRlO1wiLz5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua109XCJbJ0FydGljbGVzJ11cIiBzdHlsZT1cInJpZ2h0OiA1MHB4OyBjb2xvcjp3aGl0ZTt0ZXh0LWRlY29yYXRpb246IG5vbmU7IGZvbnQtc2l6ZTogMTZweDsgZm9udC1mYW1pbHk6QXJpYWw7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgIHRvcDogMjhweDtcIj5cclxuICAgICAgICAgICAgQWRtaW4gWm9uZVxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICBcclxuICAgICAgICA8L25hdj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcbjxkaXYgY2xhc3M9XCJibG9nLWhlYWRlclwiPlxyXG4gICAgICAgPGgxIGNsYXNzPVwiYmxvZy10aXRsZVwiPkFuZ3VsYXIgMiBCbG9nPC9oMT5cclxuICAgICAgIDxwIGNsYXNzPVwibGVhZCBibG9nLWRlc2NyaXB0aW9uXCI+VGhlIG9mZmljaWFsIEFuZ3VsYXIgMiBCbG9nLiBIZXJlIHlvdSBjYW4gZmluZCBuZXdzIGFuZCBpbmZvIGFib3V0IEFuZ3VsYXIgMjwvcD5cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwiY29sLXNtLTggYmxvZy1tYWluXCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7ICB0b3A6IDI1MHB4OyBsZWZ0OiAzMHB4O1wiPlxyXG48ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XHJcbjxteS1kaXNwbGF5LWFydGljbGUgKm5nRm9yPVwiI2FydGljbGUgb2YgYXJ0aWNsZXNcIiBbYXJ0aWNsZV09XCJhcnRpY2xlXCI+PC9teS1kaXNwbGF5LWFydGljbGU+XHJcbjwvZGl2PlxyXG48L2Rpdj5cclxuXHJcbjxkaXYgY2xhc3M9XCJjb2wtc20tMyBjb2wtc20tb2Zmc2V0LTEgYmxvZy1zaWRlYmFyXCIgc3R5bGU9XCJ0b3A6MjAwcHg7IHBvc2l0aW9uOiByZWxhdGl2ZVwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNpZGViYXItbW9kdWxlIHNpZGViYXItbW9kdWxlLWluc2V0XCI+XHJcbiAgICAgICAgICAgIDxoND5BYm91dDwvaDQ+XHJcbiAgICAgICAgICAgIDxwPkFuZ3VsYXIgMiBCbG9nIGNyZWF0ZWQgYnkgUG9wYSBPY3Rhdmlhbi1NaWhhaTwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gPC9kaXY+XHJcblxyXG5gLGRpcmVjdGl2ZXM6W0Rpc3BsYXlBcnRpY2xlQ29tcG9uZW50LFJPVVRFUl9ESVJFQ1RJVkVTXVxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBCbG9nQ29tcG9uZW50IGltcGxlbWVudHMgIE9uSW5pdHtcclxuICAgIG5nT25Jbml0KCk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5fYXJ0aWNsZVNlcnZpY2UuZ2V0QXJ0aWNsZSgpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgYXJ0aWNsZXM9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJ0aWNsZXM9YXJ0aWNsZXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hcnRpY2xlU2VydmljZS5hcnRpY2xlcz1hcnRpY2xlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hcnRpY2xlU2VydmljZTogQXJ0aWNsZVNlcnZpY2Upe31cclxuXHJcbiAgICBhcnRpY2xlczpBcnRpY2xlW107XHJcbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5cbmltcG9ydCB7Um91dGVDb25maWcsIFJPVVRFUl9ESVJFQ1RJVkVTfSBmcm9tIFwiYW5ndWxhcjIvcm91dGVyXCI7XG5cbmltcG9ydCB7QXJ0aWNsZXNDb21wb25lbnR9IGZyb20gXCIuL2FydGljbGVzL2FydGljbGVzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtCbG9nQ29tcG9uZW50fSBmcm9tIFwiLi9ibG9nL2Jsb2cuY29tcG9uZW50XCI7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ215LWFwcCcsXG4gICAgdGVtcGxhdGU6XG4gICAgICAgIGBcbiAgICAgICAgICAgICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbiAgICAgICAgICAgIFxuYFxuICAgICxkaXJlY3RpdmVzOltST1VURVJfRElSRUNUSVZFUyxCbG9nQ29tcG9uZW50XVxufSlcblxuQFJvdXRlQ29uZmlnKFtcbiAgICB7cGF0aDonL2Jsb2cnLCBuYW1lOidCbG9nJyxjb21wb25lbnQ6QmxvZ0NvbXBvbmVudCx1c2VBc0RlZmF1bHQ6dHJ1ZX0sXG4gICAge3BhdGg6ICcvYXJ0aWNsZScsIG5hbWU6ICdBcnRpY2xlcycsIGNvbXBvbmVudDogQXJ0aWNsZXNDb21wb25lbnR9XG4gIF0pXG5cbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuXG59IiwiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIyL3R5cGluZ3MvYnJvd3Nlci5kLnRzXCIvPlxuaW1wb3J0IHtib290c3RyYXB9IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2Jyb3dzZXInO1xuaW1wb3J0IHtBcHBDb21wb25lbnR9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEFydGljbGVTZXJ2aWNlfSBmcm9tIFwiLi9hcnRpY2xlcy9hcnRpY2xlLnNlcnZpY2VcIjtcbmltcG9ydCB7Uk9VVEVSX1BST1ZJREVSU30gZnJvbSBcImFuZ3VsYXIyL3NyYy9yb3V0ZXIvcm91dGVyX3Byb3ZpZGVyc1wiO1xuaW1wb3J0IHtwcm92aWRlfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvcmUvZGkvcHJvdmlkZXJcIjtcbmltcG9ydCB7TG9jYXRpb25TdHJhdGVneX0gZnJvbSBcImFuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb24vbG9jYXRpb25fc3RyYXRlZ3lcIjtcbmltcG9ydCB7SGFzaExvY2F0aW9uU3RyYXRlZ3l9IGZyb20gXCJhbmd1bGFyMi9zcmMvcm91dGVyL2xvY2F0aW9uL2hhc2hfbG9jYXRpb25fc3RyYXRlZ3lcIjtcbmltcG9ydCB7SFRUUF9QUk9WSURFUlN9IGZyb20gXCJhbmd1bGFyMi9odHRwXCI7XG5cblxuYm9vdHN0cmFwKEFwcENvbXBvbmVudCxbQXJ0aWNsZVNlcnZpY2UsUk9VVEVSX1BST1ZJREVSUyxwcm92aWRlKExvY2F0aW9uU3RyYXRlZ3ksIHt1c2VDbGFzczpIYXNoTG9jYXRpb25TdHJhdGVneX0pLEhUVFBfUFJPVklERVJTXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
