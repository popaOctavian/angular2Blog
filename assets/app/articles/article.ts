export class Article{


    title:string
    content:string;
    author:string;
    public articleId:string;

    constructor(title:string, content:string,author:string,articleId?:string){
        this.content=content;
        this.author=author;
        this.title=title;
        this.articleId=articleId;


    }
}