import { Controller, Post, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { QuotationLookupService } from 'src/kafka/services/QuotationLookupService';
import { KafkaProducerService } from 'src/kafka/services/KafkaProducerService';
import { QuotationResponse } from 'src/quotation/infrastructure/dtos/response/QuotationResponse';
import { QuotationRequest } from 'src/quotation/infrastructure/dtos/request/QuotationRequest';

@Controller('api/v1')
export class EchoController {
  private readonly logger = new Logger(EchoController.name);

  constructor(
    private readonly quotationLookup: QuotationLookupService,
    private readonly kafkaProducer: KafkaProducerService
  ) {}

  /**
   * � ECHO: Busca datos, enriquece y ENVÍA A KAFKA
   * POST /api/v1/echo
   */
  @Post('echo')
  @HttpCode(HttpStatus.OK)
  async echo(@Body() request: QuotationRequest): Promise<QuotationResponse> {
    this.logger.log(`
╔════════════════════════════════════════════════════════╗
║ 📨 ECHO ENDPOINT - REQUEST RECIBIDO                    ║
╠════════════════════════════════════════════════════════╣
║ BranchId: ${request.branchId}
║ ModelId: ${request.modelId}
║ DescriptionId: ${request.descriptionId}
╚════════════════════════════════════════════════════════╝
    `);

    try {
      // 1️⃣ Enriquecer con datos completos de BD
      const enrichedResponse = await this.quotationLookup.buildQuotationResponse(
        request.branchId,
        request.modelId,
        request.descriptionId
      );

      this.logger.log(`
╔════════════════════════════════════════════════════════╗
║ ✅ RESPONSE MAPEADO CONSTRUIDO                         ║
╠════════════════════════════════════════════════════════╣
║ ${JSON.stringify(enrichedResponse, null, 2)}
╚════════════════════════════════════════════════════════╝
      `);

      // 2️⃣ Enviar el response mapeado a Kafka
      await this.kafkaProducer.sendMessage(enrichedResponse);

      this.logger.log(`
╔════════════════════════════════════════════════════════╗
║ 📤 ENVIADO A KAFKA - topic: echo-data-topic            ║
╚════════════════════════════════════════════════════════╝
      `);

      // 3️⃣ Devolver el response al cliente
      return enrichedResponse;
    } catch (error) {
      this.logger.error(`✗ Error en echo: ${error.message}`);
      throw error;
    }
  }
}
