# Painel de Controle da Loja Online

Este é um painel de controle desenvolvido com **Vue.js 3** para gerenciar e monitorar uma loja online simulada utilizando a API **Fake Store**. O painel oferece funcionalidades para gerenciar **produtos**, **carrinhos de compras (pedidos)** e **usuários**, além de fornecer uma visão geral dos indicadores da loja.

## Funcionalidades Principais

### 1. **Visão Geral do Painel**

Na página inicial, o painel exibe informações essenciais sobre a loja:

- **Total de produtos**
- **Número de categorias**
- **Quantidade do pedido** (com base nos carrinhos)
- **Número total de usuários**

### 2. **Gestão de Produtos**

- **Exibição de Produtos**: A tabela exibe todos os produtos da loja com as colunas: Nome, Categoria, Preço e Classificação.
- **Filtros e Ordenação**: É possível filtrar produtos por categoria e ordenar por preço ou classificação.
- **Detalhes do Produto**: Um modal exibe detalhes de um produto específico, permitindo sua edição ou exclusão.
- **Adicionar Produtos**: Funcionalidade para adicionar novos produtos à loja.

### 3. **Gestão de Carrinho (Pedidos)**

- **Exibição de Pedidos**: A tabela de pedidos exibe informações como ID do pedido, data, valor total e status.
- **Detalhes do Pedido**: Permite visualizar os detalhes de um pedido, incluindo os produtos e suas quantidades.
- **Edição e Atualização de Pedidos**: Permite editar a quantidade de produtos em um pedido e atualizar os carrinhos.

### 4. **Gestão de Usuários**

- **Exibição de Usuários**: A tabela de usuários exibe nome, e-mail e cidade de cada usuário.
- **Pesquisa de Usuários**: É possível buscar usuários específicos através de um campo de pesquisa.
- **Adicionar e Editar Usuários**: Funcionalidade para adicionar, editar ou remover usuários da loja.

### 5. **Autenticação**

- **Tela de Login**: A primeira tela do painel exige login. A autenticação é feita através do endpoint `/auth/login` da API.
- **Mensagens de Erro**: Em caso de falha no login, o sistema exibe uma mensagem de erro apropriada.

## Estrutura de Componentes

### 1. **Página de Login**

- **Componente Login.vue**: Tela inicial onde o usuário insere suas credenciais (usuário e senha) para acessar o painel.
  
### 2. **Painel de Controle**

- **Componente Dashboard.vue**: A tela inicial do painel, exibindo os indicadores gerais da loja (produtos, categorias, pedidos, usuários).
  
### 3. **Gestão de Produtos**

- **Componente ProductList.vue**: Exibe todos os produtos e permite adicionar novos, editar ou excluir.
- **Componente ProductModal.vue**: Modal de detalhes de um produto com a possibilidade de edição e exclusão.
- **Componente ProductForm.vue**: Formulário para adicionar ou editar um produto.

### 4. **Gestão de Carrinho (Pedidos)**

- **Componente CartList.vue**: Exibe todos os pedidos com seus detalhes.
- **Componente CartDetails.vue**: Exibe os detalhes de um pedido específico e permite editar os itens do carrinho.

### 5. **Gestão de Usuários**

- **Componente UserList.vue**: Exibe todos os usuários com nome, e-mail e cidade. Permite editar, remover ou adicionar usuários.
- **Componente UserForm.vue**: Formulário para adicionar ou editar informações de usuários.

## Tecnologias Utilizadas

- **Vue.js 3**: Framework JavaScript para construção de interfaces reativas.
- **Vue Router**: Para navegação entre as páginas do painel.
- **Vuex**: Para gerenciamento de estado global da aplicação.
- **Axios**: Para realizar requisições HTTP à API da loja.
- **Bootstrap 5**: Framework CSS para design responsivo e componentes de interface de usuário.
- **FontAwesome**: Para ícones.

## Instruções de Execução

### Pré-requisitos

Certifique-se de ter os seguintes itens instalados:

