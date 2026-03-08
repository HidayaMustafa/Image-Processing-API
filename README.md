# Image Processing API

A simple image processing API built with **Node.js**, **Express**, **TypeScript**, and **Sharp**.

This API resizes images based on query parameters and caches the processed versions to improve performance. Instead of creating multiple copies of the same image manually, the API generates resized images on demand and stores them inside a cache directory for future requests.

---

## Features

* Resize images using query parameters
* Cache resized images in the `assets/thumb` folder
* Serve cached images for repeated requests
* Handle invalid input with clear error messages
* Unit and endpoint testing using **Jasmine** and **SuperTest**
* Code formatting using **Prettier**
* Code linting using **ESLint**
* Clean project structure with separation between routes, utilities, source code, compiled code, and tests

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
```

---

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

Starts the production server from the compiled JavaScript output.

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

Runs all unit tests and endpoint tests using Jasmine.

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

### GET `/api/images`

Resizes an image based on the provided query parameters.

---

## Query Parameters

| Parameter  | Description                              |
| ---------- | ---------------------------------------- |
| `filename` | Name of the image file without extension |
| `width`    | Desired width of the resized image       |
| `height`   | Desired height of the resized image      |

---

## Working Endpoint Example

Use the following URL after starting the server:

```
http://localhost:3000/api/images?filename=fjord&width=200&height=200
```

### Expected Behavior

* The API looks for the original image in:

```
assets/full/fjord.jpg
```

* If the resized image does **not** already exist, the API:

  * resizes the image to the requested dimensions
  * saves the result inside the cache folder:

```
assets/thumb/fjord_200_200.jpg
```

* If the resized image **already exists**, the API:

  * returns the cached image directly
  * does not process the image again

* The response is the **resized JPG image itself**, not JSON or plain text.

---

## Caching Behavior

This project uses **file-based caching**.

When an image is requested for the first time with specific dimensions, the API generates the resized version and stores it in:

```
assets/thumb
```

Example cached filename:

```
fjord_200_200.jpg
```

If the same image with the same dimensions is requested again, the cached version is served directly instead of generating a new file.

This improves performance and avoids repeated image processing.

---

## Response

If the request is valid, the API returns the resized image file.

For example, requesting:

```
http://localhost:3000/api/images?filename=fjord&width=200&height=200
```

returns the resized JPG image and stores it in the cache folder if it was not already cached.

---

## Error Handling

The API returns appropriate HTTP status codes and messages for invalid cases.

### 400 — Bad Request

Returned when:

* `filename` is missing
* `width` is missing
* `height` is missing
* `width` is not a valid positive number
* `height` is not a valid positive number

---

### 404 — Not Found

Returned when:

* the requested image does not exist in `assets/full`

---

### 500 — Internal Server Error

Returned when:

* an unexpected error occurs during image processing

---

## Example Error Cases

### Missing filename

```
http://localhost:3000/api/images?width=200&height=200
```

### Missing width

```
http://localhost:3000/api/images?filename=fjord&height=200
```

### Invalid width

```
http://localhost:3000/api/images?filename=fjord&width=-5&height=200
```

### Image not found

```
http://localhost:3000/api/images?filename=unknown-image&width=200&height=200
```

---

## Testing

The project includes two types of tests.

### Endpoint Tests

Located in:

```
tests/endpoints/imagesSpec.ts
```

These tests verify:

* valid image requests
* missing parameters
* invalid dimensions
* image not found cases

---

### Utility Tests

Located in:

```
tests/utilities/imageProcessorSpec.ts
```

These tests verify:

* image resizing works correctly
* cached files are created
* missing source image errors are handled correctly

---

## Technologies Used

* Node.js
* Express
* TypeScript
* Sharp
* Jasmine
* SuperTest
* ESLint
* Prettier

---

## Notes

* Original images should be placed inside `assets/full`
* Cached resized images are stored inside `assets/thumb`
* The cache directory should be available at runtime or created automatically before writing resized files

---

## Author

Developed as part of an **Image Processing API project using Node.js and TypeScript**.
