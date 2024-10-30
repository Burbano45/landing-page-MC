import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { IAnatomy } from '../../models/anatomy.model';

@Component({
  selector: 'app-anatomy-detail',
  standalone: true,
  imports: [],
  templateUrl: './anatomy-detail.component.html',
  styleUrl: './anatomy-detail.component.css'
})
export class AnatomyDetailComponent implements OnInit {

  loading: boolean = true;
  public anatomy?: IAnatomy;

  private _route = inject(ActivatedRoute);
  private _apiService = inject(ApiService);

  // ngOnInit(): void {
  //     this._route.params.subscribe(params => {
  //       this._apiService.getRecurso(params['id']).subscribe((data: IAnatomy) => {
  //         console.log(data);
  //         this.anatomy = data;
  //         this.loading = false;
  //       });
  //     })
  // }
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      const id = +params['id']; // Asegura que el id sea numérico
      this._apiService.getRecurso(id).subscribe((data: IAnatomy) => {
        console.log(data);
        this.anatomy = data;
        this.loading = false;
      });
    });
  }

}
