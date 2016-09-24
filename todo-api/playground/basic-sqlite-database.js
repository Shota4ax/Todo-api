var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined,undefined,{
   'dialect' : 'sqlite',
   'storage' : __dirname+'/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo',{
    description:{
        type: Sequelize.STRING,
        allowNull : false,//обязательно заполнить поле description
        validate:{
            notEmpty: true, // не может быть пусто 
            len: [1,250]// values between 1:250
        }
    },
    completed:{
        type: Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue: false//defaultное значение
    }
});


sequelize.sync({force:true}).then(function(){
    console.log('Everything is synced');
    Todo.create({
        description: "Walk with dog",
    }).then(function(){
        return Todo.create({
            description: 'Play football'
        });
    }).then(function(){
        return Todo.create({
            description: 'Sleep'
        });
    }).then(function(){
       return Todo.create({
         description:'Feed dog'  
       });
    }).then(function(){
        return Todo.findAll({
            where:{
                description:{
                    $like:'%dog%'
                }
            }
        })
    }).then(function(todos){
        if(todos){
            todos.forEach(function(todo){
               console.log(todo.toJSON()); 
            });
        }else{
            console.log('No todo items found')
        }
    }).catch(function(e){
       console.log(e); 
    });
});