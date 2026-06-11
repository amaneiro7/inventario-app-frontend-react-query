import { DownloadRepository } from '@/entities/shared/domain/repository/DownloadRepository.abstract'

/**
 * @abstract
 * @class EvaluationHardwareDownloadRepository
 * @extends {DownloadRepository}
 * @description Contrato (interfaz abstracta) para un repositorio que permite la descarga de datos de dispositivos.
 * Define el método `download` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class EvaluationHardwareDownloadRepository extends DownloadRepository {}
