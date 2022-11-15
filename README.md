# Monolito

Projeto desenvolvido durante o módulo **Sistemas monolíticos** do curso Full Cycle.

Projeto desenvolvido em &nbsp;[![TypeScript][TypeScript.org]][TypeScript-url]

## Pré requisitos para a instalação
No projeto foi adicionado um arquivo docker-compose com os serviços necessários, portanto caso queira utilizá-lo tenha instalado e configurado o `docker` e o `docker compose` em sua máquina.
Caso prefira não utilizar o docker, tenha instalado o node.js.

## Instalação
1. Clone o repositório
```sh
https://github.com/LeomaraAC/monolito.git
```
2. Instale as dependências
```sh
docker-compose run --rm npm install
```
3. Rode os testes
```sh
docker-compose run npm --rm test
```

## Licença
[MIT](https://github.com/LeomaraAC/monolito/blob/master/LICENSE.md)

[TypeScript.org]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
