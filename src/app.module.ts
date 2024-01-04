import { Module } from '@nestjs/common';
import { globalModules } from './modules/global';
import { featureModules } from './modules';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [...globalModules, ...featureModules, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
