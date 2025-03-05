import { Category } from './category.enum';
import { Classification } from './classification.enum';

export interface Technology {
  id: string;
  name?: string;
  description?: string;
  category?: Category;
  classification?: Classification;
  classificationDescription?: string;
  changedAt?: Date;
  createdAt: Date;
  publishedAt?: Date;
}
