import { Component } from '@angular/core';
import { GraphQlService } from '../../services/graphql.service';
import { Technology } from '../../types/technology';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview',
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  technologies$?: Observable<Technology[]>;

  constructor(private graphqlService: GraphQlService) {
    this.technologies$ = this.graphqlService.getPublishedTechnologies().pipe(
      map((technologies) => {
        return [...technologies].sort((a, b) => {
          if (!a.category && !b.category) return 0;
          if (!a.category) return 1;
          if (!b.category) return -1;

          if (a.category < b.category) return -1;
          if (a.category > b.category) return 1;

          if (!a.classification && !b.classification) return 0;
          if (!a.classification) return 1;
          if (!b.classification) return -1;

          if (a.classification < b.classification) return -1;
          if (a.classification > b.classification) return 1;

          return 0;
        });
      })
    );
  }
}
