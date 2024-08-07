export type MenuItem = {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};

export type MenuData = {
  status: string;
  data: MenuItem[];
};

export type Order = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: Cart[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
  status: string;
};

export type Cart = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type NewOrder = {
  customer: string;
  phone: string;
  address: string;
  priority: boolean | string;
  cart: string;
}

export type UserState = {
  username: string;
  position?: Coordinates;
  address?: string;
  status?: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}

export type RootState = {
  user: UserState;
}

export type Coordinates = {
  latitude: number;
  longitude: number;
}