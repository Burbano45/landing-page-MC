import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { IAnatomy } from '../../models/anatomy.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anatomy',
  standalone: true,
  imports: [],
  templateUrl: './anatomy.component.html',
  styleUrl: './anatomy.component.css'
})
export class AnatomyComponent implements OnInit {
  

  anatomyList: IAnatomy[] = []
  private _apiService = inject(ApiService)
  private _router = inject(Router);

  ngOnInit(): void {
    this._apiService.getRecursos().subscribe((data: IAnatomy[]) =>
    {
      console.log(data);
      this.anatomyList = data;
    });
  }

  navegate(id: number): void{
    this._router.navigate(['/anatomys', id]);
  }

}
