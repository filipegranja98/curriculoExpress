// index.js
const express = require('express');
const bodyParser = require('body-parser');
const Curriculo = require('./config/sequelize'); // Importar o modelo de currículo

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rota para criar um novo currículo
app.post('/curriculos', async (req, res) => {
  try {
    const { nome, email,telefone ,endereco ,experiencia ,formacao } = req.body;
    // Inserir um novo currículo no banco de dados
    const novoCurriculo = await Curriculo.create({
      nome,
      email,
      telefone,
      endereco,
      experiencia,
      formacao
    });
    res.json(novoCurriculo);
  } catch (error) {
    console.error('Erro ao criar currículo:', error);
    res.status(500).json({ error: 'Erro ao criar currículo' });
  }
});
app.get('/curriculos', async (req, res) => {
    try {
      // Consultar todos os currículos no banco de dados
      const curriculos = await Curriculo.findAll();
      res.json(curriculos);
    } catch (error) {
      console.error('Erro ao buscar currículos:', error);
      res.status(500).json({ error: 'Erro ao buscar currículos' });
    }
  });
  app.get('/curriculos/:nome', async (req, res) => {
    try {
      const { nome } = req.params;
      // Consultar currículos no banco de dados com base no nome
      const curriculos = await Curriculo.findOne({
        where: {
          nome: nome
        }
        
      });
      res.json(curriculos);
    } catch (error) {
      console.error('Erro ao buscar currículos por nome:', error);
      res.status(500).json({ error: 'Erro ao buscar currículos por nome' });
    }
  });
  
  app.get('/curriculos/:id',async(req,res)=>{
    try{
      const {id} = req.params;
      const curriculos = await Curriculo.findOne({
        where:{
          id : id
        }
      });
      res.json(curriculos);
    }catch(error){
      console.error('Erro ao buscar currículos por nome:', error);
      res.status(500).json({ error: 'Erro ao buscar currículos por nome' });
    }
  })
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
