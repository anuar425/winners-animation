# FROM node:21-alpine3.20 AS builder

# WORKDIR /app

# COPY package.json .

# RUN npm install

# RUN npm i -g serve

# COPY . .

# RUN npm run build:vite

# EXPOSE 3000

# CMD [ "npm", "run", "preview" ]

# Указываем базовый образ с Node.js 21.6.1
FROM node:21.6.1

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json и yarn.lock для установки зависимостей
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install

# Копируем все остальные файлы проекта в контейнер
COPY . .

# Сборка проекта
RUN yarn build:vite

# Открываем порт 3000 для доступа к приложению
EXPOSE 3000

# Команда для запуска Vite-приложения в режиме предварительного просмотра
CMD ["yarn", "preview"]