# PDF-DL API

The PDF-DL API is a serverless function designed to convert web pages into PDF documents. It is built using Bun, a fast all-in-one JavaScript runtime.

## Features

- **URL to PDF Conversion**: Accepts a web page URL and returns a PDF document.
- **GET and POST Support**: Can be used with both GET and POST HTTP methods for flexibility.
- **Error Handling**: Provides meaningful error messages for troubleshooting.

## Usage

To convert a web page to a PDF, send a request to the API endpoint with the [url](file:///Users/chrisabdo/Desktop/Programming/youtube-convert/api/index.ts#15%2C3-15%2C3) parameter:

- Using GET: `https://api.example.com/?url=https://www.example.com`
- Using POST: `https://api.example.com/` with JSON body `{ "url": "https://www.example.com" }`


## Deployment

The API is containerized and can be deployed to any cloud provider that supports Docker or serverless functions.

## Contributing

To contribute to the API, please follow the standard GitHub flow: fork the repository, make changes, and submit a pull request.

## License

The PDF-DL API is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Thanks to the creators of Bun, Puppeteer, and other libraries used in this project.

## Contact

For any inquiries or issues related to the API, please open an issue on the GitHub repository.

---

For more detailed information on the API's implementation, please refer to the source code in the [api](file:///Users/chrisabdo/Desktop/Programming/youtube-convert/api/.gitignore#13%2C42-13%2C42) directory.