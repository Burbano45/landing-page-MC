import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AnatomyComponent } from './pages/anatomy/anatomy.component';
import { AnatomyDetailComponent } from './pages/anatomy-detail/anatomy-detail.component';
import { QuizComponent } from './pages/quiz/quiz.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'anatomy', component: AnatomyComponent},
    { path: 'anatomy/:id', component: AnatomyDetailComponent},
    { path: 'anatomys/:id', component: AnatomyDetailComponent},
    { path: 'quiz', component: QuizComponent},
    { path: 'quiz/:id', component: QuizComponent },  // Asegúrate de que esta ruta esté configurada
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
