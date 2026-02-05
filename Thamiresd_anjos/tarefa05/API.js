const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(express.json());

app.use(session({
    secret: 'segredo',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000}
}));

const livros = ['Jogos Vorazes', 'O Hobbit', 'Dom Casmurro'];

function autenticar(req, res, next) {
    if (!req.session.usuario){
        return res.status(401).json({ error: 'Usuário não estar logado' });
    }
    next();
}

app.post('/login',(req, res) => {
    const { usuario } = req.body;

    if(!usuario){
        return res.status(400).json({ error: 'Usuário é obrigatório o uso do nome' });
    }
    req.session.usuario = usuario;
    return res.json({mensagem:'Login realizado'});
});
app.post('/logout', autenticar, (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ error: "Erro ao deslogar" });
        res.json({ message: "Logout feito com sucesso!" });
    });
});
  

app.get('/livros', autenticar, (req, res) => {
    return res.json(livros);
});

app.get('/livros/:index', autenticar, (req, res) => {
    const index = Number(req.params.index);
    if(!livros[index]){
        return res.status(404).json({ error: 'Livro não encontrado' });
    }
    return res.json(livros[index]);
});

app.post('/livros', autenticar, (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const { titulo } = req.body;
    livros.push(titulo);
    return res.json(livros);
});


app.put('/livros/:index', autenticar, (req, res) => {
    const index = Number(req.params.index);
    const { titulo } = req.body;

    if(!livros[index]){
        return res.status(404).json({ error: 'Livro não encontrado' });
    }

    livros[index] = titulo;
    return res.json(livros);
});


app.delete('/livros/:index', autenticar, (req, res) => {
    const index = Number(req.params.index);

    if(!livros[index]){
        return res.status(404).json({ error: 'Livro não encontrado' });
    }   
    livros.splice(index, 1);
    return res.json({ message: 'Livro deletado com sucesso' });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
