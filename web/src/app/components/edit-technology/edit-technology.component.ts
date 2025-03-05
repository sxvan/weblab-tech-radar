import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { GraphQlService } from '../../services/graphql.service';
import { CommonModule } from '@angular/common';
import { Categories } from '../../types/category.enum';

@Component({
  selector: 'app-edit-technology',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-technology.component.html',
  styleUrl: './edit-technology.component.scss',
})
export class EditTechnologyComponent {
  technologyId: string | null = null;
  updateTechnologyForm!: FormGroup;
  categories = Categories;

  constructor(
    private route: ActivatedRoute,
    private graphqlService: GraphQlService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.technologyId = params.get('id');
    });

    this.updateTechnologyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.graphqlService
      .getTechnology(this.technologyId!)
      .pipe(
        tap((technology) => {
          this.updateTechnologyForm.patchValue({
            name: technology.name,
            description: technology.description,
            category: technology.category,
          });
        })
      )
      .subscribe();
  }

  updateTechnology() {
    this.graphqlService
      .updateTechnology(this.technologyId!, this.updateTechnologyForm.value)
      .pipe(tap(() => alert('Successfully updated technology')))
      .subscribe();
  }
}
