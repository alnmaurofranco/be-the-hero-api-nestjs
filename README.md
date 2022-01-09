<p align="center">
  <a href="https://github.com/alnmaurofranco/WeekOmniStack11-be-the-hero" target="blank"><img src="https://raw.githubusercontent.com/alnmaurofranco/WeekOmniStack11-be-the-hero/40296d741acb9655c372bf0a9c9661d796074eda/frontend/src/assets/logo.svg" width="320" alt="Be The Hero logo" /></a>
</p>

<p align="center">API feita para estudo/pratica do framework NestJS e Prisma ORM</p>

## ♻ API Be The Hero - Antiga
[LINK DA API ANTIGA](https://github.com/alnmaurofranco/WeekOmniStack11-be-the-hero/blob/master/backend)

## 🚀 Tecnologias
Esse projeto foi desenvolvido com as seguintes tecnologias:
* [Node.js](https://nodejs.org/en/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
* [NestJS](https://docs.nestjs.com/) - Is a framework for building efficient, scalable Node.js web applications.
* [Prisma](https://prisma.io/) - Next-generation Node.js and TypeScript ORM
* [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database
* [Docker](https://www.docker.com/) - Developers Love Docker. Businesses Trust It.
<p>
<img src="https://cdn.svgporn.com/logos/nodejs-icon.svg" alt="nodejs" width="30" height="30" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/nestjs.svg" alt="nestjs" width="30" height="30" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/typescript-icon.svg" alt="typescript" width="30" height="30" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/prisma.svg" alt="prisma" width="30" heigth="30" style="margin-right: 5px;" />
<img src="https://cdn.svgporn.com/logos/postgresql.svg" alt="postgresql" width="30" height="30" style="margin-left: 5px;"/>
<img src="https://cdn.svgporn.com/logos/docker-icon.svg" alt="docker" width="30" heigth="30" style="margin-right: 5px;" />

## ✨ Funcionalidades
- Cadastrar ONG ✅
- Autenticação da ONG ✅
- Perfil de ONG ✅
- Listar ONGs ✅
- Cadastrar um novo Caso ✅
- Listar todos os Casos ✅
- Listar todos os Casos que foram finalizados recentemente ✅
- Obter informação de um Caso ✅
- Atualizar um Caso ✅
- Excluir um Caso ✅
- Finalizar um Caso

## 🎓 Desafio / Novas funcionalidades
- Autenticação com JWT ✅
- Autenticação com
  - Google ✅
  - Facebook ✅
- Permissão de Administrador ✅
- Casos Resolvidos/Finalizados ✅

## 💻 Como executar
Para rodar este projeto é necessário ter [Node.js](https://nodejs.org/) instalado em sua maquina. Caso não tenha ainda basta acessar o site do [Node.js](https://nodejs.org/) e instalar para continuar.

- Clone este repositório com comando
```bash
git clone https://github.com/alnmaurofranco/be-the-hero-api-nestjs
```
- Acesse a pasta do projeto
```bash
cd be-the-hero-api-nestjs
```
### **🔥 Sem Docker**
- Instale as dependências do projeto com (yarn ou npm) nesse exemplo estou usando **yarn**
```bash
yarn install
```
- Logo depois, você deve renomear o arquivo `.env.example` para `.env` que se encontra na raiz do projeto. Agora na pasta **/prisma** você deve configurar a conexão com seu banco de dados.

```bash
DATABASE_URL="postgresql://USER:PASS@HOST:PORT/DATABASE?schema=public"
```

- Iniciar a API:
```bash
yarn start:dev
```

Pronto agora API estára rodando e pode ser acessado em [`http://localhost:3333/api`](http://localhost:3333/api)

### **🐳 Com Docker**
- Subindo o container do projeto no Docker utilizando o comando abaixo:
```bash
docker-compose up -d
```

Pronto agora API estára rodando com Docker e já pode ser acessado em [`http://localhost:3333/api`](http://localhost:3333/api)

## 🔑 Como gerar a chave no Google e Facebook

## Google
Primeiramente você deve acessar o site do Google: https://console.developers.google.com, em seguida você deve criar um projeto. Após criar o projeto você vai criar a sua credencial.
<p>
<img src=".github/screens/google-1.jpg" alt=""/>
</p>

Após clicar em "Criar Credenciais", você colocar a opção de "Aplicativo para Web" e colocar um nome para sua Cliente ID. **NÃO MUDE! URIs deve ser igual ao que está na imagem.**
<p>
<img src=".github/screens/google-2.jpg" alt=""/>
</p>
<p>
<img src=".github/screens/google-3.jpg" alt=""/>
</p>

Pronto agora você pode pegar as chaves e colocar no **.env** e autenticação pelo google já estara funcionando normalmente.

## Facebook
Você deve acessar o site do Facebook https://developers.facebook.com/, em seguida **clicar em "Criar aplicativo"**
<p>
<img src=".github/screens/facebook-1.jpg" alt=""/>
</p>

**Selecione a opção de "Nenhum" e clique em avançar**

<p>
<img src=".github/screens/facebook-2.jpg" alt=""/>
</p>

**Selecione o produto de "Login do Facebook" e clique em "Configurar"**

<p>
<img src=".github/screens/facebook-3.jpg" alt=""/>
</p>

*Nesse campo você deve deixar igual ao que está na imagem.*

<p>
<img src=".github/screens/facebook-4.jpg" alt=""/>
</p>

Agora vá em "Configurações->Básica" após você deve pegar as *chaves "ID do Aplicativo" e "Chave Secreta"* e colocar no seu **.env**

<p>
<img src=".github/screens/facebook-5.jpg" alt=""/>
</p>

Pronto agora a autenticação com facebook estara funcionando.

---
Feito com 💚 by AlanM Franco
