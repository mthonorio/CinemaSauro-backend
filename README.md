# Backend do projeto de Banco de Dados

## Rodando a docker image

Para subir a imagem é necessário ter o docker instalado.
Na pasta docker do projeto, execute:

```
cd docker
docker-compose up
```

Caso ocorra um erro de porta ao executar este arquivo, pode ser resolvido com:

```
docker-compose down -v
```

Isso irá apagar todos os containers que estiverem rodando atualmente na sua máquina e excluir os volumes.

## Migrations

Para rodar todas as migrations em ordem crescente, basta rodar:

```
yarn migrations:run
```

Quando tiver uma alteração nas Entities do projeto, quando for gerar uma nova migration para espelhar no banco de dados, basta rodar:

```
yarn migrations:generate
```

Quando for reverter uma alteração no banco, o typeorm ele fará o fluxo reverso na ordem decrescente, então o último migration executado será desfeito:

```
yarn migrations:revert
```

## Rodando o server

Para rodar o backend na porta 3000

```
yarn dev:index
```
