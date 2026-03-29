const livroService = require('./services/livroService');

console.log("=================================================");
console.log("   SISTEMA DE GERENCIAMENTO DE BIBLIOTECA   ");
console.log("=================================================\n");

try {
  livroService.cadastrarLivro('978-3-16-148410-0', 'O Senhor dos Anéis', 'J.R.R. Tolkien', 1954);
  livroService.cadastrarLivro('978-85-359-0277-8', '1984', 'George Orwell', 1949);
  livroService.cadastrarLivro('978-85-333-0223-4', 'Dom Casmurro', 'Machado de Assis', 1899);

  console.log("✅ 3 livros cadastrados com sucesso!\n");

  const emprestou = livroService.emprestarLivro('978-3-16-148410-0');
  console.log("📖 Empréstimo de 'O Senhor dos Anéis':", emprestou ? "✅ Sucesso" : "❌ Falhou");

  const disponiveis = livroService.listarLivrosDisponiveis();
  console.log(`📚 Livros disponíveis agora: ${disponiveis.length}\n`);

  console.log(`💰 Multa para 8 dias de atraso: R$ ${livroService.calcularMulta(8).toFixed(2)}`);

  console.log("\n🎉 Sistema inicializado com sucesso!");
  console.log("   Para rodar os testes: npm test");

} catch (error) {
  console.error("❌ Erro durante a execução:", error.message);
}
