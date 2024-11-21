import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  menuOption: string = 'home'; // Opción activa predeterminada

  onOption(option: string) {
    this.menuOption = option; // Actualiza la opción activa
  }

}
