import { Replace } from '../../../helpers/Replace';
import { randomUUID } from 'node:crypto';

export interface OrderProps {
  id?: string;
  stockIds: string[];
  name: string;
  description: string;
  price: number;
  category: string;
  isCanceled?: boolean | undefined;
  reason?: string | null | undefined;
  canceledAt?: Date | null;
  updatedAt?: Date | null;
  createdAt: Date;
}

export class Order {
  private _id: string;
  private props: OrderProps;

  constructor(props: Replace<OrderProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get stockIds(): string[] {
    return this.props.stockIds;
  }

  public set stockIds(stockIds: string[]) {
    this.props.stockIds = stockIds;
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

  public cancel(reason: string) {
    this.props.canceledAt = new Date();
    this.props.updatedAt = new Date();
    this.props.isCanceled = true;
    this.props.reason = reason;
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public update() {
    this.props.updatedAt = new Date();
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  public get isCanceled(): boolean | undefined {
    return this.props.isCanceled;
  }

  public get reason(): string | null | undefined {
    return this.props.reason;
  }
}
