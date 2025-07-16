import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";

class LocalizationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const localeCode = request.headers['locale-code'] || 'en';
        request.localeCode = localeCode;
        return next.handle();
    }
}

export default LocalizationInterceptor;