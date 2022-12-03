# Backend do projeto de Banco de Dados

## Rodando a docker image

Para subir a imagem é necessário ter o docker instalado.

```
docker-compose up
```

Caso ocorra um erro de porta ao executar este arquivo, pode ser resolvido com:

```
docker-compose down -v
```

Isso irá apagar todos os containers que estiverem rodando atualmente na sua máquina e excluir os volumes.

## Rodando o server

Para rodar o backend na porta 3000

```
yarn dev:index
```
