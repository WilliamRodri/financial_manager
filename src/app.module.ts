import { Module } from '@nestjs/common';
import { globalModules } from './modules/global';
import { featureModules } from './modules';

@Module({
  imports: [...globalModules, ...featureModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
