"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocalizationInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const localeCode = request.headers['locale-code'];
        if (!localeCode)
            return next.handle();
        if (!['en', 'ar'].includes(localeCode)) {
            throw new Error(`Unsupported locale code: ${localeCode}`);
        }
        request.localeCode = localeCode;
        return next.handle();
    }
}
exports.default = LocalizationInterceptor;
//# sourceMappingURL=localization.interceptor.js.map