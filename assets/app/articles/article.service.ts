import { Article} from "./article";
import {Http} from "angular2/http";
import {Headers} from "angular2/src/http/headers";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {Injectable} from "angular2/src/core/di/decorators";
import {EventEmitter} from "angular2/src/facade/async";

@Injectable()
export class ArticleService{
    articles:Article[]=[];
    constructor(private _http:Http){}
articleIsEdit=new EventEmitter<Article>();

    addArticle(article:Article){
        const body=JSON.stringify(article);
        const headers=new Headers({'Content-Type':'application/json'});
        return this._http.post('http://localhost:3000/article',body,{headers:headers})
            .map(response=>{
                const data=response.json().obj;
                let article=new Article(data.title,data.content,data.author,data._id);
                return article;
            })
            .catch(error=> Observable.throw(error.json()));
    }
    getArticle(){
        return this._http.get('http://localhost:3000/article').map(response=> {
            const data = response.json().obj;
            let objs:any[]=[];
            for(let i=0;i<data.length;i++){
                let article=new Article(data[i].title,data[i].content,data[i].author,data[i]._id);
                objs.push(article);
            };
            return objs;
        }).catch(error=> Observable.throw(error.json()));
    }

    updateArticle(article:Article){
        const body=JSON.stringify(article);
        const headers=new Headers({'Content-Type':'application/json'});
       // this.articles[this.articles.indexOf(message)]=new Message('edited',null,'dummy');
        return this._http.patch('http://localhost:3000/article/'+article.articleId,body,{headers:headers})
            .map(response=>response.json()).catch(error=> Observable.throw(error.json()));
    }

    editArticle(article:Article){
        this.articleIsEdit.emit(article);
       // this.articles[this.articles.indexOf(message)]=new Message('edited',null,'dummy');
    }

    deleteArticle(article:Article){
        this.articles.splice(this.articles.indexOf(article),1);
        return this._http.delete('http://localhost:3000/article/'+article.articleId)
            .map(response=>response.json()).catch(error=> Observable.throw(error.json()));
    }
}