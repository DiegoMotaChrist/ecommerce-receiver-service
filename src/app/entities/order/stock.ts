import { Replace } from '../../../helpers/Replace';
import { randomUUID } from 'node:crypto';

export interface StockProps {
  id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  isDeleted?: boolean | undefined;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
  createdAt: Date;
}

export interface StockInformation {
  stockId: string;
  quantity: number;
}

export class Stock {
  private _id: string;
  private props: StockProps;

  constructor(props: Replace<StockProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public get price(): number {
    return this.props.price;
  }

  public get quantity(): number {
    return this.props.quantity;
  }

  public set quantity(quantity: number) {
    this.props.quantity = quantity;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public update() {
    this.props.updatedAt = new Date();
  }

  public delete() {
    this.props.deletedAt = new Date();
    this.props.isDeleted = true;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  public get deletedAt(): Date | null | undefined {
    return this.props.deletedAt;
  }

  public get isDeleted(): boolean | undefined {
    return this.props.isDeleted;
  }
}
