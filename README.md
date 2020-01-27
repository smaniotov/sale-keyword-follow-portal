# sale-keyword-follow

## Table of Contents

- [Overview](#overview)
- [Install](#install)
- [How to run](#how-to-run)
- [Usage](#usage)

## Overview
`sale-keyword-follow-portal` is the frontend part of the backend project with the same name `sale-keyword-follow`.

<a id="#install"></a>
## Install

### How to install deps
If you are running locally, you need to install all dependencies manually.

To **install** all the dependencies, you can use `yarn` or `npm`.

```yarn
yarn install
```
```npm
npm install
```

Running either of the above commands will download all the dependencies to node_modules.

<a id="how-to-run"></a>
## How to run
- Project will always run in port `8000`

### Run locally
Follow the below instructions 

```
npm: npm run {command}
```

```
yarn: yarn {command}
```

- Available run commands:
  - `build`: build project to `/dist` directory
  - `build:prod`: build project with production configurations
  - `start`: run project with hot reload

<a id='usage'></a>
### Usage
- Create alert with `delay`, `keyword` and `sendTo` parameters.
  - Remember that you have only those three options for delay: [2, 10, 30]
  - You are not able to create two alert with same keyword and sendTo
- Delete alert when you don't want to receive it anymore.