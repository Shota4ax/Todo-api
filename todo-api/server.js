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
    var queryParams = req.query;
    var filterTodos = todos;
    if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
        filterTodos = _.where(filterTodos,{completed : true});
    }else if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'false'){
        filterTodos = _.where(filterTodos,{completed : false});
    }
    
    if(queryParams.hasOwnProperty('q') && queryParams.q.length > 0){
        filterTodos = _.filter(filterTodos,function(todo){
           return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1; 
        });
    }

    res.json(filterTodos);
});
//: after params of request
app.get('/todos/:id',function(req,res){
   var todoId =parseInt(req.params.id, 10);
    var matchTodo = _.findWhere(todos,{id:todoId});

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

app.put('/todos/:id',function(req,res){
   var body = _.pick(req.body,'description','completed');
    var todoId = parseInt(req.params.id);
    var updateTodo = _.findWhere(todos,{id:todoId});
    var validAttributes = {};
    if(!updateTodo){
        return res.status(404).send();
    }
    
    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
        validAttributes.completed = body.completed;
    }else if(body.hasOwnProperty('completed')){
        return res.status(400).send();
    }
    
    if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length !==0){
        validAttributes.description = body.description;
    }else if(body.hasOwnProperty('description')){
        return res.status(400).send();
    }
        
    _.extend(updateTodo, validAttributes);
    res.json(updateTodo);
    
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