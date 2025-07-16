import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export default class ResponseFormatInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): import("rxjs").Observable<{
        statusCode: any;
        data: any;
        error: null;
        message: string[];
    }>;
}
export declare class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
