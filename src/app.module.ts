import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfigutation } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfigutation],
      validationSchema: JoiValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(
      process.env.MONGODB ||
        'mongodb://mongo:yshtXplcWmXeKrFVRkQRfBVoUdwXpWyk@gondola.proxy.rlwy.net:55681',
      {
        dbName: 'pokemons',
      },
    ),
    CommonModule,
    PokemonModule,
    SeedModule,
  ],
})
export class AppModule {}
