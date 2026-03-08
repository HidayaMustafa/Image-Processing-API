# Image Processing API

A simple image processing API built with **Node.js**, **Express**, **TypeScript**, and **Sharp**.
This API resizes images based on query parameters and caches the resized versions to improve performance.

---

## Features

- Resize images using query parameters
- Cache resized images in a `thumb` directory
- Serve cached images for repeated requests
- Handle invalid input with proper error messages
- Unit and endpoint testing using **Jasmine** and **SuperTest**
- Code formatting with **Prettier**
- Code linting with **ESLint**

---

## Project Structure

```text
image-processing-api/
├── assets/
│   ├── full/                 # Original images
│   └── thumb/                # Cached resized images
│
├── src/
│   ├── routes/
│   │   └── api/
│   │       └── images.ts     # API route
│   │
│   ├── utilities/
│   │   └── imageProcessor.ts # Image processing logic
│   │
│   ├── app.ts                # Express application
│   └── server.ts             # Server entry point
│
├── tests/
│   ├── endpoints/
│   │   └── imagesSpec.ts
│   │
│   └── utilities/
│       └── imageProcessorSpec.ts
│
├── build/                    # Compiled JavaScript output
├── package.json
├── tsconfig.json
└── README.md


## Installation

Clone the repository and install dependencies:

```bash
npm install
```

---

## Available Scripts

### Start the server

```bash
npm start
```

Starts the production server.

---

### Build the project

```bash
npm run build
```

Compiles TypeScript code into JavaScript inside the `build` folder.

---

### Run tests

```bash
npm test
```

Runs all unit and endpoint tests using Jasmine.

---

### Run lint

```bash
npm run lint
```

Runs ESLint to analyze the code and detect potential issues.

---

### Format the code

```bash
npm run format
```

Formats the entire codebase using Prettier.

---

## API Endpoint

### GET /api/images

Resizes an image based on the provided query parameters.

---

## Query Parameters

| Parameter | Description                              |
| --------- | ---------------------------------------- |
| filename  | Name of the image file without extension |
| width     | Desired width of the resized image       |
| height    | Desired height of the resized image      |

---

## Example Request

```
http://localhost:3000/api/images?filename=fjord&width=200&height=200
```

---

## Response

If the request is valid, the API returns the resized image.

If the resized version already exists, the cached image will be returned instead of processing a new one.

---

## Error Handling

The API returns appropriate HTTP status codes:

- **400 Bad Request**
    - Missing filename
    - Missing width or height
    - Invalid width or height values

- **404 Not Found**
    - Requested image does not exist

- **500 Internal Server Error**
    - Unexpected server error during image processing

---

## Technologies Used

- Node.js
- Express
- TypeScript
- Sharp
- Jasmine
- SuperTest
- ESLint
- Prettier
