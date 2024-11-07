export interface IAnatomy {
    id:             number;
    titulo:         string;
    descripcion:    string;
    tipo_recurso: 'texto' | 'video' | 'imagen';
    url:            string;
    archivo:        string;
    tipo_archivo:   string;
    fecha_creacion: Date;
}

export interface IAnatomySection {
    id: number;
    recurso_id: number;
    titulo: string;
    descripcion: string;
    imagen_url: string;
    fecha_creacion: Date;
  }
