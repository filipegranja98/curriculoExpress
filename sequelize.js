require('dotenv').config(); 
const { Sequelize, DataTypes } = require('sequelize');

// Conectar ao banco de dados
const sequelize = new Sequelize(process.env.POSTGRES_URL);

sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Definir modelo de currículo
const Curriculo = sequelize.define('Curriculos', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefone:{
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco:{
    type: DataTypes.CHAR(50),
    allowNull: false
  },
  experiencia: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  formacao:{
    type: DataTypes.CHAR(50),
    allowNull: false
  }
  

});

// Sincronizar o modelo com o banco de dados
Curriculo.sync();

module.exports = Curriculo;