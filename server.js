const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve arquivos estáticos do diretório atual
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());

// Endpoint para salvar os dados
app.post('/save', (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, 'unidades.json');

  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Erro ao salvar o arquivo:', err);
      return res.status(500).send({ success: false, message: 'Erro ao salvar o arquivo no servidor.' });
    }
    console.log('Arquivo unidades.json salvo com sucesso!');
    res.send({ success: true, message: 'Dados salvos com sucesso!' });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log('Acesse este endereço no seu navegador para usar a aplicação.');
});
