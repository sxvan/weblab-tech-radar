import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {
  BehaviorSubject,
  map,
  Observable,
  shareReplay,
  Subject,
  switchMap,
} from 'rxjs';
import { CreateTechnologyInput } from '../types/create-technology.type';
import { Technology } from '../types/technology';
import { UpdateTechnologyInput } from '../types/update-technology.type';

@Injectable({
  providedIn: 'root',
})
export class GraphQlService {
  constructor(private apollo: Apollo) {}

  login(email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation login($data: LoginInputWithDecorators!) {
          login(data: $data)
        }
      `,
      variables: {
        data: { email, password },
      },
    });
  }

  createTechnology(input: CreateTechnologyInput) {
    return this.apollo.mutate({
      mutation: gql`
        mutation create($data: CreateTechnologyInputWithDecorators!) {
          createTechnology(data: $data) {
            id
            name
            description
            publishedAt
            createdAt
            category
            changedAt
          }
        }
      `,
      variables: {
        data: {
          name: input.name,
          description: input.description,
          category: input.category,
          classification: input.classification,
          classificationDescription: input.classificationDescription,
        },
      },
    });
  }

  getPublishedTechnologies() {
    return this.apollo
      .query<{ technologies: Technology[] }>({
        query: gql`
          query all {
            technologies(onlyPublished: true) {
              id
              name
              description
              category
              classification
              classificationDescription
              changedAt
              createdAt
              publishedAt
            }
          }
        `,
      })
      .pipe(
        map((result) => result.data.technologies),
        shareReplay(1)
      );
  }

  getTechnologies() {
    return this.apollo
      .query<{ technologies: Technology[] }>({
        query: gql`
          query all {
            technologies(onlyPublished: false) {
              id
              name
              description
              category
              classification
              classificationDescription
              changedAt
              createdAt
              publishedAt
            }
          }
        `,
      })
      .pipe(map((result) => result.data.technologies));
  }

  publishTechnology(id: string) {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation publish($publishTechnologyId: ID!) {
            publishTechnology(id: $publishTechnologyId) {
              id
            }
          }
        `,
        variables: {
          publishTechnologyId: id,
        },
      })
      .pipe(map(() => this.refetchTechnologies()));
  }

  refetchTechnologies() {
    this.apollo.client.reFetchObservableQueries(true);
  }

  getTechnology(id: string) {
    return this.apollo
      .query<{ technology: Technology }>({
        query: gql`
          query get($technologyId: String!) {
            technology(id: $technologyId) {
              id
              name
              description
              category
              classification
              classificationDescription
              changedAt
              createdAt
              publishedAt
            }
          }
        `,
        variables: {
          technologyId: id,
        },
      })
      .pipe(map((result) => result.data.technology));
  }

  updateTechnology(id: string, input: UpdateTechnologyInput) {
    return this.apollo.mutate({
      mutation: gql`
        mutation update(
          $data: UpdateTechnologyInputWithDecorators!
          $updateTechnologyId: ID!
        ) {
          updateTechnology(data: $data, id: $updateTechnologyId) {
            id
            name
          }
        }
      `,
      variables: {
        data: {
          name: input.name,
          description: input.description,
          category: input.category,
        },
        updateTechnologyId: id,
      },
    });
  }
}
