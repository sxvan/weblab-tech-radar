import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GraphQlService } from '../../services/graphql.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Technology } from '../../types/technology';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Categories } from '../../types/category.enum';
import { Classifications } from '../../types/classification.enum';

@Component({
  selector: 'app-technology',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss',
})
export class TechnologyComponent implements OnInit {
  createTechnologyForm!: FormGroup;
  technologies$?: Observable<Technology[]>;
  categories = Categories;
  classifications = Classifications;

  constructor(
    private graphqlService: GraphQlService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.technologies$ = this.graphqlService
      .getTechnologies()
      .pipe(
        map((technologies) =>
          [...technologies].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        )
      );
  }

  ngOnInit(): void {
    this.createTechnologyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      classification: [''],
      classificationDescription: [''],
    });
  }

  createTechnology() {
    if (!this.createTechnologyForm.valid) {
      return;
    }

    console.log(this.createTechnologyForm.value);

    this.graphqlService
      .createTechnology(this.createTechnologyForm.value)
      .pipe(map(() => window.location.reload()))
      .subscribe();
  }

  publishTechnology(id: string) {
    this.graphqlService
      .publishTechnology(id)
      .pipe(map(() => window.location.reload()))
      .subscribe();
  }

  editTechnology(id: string) {
    this.router.navigate(['edit-technology', id]);
  }
}
