import { IsNotEmpty, Length } from 'class-validator';

export class CreateStockBody {
  @IsNotEmpty()
  @Length(5, 100)
  name: string;

  @IsNotEmpty()
  @Length(5, 100)
  description: string;

  @IsNotEmpty()
  @Length(5, 100)
  category: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;
}
