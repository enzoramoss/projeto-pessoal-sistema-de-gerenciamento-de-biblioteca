const livroService = require('../../services/livroService');
const db = require('../../database/livroDatabase');

describe('LivroService', () => {
  beforeEach(() => {
    db.reset();
  });

  test('deve cadastrar livro com dados válidos', () => {
    const resultado = livroService.cadastrarLivro('978-3-16-148410-0', 'O Senhor dos Anéis', 'J.R.R. Tolkien', 1954);
    expect(resultado).toBe(true);
    expect(livroService.buscarLivroPorIsbn('978-3-16-148410-0')).not.toBeNull();
  });

  test('não deve cadastrar livro com ISBN duplicado', () => {
    livroService.cadastrarLivro('123456', 'Livro 1', 'Autor', 2020);
    const resultado = livroService.cadastrarLivro('123456', 'Livro 2', 'Autor', 2021);
    expect(resultado).toBe(false);
  });

  test('deve lançar erro ao cadastrar com campos obrigatórios faltando', () => {
    expect(() => livroService.cadastrarLivro('', 'Título', 'Autor', 2020))
      .toThrow('Todos os campos são obrigatórios');
  });

  test('deve emprestar livro disponível', () => {
    livroService.cadastrarLivro('111', 'Livro A', 'Autor', 2020);
    const resultado = livroService.emprestarLivro('111');
    expect(resultado).toBe(true);
    const livro = livroService.buscarLivroPorIsbn('111');
    expect(livro.disponivel).toBe(false);
  });

  test('não deve emprestar livro já emprestado', () => {
    livroService.cadastrarLivro('222', 'Livro B', 'Autor', 2020);
    livroService.emprestarLivro('222');
    const resultado = livroService.emprestarLivro('222');
    expect(resultado).toBe(false);
  });

  test('deve devolver livro emprestado', () => {
    livroService.cadastrarLivro('333', 'Livro C', 'Autor', 2020);
    livroService.emprestarLivro('333');
    const resultado = livroService.devolverLivro('333');
    expect(resultado).toBe(true);
    const livro = livroService.buscarLivroPorIsbn('333');
    expect(livro.disponivel).toBe(true);
  });

  test('deve buscar livro por ISBN existente', () => {
    livroService.cadastrarLivro('444', 'Livro D', 'Autor', 2020);
    const livro = livroService.buscarLivroPorIsbn('444');
    expect(livro).not.toBeNull();
    expect(livro.titulo).toBe('Livro D');
  });

  test('deve retornar null ao buscar ISBN inexistente', () => {
    const livro = livroService.buscarLivroPorIsbn('999999');
    expect(livro).toBeNull();
  });

  test('deve listar apenas livros disponíveis', () => {
    livroService.cadastrarLivro('555', 'Livro E', 'Autor', 2020);
    livroService.cadastrarLivro('666', 'Livro F', 'Autor', 2021);
    livroService.emprestarLivro('666');

    const disponiveis = livroService.listarLivrosDisponiveis();
    expect(disponiveis.length).toBe(1);
    expect(disponiveis[0].isbn).toBe('555');
  });

  test('deve calcular multa de R$ 0,00 para 0 dias de atraso', () => {
    expect(livroService.calcularMulta(0)).toBe(0);
  });

  test('deve calcular multa de R$ 10,00 para 5 dias de atraso', () => {
    expect(livroService.calcularMulta(5)).toBe(10);
  });

  test('deve calcular multa corretamente para 3 dias', () => {
    expect(livroService.calcularMulta(3)).toBe(6);
  });
});