- **Node.js**: Você pode baixar o Node.js a partir do [site oficial](https://nodejs.org/).
- **npm** ou **yarn**: O npm é instalado junto com o Node.js.

### Passos para Executar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/loja-online-dashboard.git

2. **Instalar dependencias:**

   ```bash
   npm install
3. **Rodar projeto:**

   ```bash
   npm run serve

4. **Abrir url projeto:**
Abra o navegador e vá para http://localhost:8080.

# Endpoints api:
Produtos: https://fakestoreapi.com/products
Categorias de Produtos: https://fakestoreapi.com/products/categories
Carrinhos: https://fakestoreapi.com/carts
Usuários: https://fakestoreapi.com/users
Autenticação: https://fakestoreapi.com/auth/login




Cenário
Você tem um novo trabalho para criar um painel de controle para ficar de olho e gerenciar as informações de uma loja online. A API Fake Store fornece informações detalhadas sobre produtos, categorias, carrinhos (pedidos) e usuários. Sua tarefa é usar esses dados e mostrá-los em um painel útil e fácil de usar. 🛒

Especificações do Projeto
Consumo de API:
Use o endpoint da API da Loja Falsa: https://fakestoreapi.com/.

Aqui estão os principais endpoints e ações que o painel precisa cobrir:

-/products:

Veja todos os produtos. ok

Visualize detalhes de um produto específico. ok

Filtre e classifique os produtos (por preço e classificação). ok

Adicione, atualize e remova produtos. ok

-/products/categories:

Liste e filtre produtos por categoria.

-/carts:

Listar todos os carrinhos de compras (simulação de pedidos). ok 

Visualize os detalhes de um pedido. ok 

Filtre os carrinhos por data e/ou usuário. ok

Adicione, atualize e remova itens do carrinho. ok +-

-/users:

Liste todos os usuários. OK 

Visualize os detalhes de um usuário específico. OK

Adicione, atualize e remova usuários. OK 

Faça login (para acessar o painel com as credenciais fornecidas). ok

Recursos do painel:
Visão geral dos indicadores:

Exiba um resumo no painel inicial com:

Total de produtos. OK 

Número de categorias. OK 

Quantidade do pedido (com base nos carrinhos).

Número total de usuários. ok 

Gestão de Produtos: ok

Implemente uma tabela para exibir todos os produtos com as colunas: Nome, Categoria, Preço, Classificação. ok

Adicione filtros por categoria e ordenação por preço ou classificação. ok

Implemente um modal para ver os detalhes de um produto e permitir a edição ou exclusão. ok

Adicione novos produtos à loja.

Gerenciamento de carrinho (pedidos): ok

Crie uma tabela de pedidos, incluindo informações como ID do pedido, data, valor total e status. ok

Visualize os detalhes do pedido, com a lista de produtos e suas quantidades. ok

Permitir edição e atualização de pedidos.

Gerenciamento de usuários:

Exibir uma tabela com usuários registrados, incluindo nome, e-mail e cidade. ok

Implemente uma função de pesquisa para encontrar usuários específicos. ok

Adicione novos usuários e edite ou remova usuários existentes.

-Autenticação: OK

Implemente uma tela de login para acesso ao painel, usando o endpoint da API /auth/login. Exibir mensagem de erro se o login for inválido. ok
Requisitos técnicos:
Desenvolver o projeto usando Vue.js (versão 3).

Use axios ou fetch para consumir os dados da API. ok 

Use o Vue Router para gerenciar a navegação entre as seções do painel (produtos, pedidos, usuários, login). ok

Gerencie o estado dos dados usando o Vuex ou a API Composition para compartilhar dados entre componentes. ok

O layout do painel deve ser responsivo, adaptado para visualizações em desktop e dispositivos móveis.

Exibir feedback de carga para solicitações e lidar com erros, mostrando mensagens apropriadas ao usuário. ok

Critérios de avaliação:
Organização e clareza do código. ok

Qualidade e eficiência na integração de APIs e apresentação de dados. ok

Usabilidade e experiência do usuário ao navegar pelo dashboard.

Apresentação visual e capacidade de resposta do layout.

Tratamento de erros e feedback adequado ao usuário. ok

Entrega
Formato: envie um repositório público no GitHub com o código do projeto.

Documentação: Inclua um README.md com instruções para a execução do projeto e uma descrição das principais funcionalidades e componentes implementados. 📦

Meu trabalho