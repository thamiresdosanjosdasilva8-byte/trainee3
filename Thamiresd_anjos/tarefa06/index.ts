import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

const livros = ['Jogos Vorazes', 'O Hobbit', 'Dom Casmurro'];

app.get('/livros', (req: Request, res: Response) => {
    return res.json(livros);
});

app.get('/livros/:index', (req: Request, res: Response) => {
    const index = Number(req.params.index);
    return res.json(livros[index]);
});

app.post('/livros', (req: Request, res: Response) => {
    const { titulo } = req.body;
    livros.push(titulo);
    return res.json(livros);
});

app.put('/livros/:index', (req: Request, res: Response) => {
    const index = Number(req.params.index);
    const { titulo } = req.body;

    livros[index] = titulo;
    return res.json(livros);
});

app.delete('/livros/:index', (req: Request, res: Response) => {
    const index = Number(req.params.index);
    livros.splice(index, 1);
    return res.json({ message: 'Livro deletado com sucesso' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
