export const KAFKA_CONFIG = {
  clientId: 'cotiza360-client',
  brokers: ['kafka:29092'], // Usar el nombre del servicio y el puerto interno
  
  // Request-Reply Pattern Topics
  requestTopic: 'quotations-request',      // Producer -> Consumer
  responseTopic: 'quotations-response',    // Consumer -> Producer
  requestGroupId: 'quotations-request-group',
  responseGroupId: 'quotations-response-group',
  
  // Legacy (mantenemos para compatibilidad)
  topic: 'echo-data-topic',
  groupId: 'echo-consumer-group',
};
