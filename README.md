# Project Name

This project is built with [AdonisJS](https://adonisjs.com).

## Requirements

- Docker

## Getting Started

Use the provided `.env.example` file as a template.

Copy it and create your own `.env` file at the root of the project:

```bash
cp .env.example .env
```

Update the values according to your local environment.

Install the packages (to install node_modules properly)

```bash
npm install
```

Now, build the Docker Image

```bash
docker build --no-cache -t adonis-app .
docker run -p 3333:3333 adonis-app
```

The application will be available at:

http://localhost:3333
