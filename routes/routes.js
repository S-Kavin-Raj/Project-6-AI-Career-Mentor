const express=require(`express`);
const routes=express.Router();
const path=require('path')


routes.get('/notes',(rqst,rspn,next)=>{
    rspn.render('notes',{
       
    })
})

routes.get('/studytime',(rqst,rsp,next)=>{
            rsp.render('studytime') 
})
routes.get('/todolist',(rqst,rsp,next)=>{
  
   rsp.render('todolist')
})

routes.get('/homepage',(rqst,rsp,next)=>{
  
   rsp.render('homepage')
})
routes.get('/voiceassistant', (req, res) => {
  res.render('voiceassistant');
});
routes.get('/chatbot' , (req, res) => {
  res.render('chatbot');
});

module.exports=routes;
