// models/question.model.ts
export interface Question {
    id: number;
    pregunta: string;
    descripcion?: string;
    options: Option[];
  }
  
  // models/option.model.ts
  export interface Option {
    opcion_text: string;
    opcion_url?: string;
    es_correcta: boolean;
  }
  
  // models/answer.model.ts
  export interface Answer {
    quizId: number;
    answer: string;
  }

  export interface Question {
    id: number;
    pregunta: string;
    respuesta_correcta: string;
    tipo_pregunta: string;
    recurso_id: number;
    titulo_seccion?: string; // Agrega esta propiedad
  }
  