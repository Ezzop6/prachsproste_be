import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class ApiSwagger {
  private options;
  setup(app) {
    this.options = new DocumentBuilder()
      .setTitle('Prachsproste.eu API')
      .setVersion('0.0.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      })
      .build();

    const document = SwaggerModule.createDocument(app, this.options);
    SwaggerModule.setup('api', app, document);
  }
}
