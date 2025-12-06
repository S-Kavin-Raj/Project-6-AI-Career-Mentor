const express=require(`express`);
const path=require('path')
const bodyparser=require(`body-parser`);
const app=express();
const routes=require(`./routes/routes.js`);
//const wroutes=require(`./routes/welcome.js`);
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','pug')
app.use(routes);
//app.use(wroutes);
app.use(express.static(path.join(__dirname,'public')))

app.listen(2000);
app.use((rqst,rsp,next)=>{
    rsp.send("<h1>404 CHECK THE URL</h1")
})