[![build status](https://gitlab.com/AisuruKenshin/admin-center/badges/master/build.svg)](https://gitlab.com/AisuruKenshin/admin-center/commits/master)
[![node version](https://img.shields.io/badge/node-6.5.0-brightgreen.svg)]()
[![npm version](https://img.shields.io/badge/npm-3.10.3-brightgreen.svg)]()
[![gulp-cli version](https://img.shields.io/badge/gulp--cli-3.9.1-brightgreen.svg)]()
[![systemjs version](https://img.shields.io/badge/systemjs-0.19.27-brightgreen.svg)]()
[![angular version](https://img.shields.io/badge/angular-2.0.0-brightgreen.svg)]()
[![sass version](https://img.shields.io/badge/sass-3.4.22-brightgreen.svg)]()

# После клонирования
Установить зависимости:
> npm i

Запустить построение проекта, слежку за файлами и локальный сервер:
> npm start

или

> gulp

# Дополнительные команды
Удалить папку build:
> gulp clean

Удалить папку typings:
> gulp clean:typings

Удалить папку node_modules:
> gulp clean:nodemodules

Удалить папку build, typings, node_modules:
> gulp clean:all

Запустить локальный сервер (если нету папки build выдаст ошибку)
> gulp webserver

Запустить слежку за файлами:
> gulp watcher

Построить проект:
> gulp build

Постройка зависимостей для angular:
> gulp libs

Постройка systemjs.config.js:
> gulp sysjs

Постройка ts из папки app (from ts to js, +sourcemap):
> gulp app:ts

Постройка css из папки app (+prefix, +minify):
> gulp app:css

Постройка html из папки app:
> gulp app:html

Постройка index.html:
> gulp index:html

Постройка стилей (from sass to css, +prefix, +minify):
> gulp style:sass

Постройка изображений (optimize jpg, png, gif, svg):
> gulp images

---

#### Структура app (**front-end/source/app**):
```
.
├── account
│    ├── sign-in
│    │    └── sign-in.component.ts│html
│    ├── sign-up
│    │    └── sign-up.component.ts│html
│    ├── recovery
│    │    └── recovery.component.ts│html
│    └── account.component.ts│html
│
├── panel
│    ├── modal
│    │    └── modal.component.ts│html
│    ├── sidebar
│    │    └── sidebar.component.ts│html
│    ├── header
│    │    └── header.component.ts│html
│    ├── footer
│    │    └── footer.component.ts│html
│    ├── main
│    │    ├── settings
│    │    │    └── settings.ts│html
│    │    └── main.component.ts│html
│    └── panel.component.ts│html
│
├── shared
│    ├── account.service.ts
│    └── config.ts
│
├── testing
│    ├── typography
│    │    └── typography.component.ts│html
│    ├── controls
│    │    └── controls.component.ts│html
│    ├── controls-custom
│    │    └── controls-custom.component.ts│html
│    └── testing.component.ts│html
│
├── app.components.ts│html
├── app.routing.ts
└── main.ts
```

#### Структура assets (**front-end/source/assets**):
```
.
├── css
│    ├── base
│    │    ├── core.sass
│    │    └── typography.sass
│    ├── components
│    │    ├── controls.sass
│    │    └── controls-custom.sass
│    ├── modules
│    │    ├── modal.sass
│    │    ├── sidebar.sass
│    │    ├── header.sass
│    │    └── footer.sass
│    ├── pages
│    │    └── testing
│    │        ├── testing-controls.sass
│    │        ├── testing-controls-custom.sass
│    │        ├── testing-typography.sass
│    │        └── testing.sass
│    ├── utils
│    │    ├── constants.sass
│    │    ├── functions.sass
│    │    └── mixins.sass
│    ├── vendors
│    │    ├── normalize.sass
│    │    └── material-icons.sass
│    └── main.sass
│
└── img
     ├── favicon
     │    └── ...
     ├── sprite
     │    └── ...
     └── svg
          └── ...
```
