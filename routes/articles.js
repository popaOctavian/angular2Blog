var express= require('express');
var router=express.Router();
var Article=require('../models/article');
router.post('/',function(req,res,next){
    var article=new Article({
        title:req.body.title,
        content:req.body.content,
        author:req.body.author
    });
    article.save(function(err,result){
        if(err){
            return res.status(404).json({
                title:'eroare',
                error:err
            });
        }
        res.status(201).json({
            message:'saved message',
            obj:result
        });
    });
});

router.get('/',function (req,res,next) {
    Article.find().exec(function (err,docs) {
        if(err){
            return res.status(404).json({
                title:'eroare',
                error:err
            });
        }
        res.status(200).json({
            message:'Success',
            obj:docs
        });
    });
});

router.patch('/:id',function (req,res,next) {
    Article.findById(req.params.id,function (err,doc) {
        if(err){
            return res.status(404).json({
                title:'eroare',
                error:err
            });
        }
        if(!doc){
            return res.status(404).json({
                title:'no message found',
                error:{message:'message could not be found'}
            });
        }
        doc.title=req.body.title;
        doc.content=req.body.content;
        doc.author=req.body.author;
        doc.save(function (err,result) {
            if(err){
                return res.status(404).json({
                    title:'eroare',
                    error:err
                });
            }
            res.status(200).json({
                message:'success',
                obj:result
            });
        });

    });
});

router.delete('/:id',function (req,res,next) {
    Article.findById(req.params.id,function (err,doc) {
        if(err){
            return res.status(404).json({
                title:'eroare',
                error:err
            });
        }
        if(!doc){
            return res.status(404).json({
                title:'no message found',
                error:{message:'message could not be found'}
            });
        }

        doc.remove(function (err,result) {
            if(err){
                return res.status(404).json({
                    title:'eroare',
                    error:err
                });
            }
            res.status(200).json({
                message:'success',
                obj:result
            });
        });

    });
});

module.exports=router;