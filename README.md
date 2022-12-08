# Backend do projeto de Banco de Dados

## Banco de dados

Para criarmos a imagem postgresSQL, criamos um arquivo .yml de configuração com referência a uma Docker Image que cria e executa uma virtualização de uma máquina com o postgres instalado.

### Rodando o container(docker image)

Para subir a imagem é necessário ter o docker instalado.
Para ir ao diretório docker do projeto e rodar a imagem docker, execute:

```
cd docker
docker-compose up
```

Caso ocorra um erro de porta ao executar este arquivo, pode ser resolvido com:

```
docker-compose down -v
```

Isso irá apagar todos os containers que estiverem rodando atualmente na sua máquina e excluir os volumes.

### Migrations

Quando tiver uma alteração nas Entities do projeto, quando for gerar uma nova migration para espelhar no banco de dados, basta rodar:

```
yarn migrations:generate
```

Para rodar todas as migrations em ordem crescente, basta rodar:

```
yarn migrations:run
```

Quando for reverter uma alteração no banco, o typeorm ele fará o fluxo reverso na ordem decrescente, então o último migration executado será desfeito:

```
yarn migrations:revert
```

## Backend da aplicação

### Executando o servidor

Para subir o backend na porta 3000, basta executar no terminal:

```
yarn dev:index
```

## Populando o banco de dados

Utilizamos Seeds que são objetos pré-definidos para criarmos automaticamente através de uma requisição na API. Dessa forma, executa as rotinas que definimos no controller passando os dados como parâmetros, como por exemplo: create(clients), create(sessions), create(movies).

Para rodar todos os seeds, basta executar:

```
yarn seed
```

Caso a rotina já tenha sido executada e tentar executar novamente, o sistema retornará um "Done", porém não serão adicionados os objetos ao banco de dados para evitar redundância e que quebre em alguma rotina.
