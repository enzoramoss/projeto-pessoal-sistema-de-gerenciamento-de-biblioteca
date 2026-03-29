const db = require('../database/livroDatabase');

const cadastrarLivro = (isbn, titulo, autor, ano) => {
  if (!isbn || !titulo || !autor || !ano) {
    throw new Error("Todos os campos são obrigatórios");
  }
  if (typeof ano !== 'number' || ano < 1000 || ano > new Date().getFullYear() + 1) {
    throw new Error("Ano inválido");
  }

  const livros = db.getLivros();
  if (livros.some(l => l.isbn === isbn)) {
    return false;
  }

  db.adicionarLivro({
    isbn,
    titulo,
    autor,
    ano,
    disponivel: true,
    dataEmprestimo: null
  });
  return true;
};

const emprestarLivro = (isbn) => {
  const livros = db.getLivros();
  const livro = livros.find(l => l.isbn === isbn);

  if (!livro) return false;
  if (!livro.disponivel) return false;

  livro.disponivel = false;
  livro.dataEmprestimo = new Date();
  return true;
};

const devolverLivro = (isbn) => {
  const livros = db.getLivros();
  const livro = livros.find(l => l.isbn === isbn);

  if (!livro) return false;
  if (livro.disponivel) return false;

  livro.disponivel = true;
  livro.dataEmprestimo = null;
  return true;
};

const buscarLivroPorIsbn = (isbn) => {
  const livros = db.getLivros();
  return livros.find(l => l.isbn === isbn) || null;
};

const listarLivrosDisponiveis = () => {
  const livros = db.getLivros();
  return livros.filter(l => l.disponivel);
};

const calcularMulta = (diasAtraso) => {
  if (diasAtraso < 0) return 0;
  return Number((diasAtraso * 2.00).toFixed(2)); // R$ 2,00 por dia
};

module.exports = {
  cadastrarLivro,
  emprestarLivro,
  devolverLivro,
  buscarLivroPorIsbn,
  listarLivrosDisponiveis,
  calcularMulta
};