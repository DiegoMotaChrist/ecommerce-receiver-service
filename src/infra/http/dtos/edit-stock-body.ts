import { Length, IsOptional } from 'class-validator';

export class EditStockBody {
  @Length(5, 100)
  @IsOptional()
  name: string;

  @Length(5, 100)
  @IsOptional()
  description: string;

  @Length(5, 100)
  @IsOptional()
  category: string;

  @IsOptional()
  price: number;

  @IsOptional()
  @Length(1, 5)
  quantity: number;
}
