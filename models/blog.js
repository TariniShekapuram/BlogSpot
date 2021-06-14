const mongoose=require('mongoose')
//structure of document
const Schema=mongoose.Schema;

const blogschema=new Schema({
    title:{type:String,required:true},
    snippet:{type:String,required:true},
    body:{type:String,required:true}
},{timestamps:true});

//model surrounds structure

const Blog=mongoose.model('Blog',blogschema)
module.exports=Blog;