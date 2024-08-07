import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { ActionFunctionArgs } from "react-router-dom"; // Importa los tipos de react-router-dom
import { NewOrder, Order, RootState } from "../../types/MenuItem";
import { createOrder } from "../../services/apiRestaurant";
import { formatCurrency, isValidPhone } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store, { AppDispatch } from "../../store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAddress } from "../user/userSlice";

interface Errors {
  [key: string]: string;
}

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state: RootState) => state.user);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData() as unknown as Errors;
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice: number = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch<AppDispatch>();

  const isLoadingAdress = addressStatus === "loading";

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAdress}
              defaultValue={address}
              required
            />
            {addressStatus === "failed" && (
              <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>

          {!position?.latitude && !position?.longitude && (
            <span className=",md:right-[5px] absolute right-[6px] top-[5px] z-50 md:top-[5px]">
              <Button
                disable={isLoadingAdress}
                type="small"
                onClick={(
                  e:
                    | React.MouseEvent<HTMLButtonElement, MouseEvent>
                    | undefined,
                ) => {
                  if (e) {
                    e.preventDefault();
                  }

                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position?.longitude && position.latitude
                ? `${position?.latitude}, ${position?.longitude}`
                : ""
            }
          />
          <Button type="primary" disable={isSubmitting || isLoadingAdress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const data: NewOrder = {
    customer: formData.get("customer") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
    priority: formData.get("priority") === "on",
    cart: formData.get("cart") as string,
  };

  let parsedCart;
  try {
    parsedCart = JSON.parse(data.cart);
  } catch (e) {
    parsedCart = [];
  }

  const order: NewOrder = {
    ...data,
    cart: parsedCart,
  };

  const newOrder = (await createOrder(order)) as unknown as Order;

  store.dispatch(clearCart());

  const errors: Errors = {};

  if (!isValidPhone(order.phone))
    errors.phone = "Please give us your correct phone number";

  if (Object.keys(errors).length > 0) return errors;

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
