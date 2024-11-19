import { Component, OnInit } from '@angular/core';
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

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {}

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
      this.questions = data;
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
  }

  // Reiniciar el quiz
  restartQuiz() {
    this.quizStarted = false;
    this.showResults = false;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = [];
  }

  generateCertificate() {
    const student = JSON.parse(localStorage.getItem('student') || '{}');
    const doc = new jsPDF();

    // Título
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('Certificado de Finalización', 105, 30, { align: 'center' });

    // Mensaje
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text(`Felicitaciones, ${student.name}!`, 105, 50, { align: 'center' });
    doc.text(`Has aprobado el quiz con éxito.`, 105, 65, { align: 'center' });
    doc.text(`Código de estudiante: ${student.code}`, 105, 80, { align: 'center' });

    // Firma
    doc.setFontSize(14);
    doc.text('_________________________', 105, 120, { align: 'center' });
    doc.text('Profesor: Rosa Angela Macias', 105, 130, { align: 'center' });

    // Fecha
    const today = new Date();
    doc.setFontSize(12);
    doc.text(`Fecha: ${today.toLocaleDateString()}`, 20, 150);

    // Logotipo opcional
    // doc.addImage('/assets/logo.png', 'PNG', 20, 10, 40, 40);

    // Descarga del certificado
    doc.save('certificado.pdf');
  }
}
