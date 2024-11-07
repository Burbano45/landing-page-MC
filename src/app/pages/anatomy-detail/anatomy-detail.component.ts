import { Component, inject, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  seccionesAnatomicas: IAnatomySection[] = [];
  selectedSeccion: IAnatomySection | null = null; // Sección anatómica seleccionada
  selectedRecurso: IAnatomy | null = null;  // Recurso específico seleccionado
  @ViewChild('anatomyModal') anatomyModal!: ElementRef;
  private modalInstance: any;

  loading: boolean = true;
  anatomy: IAnatomy[] = []; // Arreglo para los recursos de la sección

  private _route = inject(ActivatedRoute);
  private _apiService = inject(ApiService);

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const id = params['id'];
      this.loadRecursos(id);  // Cargar los recursos de la sección específica
    });
  }

  ngAfterViewInit() {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      const el = tooltipTriggerEl as HTMLElement;
      new bootstrap.Tooltip(el);
    });
  }

  // Método para cargar los recursos de la sección específica
  loadRecursos(seccionId: number) {
    this._apiService.getRecursosBySeccion(seccionId).subscribe((data: IAnatomy[]) => {
      this.anatomy = Array.isArray(data) ? data : [];  // Asegura que anatomy sea un arreglo
      this.loading = false;
    });
  }

  openModal(recurso: IAnatomy) {
    this.selectedRecurso = recurso;  // Almacena el recurso seleccionado
    this.modalInstance = bootstrap.Modal.getOrCreateInstance(this.anatomyModal.nativeElement);
    this.modalInstance.show();
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
    this.selectedRecurso = null;
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/assets/imgs/default.jpg'; // Ruta a la imagen predeterminada
  }
  
}
