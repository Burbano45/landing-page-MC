import { Component } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-certificado',
  template: `
    <div class="text-center mt-5">
      <button (click)="generateCertificate()" class="btn btn-success">Descargar Certificado</button>
    </div>
  `,
  styles: [`
    .btn {
      font-size: 18px;
      padding: 10px 20px;
      border-radius: 5px;
    }
  `]
})
export class CertificadoComponent {
  generateCertificate() {
    const doc = new jsPDF();

    // Título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('Certificado de Finalización', 105, 30, { align: 'center' });

    // Mensaje
    const student = JSON.parse(localStorage.getItem('student') || '{}');
    const section = localStorage.getItem('section') || 'N/A';

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text(`Felicitaciones, ${student.name || 'Estudiante'}!`, 105, 50, { align: 'center' });
    doc.text(`Has aprobado el quiz de Anatomía - ${section}.`, 105, 65, { align: 'center' });

    // Firma del Profesor
    doc.setFontSize(14);
    doc.text('_________________________', 105, 120, { align: 'center' });
    doc.text('Profesor: Dr. Juan Pérez', 105, 130, { align: 'center' });

    // Fecha
    const today = new Date();
    doc.setFontSize(12);
    doc.text(`Fecha: ${today.toLocaleDateString()}`, 20, 150);

    // Logotipo (opcional)
     doc.addImage('/assets/imgs/logo.png', 'PNG', 20, 10, 40, 40);

    // Descarga el archivo PDF
    doc.save('certificado.pdf');
  }
}
