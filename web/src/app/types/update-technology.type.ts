import { Category } from './category.enum';
import { Classification } from './classification.enum';

export interface UpdateTechnologyInput {
  name?: string;

  description?: string;

  category?: Category;

  classification?: Classification;

  classificationDescription?: string;
}
