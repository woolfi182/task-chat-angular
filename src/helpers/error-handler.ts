import Express from 'express';

export interface HandleErrorsOptions {
    debug: boolean;
}

export interface StandardError extends Error {
    statusCode: number;
}

export default function createErrorHandlerMiddleware(opts: HandleErrorsOptions): Express.ErrorRequestHandler {
    const { debug } = opts;

    return (originalError: StandardError, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
        const { message, stack, statusCode } = originalError;

        if (statusCode) {
            res.status(statusCode);
        }

        res.json({
            error: {
                message,
                stack: debug ? stack : null
            }
        });
    };
}
