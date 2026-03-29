# Sistema de Gerenciamento de Biblioteca

Projeto desenvolvido para a disciplina **Qualidade e Teste de Software** (3º ano).

Sistema simples de biblioteca com cadastro de livros, empréstimo, devolução, busca e cálculo de multa por atraso.  
O foco principal foi aplicar **testes unitários** com **Jest**.

### Tecnologias Utilizadas
- **JavaScript** (Node.js)
- **Jest** (framework de testes unitários)
- Estrutura em camadas: `database` (in-memory), `services` (lógica de negócio) e `controllers`

### Requisitos Atendidos
- Cadastro de livro (ISBN único)
- Empréstimo e devolução de livros
- Busca por ISBN
- Listagem de livros disponíveis
- Cálculo de multa (R$ 2,00 por dia de atraso)

### Como Executar o Projeto

```bash
# 1. Clone o repositório
git clone https://github.com/enzoramoss/projeto-pessoal-sistema-de-gerenciamento-de-biblioteca.git

# 2. Entre na pasta
cd projeto-pessoal-sistema-de-gerenciamento-de-biblioteca

# 3. Instale as dependências
npm install

# 4. Execute o sistema (demonstração)
npm start

# 5. Rode os testes unitários
npm test
