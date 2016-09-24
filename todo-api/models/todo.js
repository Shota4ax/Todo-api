module.exports = function(sequelize,DataTypes){
   return sequelize.define('todo',{
    description:{
        type: DataTypes.STRING,
        allowNull : false,//обязательно заполнить поле description
        validate:{
            notEmpty: true, // не может быть пусто 
            len: [1,250]// values between 1:250
        }
    },
    completed:{
        type: DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue: false//defaultное значение
    }
});
};