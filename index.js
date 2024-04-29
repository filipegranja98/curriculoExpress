// index.js
const express = require('express');
const bodyParser = require('body-parser');
const Curriculo = require('./sequelize'); // Importar o modelo de currículo

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rota para criar um novo currículo!
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
      const curriculos = await Curriculo.findAll({
        where: {
          nome: nome,
        },
        attributes: ['nome', 'email', 'telefone', 'endereco','experiencia','formacao'],
        
      });
      res.json(curriculos);
    } catch (error) {
      console.error('Erro ao buscar currículos por nome:', error);
      res.status(500).json({ error: 'Erro ao buscar currículos por nome' });
    }
  });
  


  app.put('/curriculos/:nome', async (req, res) => {
    try {
      const { nome } = req.params;
      const { email, telefone, endereco, experiencia, formacao } = req.body;
      // Atualizar o currículo no banco de dados
      const curriculoAtualizado = await Curriculo.update({
        email: email,
        telefone:telefone,
        endereco:endereco,
        experiencia:experiencia,
        formacao:formacao
      }, {
        where: { nome }
      });
      res.status(200).json({ message: 'Currículo atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar currículo:', error);
      res.status(500).json({ error: 'Erro ao atualizar currículo' });
    }
  });
  
  // Rota para excluir um currículo existente pelo nome
  app.delete('/curriculos/:nome', async (req, res) => {
    try {
      const { nome } = req.params;
      // Excluir o currículo do banco de dados
      await Curriculo.destroy({
        where: { nome }
      });
      res.status(200).json({ message: 'Currículo excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir currículo:', error);
      res.status(500).json({ error: 'Erro ao excluir currículo' });
    }
  });
    
  




app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
