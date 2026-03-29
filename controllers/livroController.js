const livroService = require('../services/livroService');

const cadastrarLivro = (req, res) => {
  try {
    const { isbn, titulo, autor, ano } = req.body;

    if (!isbn || !titulo || !autor || !ano) {
      return res.status(400).json({
        sucesso: false,
        erro: "Todos os campos (isbn, titulo, autor, ano) são obrigatórios"
      });
    }

    const sucesso = livroService.cadastrarLivro(isbn, titulo, autor, Number(ano));

    if (sucesso) {
      return res.status(201).json({
        sucesso: true,
        mensagem: "Livro cadastrado com sucesso!"
      });
    } else {
      return res.status(409).json({
        sucesso: false,
        erro: "Já existe um livro cadastrado com este ISBN."
      });
    }
  } catch (error) {
    return res.status(400).json({
      sucesso: false,
      erro: error.message
    });
  }
};

const emprestarLivro = (req, res) => {
  try {
    const { isbn } = req.body;

    if (!isbn) {
      return res.status(400).json({
        sucesso: false,
        erro: "ISBN é obrigatório"
      });
    }

    const sucesso = livroService.emprestarLivro(isbn);

    if (sucesso) {
      return res.status(200).json({
        sucesso: true,
        mensagem: "Livro emprestado com sucesso!"
      });
    } else {
      return res.status(400).json({
        sucesso: false,
        erro: "Não foi possível emprestar o livro. Verifique se ele existe e está disponível."
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
};

const devolverLivro = (req, res) => {
  try {
    const { isbn } = req.body;

    if (!isbn) {
      return res.status(400).json({
        sucesso: false,
        erro: "ISBN é obrigatório"
      });
    }

    const sucesso = livroService.devolverLivro(isbn);

    if (sucesso) {
      return res.status(200).json({
        sucesso: true,
        mensagem: "Livro devolvido com sucesso!"
      });
    } else {
      return res.status(400).json({
        sucesso: false,
        erro: "Não foi possível devolver o livro. Verifique se ele existe e está emprestado."
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
};

const buscarLivroPorIsbn = (req, res) => {
  try {
    const { isbn } = req.params;

    if (!isbn) {
      return res.status(400).json({
        sucesso: false,
        erro: "ISBN é obrigatório"
      });
    }

    const livro = livroService.buscarLivroPorIsbn(isbn);

    if (livro) {
      return res.status(200).json({
        sucesso: true,
        livro
      });
    } else {
      return res.status(404).json({
        sucesso: false,
        erro: "Livro não encontrado."
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
};

const listarLivrosDisponiveis = (req, res) => {
  try {
    const livros = livroService.listarLivrosDisponiveis();
    return res.status(200).json({
      sucesso: true,
      quantidade: livros.length,
      livros
    });
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
};

const calcularMulta = (req, res) => {
  try {
    const { diasAtraso } = req.body;

    if (diasAtraso === undefined || typeof diasAtraso !== 'number') {
      return res.status(400).json({
        sucesso: false,
        erro: "diasAtraso deve ser um número válido"
      });
    }

    const multa = livroService.calcularMulta(diasAtraso);

    return res.status(200).json({
      sucesso: true,
      multa: multa,
      mensagem: `Multa calculada: R$ ${multa.toFixed(2)}`
    });
  } catch (error) {
    return res.status(500).json({
      sucesso: false,
      erro: error.message
    });
  }
};

module.exports = {
  cadastrarLivro,
  emprestarLivro,
  devolverLivro,
  buscarLivroPorIsbn,
  listarLivrosDisponiveis,
  calcularMulta
};