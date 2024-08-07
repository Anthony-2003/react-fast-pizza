import { getMenu } from "../services/apiRestaurant";
import type { MenuItem } from "../types/MenuItem";

export async function loader(): Promise<MenuItem[]> {
  const menu = await getMenu();
  return menu;
}
