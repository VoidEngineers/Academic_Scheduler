# Conflict Manager API

A Flask-based API for managing academic schedule conflicts.

## Libraries Used

- **Flask**: used to build web applications & offers features like templating, database integration, and routing
- **requests** : enables developers to write code to interact with REST APIs
- **boto3** : The AWS SDK for python this is provides a python API for AWS infrastructure service. Using this you will able to build a applications on top of Amazon S3, Amazon EC2, Amazon DynamoDB and more.
- **botocore** : This package provides a low-level interface to Amazon services.
- **python-dotenv** : Python-dotenv reads key-value pairs from a .env file and can set them as environment variables.
- **gunicorn** : Gunicorn 'Green Unicorn' is a Python WSGI HTTP Server for UNIX. It's a pre-fork worker model ported from Ruby's Unicorn project. The Gunicorn server is broadly compatible with various web frameworks, simply implemented, light on server resources, and fairly speedy. Used to deploy the application in the production environment.
- **pip-tools**: pip-tools is a set of command line tools to help you keep your pip-based packages fresh, even when you've pinned them. It creates a requirements.txt file based on the dependencies in your project's source code. Also helps to pin the dependencies to a specific version. This is useful when you want to ensure that your project will work with a specific version of a dependency.

---

## Running the jsm collector in your local machine

### Pre-requisites

- Python 3.10 or higher installed

## Setup

1. Open the terminal

2. Navigate to the `conflictmanager` directory

3. If you not installed "pip" make sure pip package install in your package

```bash
python -m ensurepip --upgrade
```

4. Create a virtual environment (recommended):

```bash
python -m venv .venv
```

5. Activate the virtual environment

```bash
source .venv/bin/activate  # On Windows: venv\Scripts\activate
```

6. Install dependencies:

```bash
pip install -r requirements-lock.txt
```

Refer the dependecy management section for more details on how to manage the dependencies. [Dependency Management](#dependency-management)

7. Create a copy of `.env.example` file rename it to `.env` and add the values to exsiting variables in the file.

## Running the Application

To run the application:

```bash
python run.py
```

The server will start on `http://localhost:5000`

Observe the output in the terminal. collector will run as a server and the correctly formatted request need to be sent to the server to get the response.

## Available Endpoints

- `GET /`: Welcome message
- `GET /health`: Health check endpoint

## Development

The application is set up with CORS enabled and debug mode on for development purposes.

## Dependency Management

Direct dependencies are managed using `requirements.in` file. This file contains the direct dependencies of the project specified by the developers. \
The `requirements-dev.in` file contains the development dependencies of the project which includes the direct dependencies as well as the pip-tools \
The `requirements-lock.txt` file is generated from the `requirements.in` file using the `pip-compile` command. The `requirements-lock.txt` file contains the exact versions of the dependencies and is used to install the dependencies which ensures that the same versions of the dependencies are installed in the local environment as well as in the production environment. \
If any dependencies are added, removed or updated in the `requirements.in` file, the `requirements-lock.txt` file should be updated using the `pip-compile` command. \

To update the `requirements-lock.txt` file, run the following command:

```bash
pip-compile --output-file requirements-lock.txt requirements.in
```
