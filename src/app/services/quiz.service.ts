import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Importa tap
import { Question, Answer } from '../models/quizz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseUrl = 'http://localhost:8080'; // Cambiar a la URL de producción si es necesario

  constructor(private http: HttpClient) { }

  // getQuizQuestions(recursoId: number): Observable<Question[]> {
  //   return this.http.get<Question[]>(`${this.baseUrl}/get_quiz_questions.php?recurso_id=${recursoId}`).pipe(
  //     tap((data: Question[]) => console.log("Preguntas recibidas:", data)) // Define el tipo de data
  //   );
  // }
  getQuizQuestions(recursoId: number): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/get_quiz_questions.php?recurso_id=${recursoId}`).pipe(
      tap((data: Question[]) => console.log("Preguntas recibidas:", data))
    );
  }

  submitAnswer(quizId: number, userId: number, answer: Answer): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit_answer.php`, { quizId, userId, answer });
  }

  getQuizResults(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_quiz_results.php?user_id=${userId}`);
  }
}
