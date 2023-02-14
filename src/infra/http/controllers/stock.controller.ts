import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { CreateStock } from '@app/use-cases/stock/create-stock';
import { CreateStockBody } from '../dtos/create-stock-body';
import { FindStock } from '@app/use-cases/stock/find-stock';
import { StockViewModel } from '../view-models/stock-view-model';
import { FindStocks } from '@app/use-cases/stock/find-stocks';
import { EditStockBody } from '../dtos/edit-stock-body';
import { EditStock } from '@app/use-cases/stock/edit-stock';
import { DeleteStock } from '@app/use-cases/stock/delete-stock';

@Controller('stock')
export class StockController {
  constructor(
    private findStock: FindStock,
    private findStocks: FindStocks,
    private editStock: EditStock,
    private deleteStock: DeleteStock,
    private createStock: CreateStock,
  ) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    const { stock } = await this.findStock.execute({
      stockId: id,
    });

    return StockViewModel.toHTTP(stock);
  }

  @Get()
  async getList() {
    const { stocks } = await this.findStocks.execute();
    return stocks.map(StockViewModel.toHTTP);
  }

  @Post()
  async create(@Body() body: CreateStockBody): Promise<void> {
    await this.createStock.execute(body);
  }

  @Patch(':id')
  async edit(@Body() body: EditStockBody, @Param('id') id: string) {
    const { category, description, name, price, quantity } = body;

    const { stock } = await this.editStock.execute({
      category,
      description,
      name,
      price,
      quantity,
      stockId: id,
    });

    return StockViewModel.toHTTP(stock);
  }

  @Patch('/delete/:id')
  async delete(@Param('id') id: string) {
    const { stock } = await this.deleteStock.execute({
      stockId: id,
    });

    return StockViewModel.toHTTP(stock);
  }
}
