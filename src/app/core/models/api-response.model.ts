// src/app/core/models/api-response.model.ts

/**
 * Modelo genérico para respuestas de API.
 */
export interface ApiResponse<T> {
  data: T;             // Datos de la respuesta para peticiones exitosas
  success: boolean;    // Indica si la petición fue exitosa
  error?: ApiError;    // Información del error (opcional, en caso de error)
  meta?: any;          // Metadatos adicionales (opcional, para paginación, etc.)
}

/**
 * Modelo para información de error de la API.
 */
export interface ApiError {
  code: number;        // Código de error de la API o HTTP
  message: string;     // Mensaje de error
  details?: string;    // Detalles adicionales del error (opcional)
}
