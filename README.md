This is a [LlamaIndex](https://www.llamaindex.ai/) project using [Express](https://expressjs.com/) bootstrapped with [`create-llama`](https://github.com/run-llama/LlamaIndexTS/tree/main/packages/create-llama).

## Features
LLM based cheerleader for you inside your simple, one page CV.

**With this kind of support, it's impossible not to be hired 💪**

## Getting Started

First, install the dependencies:

```
npm install
```

Second, run the development server:

```
npm run dev
```

Then call the express API endpoint `/api/chat` to see the result:

```
curl --location 'localhost:8000/api/chat' \
--header 'Content-Type: application/json' \
--data '{ "section": "About me", "text": "Engineer with 5 years of experience with Python and Typescript."}'
```

You can start editing the API by modifying `src/controllers/chat.controller.ts`. The endpoint auto-updates as you save the file.

## Production

First, build the project:

```
npm run build
```

You can then run the production server:

```
NODE_ENV=production npm run start
```

> Note that the `NODE_ENV` environment variable is set to `production`. This disables CORS for all origins.