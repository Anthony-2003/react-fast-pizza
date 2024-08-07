import { MenuItem, NewOrder, Order } from "../types/MenuItem";

const API_URL = 'https://react-fast-pizza-api.onrender.com/api';



interface UpdateOrder {
  status?: string;
  // Add other properties as needed
}

// Function to get the menu
export async function getMenu(): Promise<MenuItem[]> {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw Error('Failed getting menu');

  const { data } = await res.json();
  return data;
}

// Function to get an order by ID
export async function getOrder(id: number): Promise<Order> {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}

// Function to create a new order
export async function createOrder(newOrder: NewOrder): Promise<Order> {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error('Failed creating your order');
    const { data } = await res.json();
    return data;
  } catch(e) {
    throw Error(`Failed creating your order ${e}`);
  }
}

// Function to update an order by ID
export async function updateOrder(id: number, updateObj: UpdateOrder): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error('Failed updating your order');
  } catch {
    throw Error('Failed updating your order');
  }
}
