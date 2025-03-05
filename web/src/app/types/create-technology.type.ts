import { Category } from './category.enum';
import { Classification } from './classification.enum';

export interface CreateTechnologyInput {
  name: string;

  description: string;

  category: Category;

  classification?: Classification;

  classificationDescription?: string;
}
