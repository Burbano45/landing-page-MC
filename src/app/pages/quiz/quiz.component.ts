import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule], // Incluye FormsModule aquí
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex = 0;
  userAnswers: any[] = [];
  score: number = 0;
  showResults: boolean = false;
  quizStarted: boolean = false;
  loading: boolean = false;
  student = { name: '', code: '' }; // Datos del estudiante
  passingScore: number = 0.9; // 90%
  recursoId: number | undefined;
  quizName: string = 'Quiz'; // Declara la propiedad aquí


  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Obtener el recursoId de la URL
    this.route.params.subscribe(params => {
      const recursoId = +params['id'];
      if (recursoId) {
        this.loadQuiz(recursoId);
      }
    });
  }

  // Cargar preguntas del quiz
  loadQuiz(recursoId: number) {
    this.loading = true;
    this.quizService.getQuizQuestions(recursoId).subscribe(data => {
      console.log('Datos recibidos del API:', data);

      this.questions = data;

      if (this.questions.length > 0) {
        // this.quizName = this.questions[0].titulo_seccion || 'Quiz'; // Utiliza titulo_seccion
        this.quizName = this.questions[0]?.quizName || 'Quiz';
        if (typeof this.quizName !== 'string') {
          this.quizName = 'Quiz'; // Valor por defecto si no es un texto válido
        }
      } else {
        this.quizName = 'Quiz'; // Valor predeterminado
      }
      console.log('Datos de la primera pregunta:', this.questions[0]);
      console.log('Valor de titulo_seccion:', this.questions[0]?.titulo_seccion);
      console.log('Nombre del Quiz:', this.quizName);
      this.loading = false;
    });
  }



  // Iniciar el quiz
  startQuiz() {
    this.quizStarted = true;
    localStorage.setItem('student', JSON.stringify(this.student));
  }

  // Enviar respuesta del usuario
  submitAnswer(option: any) {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    this.userAnswers.push({
      questionId: currentQuestion.id,
      answer: option.opcion_text,
      isCorrect: option.es_correcta
    });

    if (option.es_correcta) this.score++;
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.showResults = true;
      this.quizStarted = false;
    }

    // Forzar detección de cambios
    this.cdr.detectChanges();
  }

  // Reiniciar el quiz
  restartQuiz() {
    this.quizStarted = false;
    this.showResults = false;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.student = { name: '', code: '' }; // Reinicia los campos del estudiante
    localStorage.removeItem('student'); // Opcional: Elimina los datos almacenados

  }

  generateCertificate() {
    const student = JSON.parse(localStorage.getItem('student') || '{}');
    const doc = new jsPDF();

    // Fondo decorativo
    doc.setFillColor(230, 240, 255); // Azul claro
    doc.rect(0, 0, 210, 297, 'F'); // Rectángulo que cubre toda la página

    // Bordes decorativos
    doc.setDrawColor(0, 51, 102); // Azul oscuro
    doc.setLineWidth(5);
    doc.rect(10, 10, 190, 277, 'S');

    // Título estilizado
    doc.setFont('times', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(0, 51, 102); // Azul oscuro
    doc.text('Certificado de Finalización', 105, 40, { align: 'center' });

    // Subtítulo con nombre del quiz
    // doc.text(`"${this.questions[0]?.titulo_seccion}"`, 105, 40, { align: 'center' });
    doc.setFont('times', 'italic');
    doc.setFontSize(18);
    doc.setTextColor(0, 102, 204); // Azul más claro
    doc.text(`"${this.questions[0]?.titulo_seccion}"`, 105, 55, { align: 'center' });

    // Mensaje de felicitaciones más estilizado
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Negro
    doc.text(`¡Felicitaciones, ${student.name}!`, 105, 75, { align: 'center' });
    doc.text('Tu dedicación y esfuerzo han dado frutos.', 105, 85, { align: 'center' });
    doc.text(
      'Has aprobado este quiz con excelencia, demostrando tu compromiso',
      105,
      95,
      { align: 'center' }
    );
    doc.text('con el aprendizaje y el conocimiento.', 105, 105, { align: 'center' });

    // Código del estudiante
    doc.setFontSize(14);
    doc.text(`Código de estudiante: ${student.code}`, 105, 125, { align: 'center' });

    // Fecha del certificado
    const today = new Date();
    doc.setFontSize(12);
    doc.text(`Fecha: ${today.toLocaleDateString()}`, 20, 150);

    // Firma estilizada con imagen
    doc.addImage('/assets/imgs/firma.jpg', 'PNG', 80, 175, 50, 25); // Imagen centrada
    doc.setFontSize(14);
    doc.text('_________________________', 105, 200, { align: 'center' });
    doc.text('Profesor: Rosa Angela Macias', 105, 210, { align: 'center' });

    // Logotipo
    doc.addImage('/assets/imgs/logo.png', 'PNG', 20, 10, 40, 40);

    // Descargar el certificado
    doc.save(`${student.name}_certificado.pdf`);
  }


}
