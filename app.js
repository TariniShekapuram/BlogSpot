const express=require('express')
const app=express()
//connect to mongodb
const dbURI='mongodb+srv://tarini:tarini@0209@nodecluster.pnggt.mongodb.net/node-database?retryWrites=true&w=majority'
const morgan=require('morgan')
const Blog=require('./models/blog')
const mongoose=require('mongoose')
const { render } = require('ejs')
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>{app.listen(3000)})
.catch((err)=>{console.log("error")})
//register view engine
app.set('view engine','ejs')

//logger middleware
app.use(morgan('dev'));

//static files
app.use(express.static('public'));

//middleware to access form data 
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>
{
   res.redirect('/blogs')
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About'})
})

app.delete('/blogs/:id',(req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/blogs'})
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'Create Blog'})
})

app.get('/blogs/:id',(req,res)=>{
    const id=req.params.id
    console.log(id)
    Blog.findById(id)
    .then((result)=>{
        res.render('details',{title:"Blog Details",blog:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
//blog routes
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'All Blogs',blogs:result})
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.post('/blogs',(req,res)=>{
    const blog=new Blog(req.body)
    blog.save().then((result)=>{
        res.redirect('/blogs')
    })
    .catch((err)=>{
        console.log(err)
    })
})

