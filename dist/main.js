"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dns = require("dns");
const response_format_interceptor_1 = require("./common/interceptors/response.format.interceptor");
async function bootstrap() {
    dns.setDefaultResultOrder('ipv4first');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('DRS App')
        .setDescription('DRS App API')
        .setVersion('1.0')
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header"
    }, "access-token")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/drs', app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new response_format_interceptor_1.default());
    app.useGlobalFilters(new response_format_interceptor_1.AllExceptionsFilter());
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('envConfig.system.port') || 3000;
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map