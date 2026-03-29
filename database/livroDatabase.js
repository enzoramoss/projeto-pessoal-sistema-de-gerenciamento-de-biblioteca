let livros = [];

const reset = () => {
  livros = [];
};

const getLivros = () => livros;

const adicionarLivro = (livro) => {
  livros.push(livro);
};

const atualizarLivro = (isbn, livroAtualizado) => {
  const index = livros.findIndex(l => l.isbn === isbn);
  if (index !== -1) {
    livros[index] = { ...livros[index], ...livroAtualizado };
    return true;
  }
  return false;
};

module.exports = {
  getLivros,
  adicionarLivro,
  atualizarLivro,
  reset
};