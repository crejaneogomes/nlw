import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
    [key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    console.error(error);
    console.log('pelo menos chegou aqui né')
    if (error instanceof ValidationError){
        let errors: ValidationErrors = {};

        error.inner.forEach( err => {
            errors[err.path] = err.errors;
        })
        return response.status(400).json({ message: 'Validation failed', errors});
    }

    return response.status(500).json({ message: 'Internal Server Error'});
}

export default errorHandler;