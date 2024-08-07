
import { useLoaderData } from "react-router";
import MenuItem from "./MenuItem";
import {MenuItem as typeItem} from "../../types/MenuItem";


function Menu() {
  const menu = useLoaderData() as typeItem[];

  return <ul className="divide-y divide-stone-200 px-2">
      {
        menu.map(pizza => <MenuItem key={pizza.id} pizza={pizza} />)
      }
  </ul>
}   

export default Menu;
