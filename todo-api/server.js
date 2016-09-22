var express = require('express');

var app = express();
var _ = require('underscore');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//var todos=[{
//    id:1,
//    description: 'Work hard!',
//    completed: false
//},{
//    id:2,
//    description: 'Go to market',
//    completed: false
//},{
//    id:3,
//    description: 'Go for a walk with dog',
//    completed: true
//}];

var todos = [];//array of todo items
var todoId = 1;//id of every todo item



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
   var todoId =parseInt(req.params.id, 10);
    var matchTodo = _.findWhere(todos,{id:todoId});
//    todos.forEach(function(todo){
//       if(todo.id === todoId){
//           matchTodo = todo;
//       }
//    });
    if(matchTodo){
        res.json(matchTodo.description);
    }else{
           res.status(404).send();
       }
});
app.post('/todos',function(req,res){
   var body=_.pick(req.body, 'description','completed');
   if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
        return res.status(400).send(); //uncompleted code
    }
    body.id = todoId++;
    body.description = body.description.trim();
    todos.push(body);
    
    res.json(body);    
});
app.delete('/todos/:id',function(req,res){
   var deleteId = parseInt(req.params.id, 10);
    var deleteTodo = _.findWhere(todos,{id:deleteId});
    if(deleteTodo){
        todos=_.without(todos,deleteTodo);
        res.json(deleteTodo);
    }else{
        res.status(404).json({"error":"No todo found with that id"});
    }
    
});

app.listen(PORT,function(){
   console.log("Express on port:"+PORT); 
});