import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import envConfig from './config/env.config';
import { DbModule } from './db/drs.db';
import { PlanModule } from './modules/plan/plan.module';
import * as path from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CategoryModule } from './modules/category/category.module';
import { DoctorController } from './modules/doctor/doctor.controller';
import { DoctorModule } from './modules/doctor/doctor.module';
import { CredentialService } from './modules/credential/credential.service';
import { CredentialModule } from './modules/credential/credential.module';
import { FileModule } from './modules/file/file.module';

let envPath: string;
switch (process.env.NODE_ENV) {
  case 'production':
    envPath = path.resolve(__dirname, '../../.env.prod');
    break;
  case 'development':
    envPath = path.resolve(__dirname, '../../.env.dev');
    break;
  default:
    envPath = path.resolve(__dirname, '../../.env.dev');
}




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
      envFilePath: envPath
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (envConfig: ConfigService) => {
        const user = envConfig.get<string>('envConfig.email.user')
        const pass = envConfig.get<string>('envConfig.email.pass')
        console.log({ user, pass })
        return {
          transport: {
            service: 'gmail',
            auth: {
              user,
              pass
            },
          },
          defaults: {
            from: '"DRS System" <noreply@drs.com>',
          },
          template: {
            dir: path.join(__dirname, '/common/templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        }
      }
    }),
    DbModule,
    AdminModule,
    PlanModule,
    CategoryModule,
    DoctorModule,
    CredentialModule,
    // FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
