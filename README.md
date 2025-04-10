# Desafio Técnico: Cotação de Ativos

Olá! Bem-vindo ao meu desafio técnico de **Cotação de Ativos**. Este projeto foi desenvolvido com **React**, **TypeScript**, **Vite**. O objetivo é fornecer uma aplicação simples para exibir cotações de moedas e ações com atualizações em tempo real.

As cotações são obtidas por meio da [API de finanças da HG Brasil](https://hgbrasil.com/finance), que fornece dados atualizados sobre moedas, ações, índices e criptomoedas.

## Tecnologias Usadas

![React](https://img.shields.io/badge/React-19.1.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.2.0-purple.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC.svg)
![Jest](https://img.shields.io/badge/Jest-29.7.0-brightgreen.svg)
![ESLint](https://img.shields.io/badge/ESLint-9.21.0-purple.svg)

Aqui estão as principais tecnologias utilizadas neste projeto:

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Vite**: Ferramenta moderna de build para front-end.
- **Tailwind CSS**: Utilitário CSS para estilização rápida e responsiva.
- **Jest**: Framework de testes para aplicações JavaScript/TypeScript.
- **ESLint**: Ferramenta de análise estática de código para manter a padronização e evitar erros.

## Funcionalidades

Este projeto possui as seguintes funcionalidades:

- **Página de Login:** O usuário pode fazer login com credenciais armazenadas no localStorage.
- **Página de Dashboard:** Exibe cotações de ativos financeiros (moedas e ações) com atualizações em tempo real.
- **Gráficos:** Exibe gráficos das variações de preços dos ativos selecionados.
- **Componentes reutilizáveis:** Botões e inputs estilizados para manter a consistência no design.

## Requisitos

Antes de rodar o projeto, você precisará ter os seguintes pré-requisitos instalados:

- **Node.js** (versão 16 ou superior)
- **npm** (gerenciador de pacotes)

### Iniciando o Projeto:

Antes de rodar o projeto, você precisa configurar a chave de acesso à API da HG Brasil. Para isso:

1. Acesse o arquivo `.env` na raiz do projeto.
2. Adicione sua chave da API no seguinte formato:

````bash
VITE_HG_API_KEY=sua_chave_aqui

1. Clone o repositório:

   ```bash
   git clone https://github.com/michelenink/desafio-franq-finance.git
````

2. Instale as dependências necessárias:

   ```bash
   npm install
   ```

3. Agora, para iniciar o servidor de desenvolvimento, basta rodar:

   ```bash
   npm run dev
   ```

4. Acesse a aplicação no navegador:
   ```bash
   http://localhost:3001
   ```

### Executar Testes

Se você quiser rodar os testes unitários (que são feitos com Jest), use o comando abaixo:

1. Para rodar os testes, utilize o comando:
   ```bash
   npm test
   ```

[Visite meu GitHub](https://github.com/michelenink)<br>
[Visite meu linkedin](https://www.linkedin.com/in/michelenink/)
