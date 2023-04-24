import { IsEnumField } from '../decorators/validation/IsEnumField';
import { IsNumberField } from '../decorators/validation/IsNumberField';
import { IsStringField } from '../decorators/validation/IsStringField';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

/* The BaseDto class defines properties 
and methods for pagination and sorting of data. */
export class BaseDto {
  @IsNumberField({
    required: true,
    max: 100000,
    min: 1,
    description: 'The page of the results you want to return',
  })
  protected page: number;

  @IsNumberField({
    max: 200,
    min: 5,
    required: true,
    description: 'The total number of documents that you want to return',
  })
  protected limit: number;

  @IsStringField({
    required: true,
    message: `Sort key must be a string`,
  })
  protected sort_key: string;

  @IsEnumField(SortOrder, {
    required: true,
    description: `Sort order must be either ASC or DESC`,
  })
  protected sort_order: string;

  protected get take() {
    return this.limit;
  }

  protected get skip() {
    return this.skip * (this.page - 1);
  }

  get filters() {
    return {
      page: this.page,
      limit: this.limit,
      sort: [this.sort_key, this.sort_order === SortOrder.ASC],
    };
  }
}
