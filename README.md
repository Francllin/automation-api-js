# Automation API

## Project Setup LOCAL

Entrar na pasta do projeto:

### Sem docker

Para **instalar as dependencias**

obs: precisa ter o nodejs o npm instalado na sua maquina em qualquer versão

```bash
npm install ou npm i
```

Para **rodar os testes**

```bash
npm run cypress:run
```

## Com Docker

**Criar a imagem** com as dependencias instaladas

```bash
docker build -t qa .
```

Para **executar o container** e ter acesso aos comandos

```bash
docker run --rm --network host --entrypoint /bin/sh -it qa
```

Para **executar os testes***

testegit

```bash
docker run --rm --network host -v ~/.Xauthority:/root/.Xauthority:ro -e DISPLAY --entrypoint /bin/sh -it qa -c 'npm run cypress:run'
```

Para **Remover as images se necessário**

```bash
- docker rm -vf $(docker ps -a -q)
- docker rmi -f $(docker images -a -q)
```
