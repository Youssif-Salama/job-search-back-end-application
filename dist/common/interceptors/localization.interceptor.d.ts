import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
declare class LocalizationInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): import("rxjs").Observable<any>;
}
export default LocalizationInterceptor;
