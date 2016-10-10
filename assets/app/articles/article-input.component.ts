import {Component} from 'angular2/core';
import { Article} from "./article";
import { ArticleService} from "./article.service";
import {OnInit} from "angular2/src/core/linker/interfaces";

@Component({
    selector:'my-article-input',
    template:`
        <section class="col-md-8 col-md-offset-2">
        <form (ngSubmit)="onSubmit(f.value)" #f="ngForm" >
            <div class="form-group">
            <label for="title">Title</label>
                   <input required  ngControl="title" type="text" class="form-control" id="title" #input [ngModel]="article?.title" />
                  <br>
                <label for="content">Content</label>
                <textarea style="resize:vertical;" required ngControl="content" type="text" class="form-control" id="content" #input [ngModel]="article?.content"></textarea>
                <br>
                 <label for="author">Author and Date</label>
                <input required  ngControl="author" type="text" class="form-control" id="author" #input [ngModel]="article?.author" />
            </div>
            <button type="submit" class="btn btn-primary">{{ !article ? 'Post Article':'Save Article'}}</button>
            <button type="submit" (onClick)="onCancel()" *ngIf="article" class="btn btn-danger">Cancel</button>
        </form>
               
        </section>
`
})

export class ArticleInputComponent implements  OnInit{
    onCancel(){
        this.article=null;
    }

    article:Article=null;
    ngOnInit(): any {
        this._articleService.articleIsEdit.subscribe(
            article=>{
                this.article=article;
            }
        );
    }

    onSubmit(form:any){
        if(this.article){
            //edit
            this.article.title=form.title;
            this.article.content=form.content;
            this.article.author=form.author;
            this._articleService.updateArticle(this.article)
                .subscribe(
                    data=>console.log(data),
                    error=>console.error(error)
                );
            this.article=null;
        }else{
            const article: Article = new Article(form.title, form.content, form.author, null);
        this._articleService.addArticle(article).subscribe(
            data=>{
                console.log(data);
                this._articleService.articles.push(data);
            },
            error=>console.error(error)
        );

        }
    }

        constructor(private _articleService:ArticleService){}
    


}