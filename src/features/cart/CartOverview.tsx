import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {

  const totalCartQuantity: number = useSelector(getTotalCartQuantity);
  const totalCartPrice: number = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 flex items-center justify-between transition-transform transform translate-y-full duration-300 ease-in-out animate-slide-up">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-4">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
