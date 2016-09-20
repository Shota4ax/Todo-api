var express = require('express');

var app = express();

var todos=[{
    id:1,
    description: 'Work hard!',
    completed: false
},{
    id:2,
    description: 'Go to market',
    completed: false
},{
    id:3,
    description: 'Go for a walk',
    completed: true
}];
var PORT = process.env.PORT || 3000;
app.get('/',function(req,res){
   res.send("Todo-api initialize"); 
});

//GET request /todos
app.get('/todos',function(req,res){
    res.json(todos);
});
//: after params of request
app.get('/todos/:id',function(req,res){
   var todoId =parseInt(req.params.id);
    var matchTodo;
    todos.forEach(function(todo){
       if(todo.id === todoId){
           matchTodo = todo;
       }
    });
    if(matchTodo){
        res.json(matchTodo.description);
    }else{
           res.status(404).send();
       }
});



app.listen(PORT,function(){
   console.log("Express on port:"+PORT); 
});