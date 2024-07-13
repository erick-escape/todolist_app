## Índice

<details>
<summary>Índice</summary>
   <ol>
      <li><a href="#sobre">Sobre</a></li>
      <li><a href="#tecnologias-utilizadas">Tecnologias utilizadas</a></li>
      <li><a href="#modelagem-de-dados">Modelagem de dados</a></li>
      <ul>
         <li><a href="#diagrama-de-entidade">Diagrama de Entidade</a></li>
      </ul>
      <li><a href="#instruções-para-rodar-o-projeto">Instruções para rodar o projeto</a></li>
</details>

## Sobre

Projeto desenvolvido para a disciplina de Programação Web - 2024/1 do curso de Ciência da Computação da Universidade Federal de Lavras . O projeto consiste em um sistema de gerenciamento de tarefas, onde o usuário pode criar, editar, excluir e visualizar tarefas. Também é possível adicionar anexos (arquivos ou imagens) às tarefas.

## Tecnologias utilizadas

<div>
<img align="center" alt="Python" src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue">
<img align="center" alt="Django" src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green">
<img align="center" alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
<img align="center" alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white">
<img align="center" alt="Cloudinary" src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white">

</div>

## Modelagem de dados

### Diagrama de Entidade

O diagrama de entidade foi desenvolvido utilizando a ferramenta [Eraser.io](https://app.eraser.io)

![Diagrama de Entidade](/.github/diagrama-entidade.png)

## Instruções para rodar o projeto

1. Clone o repositório

   ```bash
   git clone https://github.com/erick-escape/programacao-web.git
   ```

2. Acesse a pasta do projeto

   ```bash
   cd programacao-web
   ```

3. Crie as variaveis de ambiente

   ```bash
   cp .env.example .env
   ```

4. Altere os valores das variaveis de ambiente no arquivo `.env` que estão escritos como `CHANGE-ME`

5. Rode o docker-compose

   ```bash
   docker-compose up --build
   ```

6. Para criar um super usuário, execute o comando

   ```bash
   docker-compose run djangoapp python manage.py createsuperuser
   ```

7. Acesse o projeto em [localhost:8000](http://localhost:8000)

8. Para acessar o painel de admin, acesse [localhost:8000/admin](http://localhost:8000/admin)

## Autores

- [Erick Castro](github.com/erick-escape)
- [Victor Hugo Xavier](github.com/victorhxo)
