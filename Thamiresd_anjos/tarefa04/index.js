const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const livros = ['Jogos Vorazes', 'O Hobbit', 'Dom Casmurro'];

// LISTAR TODOS
app.get('/livros', (req, res) => {
    return res.json(livros);
});

// BUSCAR POR INDEX
app.get('/livros/:index', (req, res) => {
    const index = Number(req.params.index);
    return res.json(livros[index]);
});

// CRIAR
app.post('/livros', (req, res) => {
    const { titulo } = req.body;
    livros.push(titulo);
    return res.json(livros);
});

// ATUALIZAR
app.put('/livros/:index', (req, res) => {
    const index = Number(req.params.index);
    const { titulo } = req.body;

    livros[index] = titulo;
    return res.json(livros);
});

// DELETAR
app.delete('/livros/:index', (req, res) => {
    const index = Number(req.params.index);
    livros.splice(index, 1);
    return res.json({ message: 'Livro deletado com sucesso' });
});

// INICIAR SERVIDOR
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
