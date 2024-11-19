import { Component, inject, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { IAnatomy, IAnatomySection } from '../../models/anatomy.model';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-anatomy-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anatomy-detail.component.html',
  styleUrls: ['./anatomy-detail.component.css']
})
export class AnatomyDetailComponent implements OnInit, AfterViewInit {
  seccionId: number | null = null;
  seccionesAnatomicas: IAnatomySection[] = [];
  selectedSeccion: IAnatomySection | null = null;
  selectedRecurso: IAnatomy | null = null;

  @ViewChild('anatomyModal') anatomyModal!: ElementRef;
  private modalInstance: any;

  loading: boolean = true;
  anatomy: IAnatomy[] = [];

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _apiService = inject(ApiService);

  ngOnInit(): void {
    // Obtener el id de la ruta para cargar los recursos relacionados
    this._route.params.subscribe(params => {
      const id = +params['id'];  // Obtener el id desde la ruta
      if (id) {
        this.seccionId = id;  // Asignar el id a la variable seccionId
        this.loadRecursos(id);  // Cargar los recursos según el id
      } else {
        console.error('No se proporcionó un ID de sección válido');
        alert('No se ha proporcionado un ID de sección válido.');
      }
    });
  }

  ngAfterViewInit() {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      const el = tooltipTriggerEl as HTMLElement;
      new bootstrap.Tooltip(el);
    });
  }

  // Cargar los recursos de la sección según el id
  loadRecursos(seccionId: number) {
    this._apiService.getRecursosBySeccion(seccionId).subscribe((data: IAnatomy[]) => {
      this.anatomy = Array.isArray(data) ? data : [];
      console.log('Recursos cargados:', this.anatomy);
      this.loading = false;
    });
  }

  // Establecer el recurso seleccionado para mostrar detalles en el modal
  setSelectedRecurso(recurso: IAnatomy) {
    this.selectedRecurso = recurso;
    console.log(this.selectedRecurso); // Verifica si tiene el valor esperado
  }

  // Abrir el modal para mostrar el recurso seleccionado
  openModal() {
    this.modalInstance = bootstrap.Modal.getOrCreateInstance(this.anatomyModal.nativeElement);
    this.modalInstance.show();
  }

  // Cerrar el modal
  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
    this.selectedRecurso = null;
  }

  // Manejar el error de la imagen
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/assets/imgs/default.jpg';
  }

  // Iniciar el quiz, pasando el id de la sección
  startQuiz() {
    if (this.seccionId) {
      this._router.navigate(['/quiz', this.seccionId]);  // Navegar al quiz con el id de la sección
    } else {
      console.error('No se ha encontrado un ID de sección');
      alert('No se ha encontrado un ID de sección válido.');
    }
  }
}
