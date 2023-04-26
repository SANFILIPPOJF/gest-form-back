import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const message = exception.getResponse() as {statusCode : number, message: string | string[], error: string} | string;
        if (typeof message === "object") {
            response
                .status(status)
                .json({
                    statusCode: message.statusCode,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: typeof message.message === "string" ? message.message : message.message.join(", ") 
                });
        } else {
            response
                .status(status)
                .json({
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: message
                });
        }
    }
}