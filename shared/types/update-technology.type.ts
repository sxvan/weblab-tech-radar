import { Category } from '../enums/category.enum';
import { Classification } from '../enums/classification.enum';

export interface UpdateTechnologyInput {
    name?: string;

    description?: string;

    category?: Category;

    classification?: Classification;

    classificationDescription?: string;
}
