import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
      .setTitle('Blog API Nest JS')
      .setDescription('This API Cover Important Concept of NEST JS')
      .setVersion('v1')
      .build()