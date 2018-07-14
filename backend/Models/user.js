var Sequelize = require('sequelize');

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize("hack",process.env.RDS_USERNAME,process.env.RDS_PASSWORD,{
    host:"localhost",
    dialect: 'mysql',
    pool: {
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});

// setup User model and its fields.
var User = sequelize.define('User', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    secret: {
        type: Sequelize.STRING,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING,        
        allowNull: true
    }
}, {
    hooks: {
    },
    instanceMethods: {
    }    
});


// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('User table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = User;