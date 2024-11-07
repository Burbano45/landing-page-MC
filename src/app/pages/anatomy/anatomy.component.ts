import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { IAnatomy, IAnatomySection } from '../../models/anatomy.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anatomy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anatomy.component.html',
  styleUrl: './anatomy.component.css'
})
export class AnatomyComponent implements OnInit {
  

  anatomyList: IAnatomySection[] = []
  private _apiService = inject(ApiService)
  private _router = inject(Router);

  ngOnInit(): void {
    // this._apiService.getRecursos().subscribe((data: IAnatomy[]) =>
    // {
    //   console.log(data);
    //   // this.anatomyList = data;
    // });
    this._apiService.getSeccionesAnatomicas().subscribe((data: IAnatomySection[]) =>
      {
        console.log(data);
         this.anatomyList = data;
      });
  }

  navegate(id: number): void{
    this._router.navigate(['/anatomys', id]);
  }

}
