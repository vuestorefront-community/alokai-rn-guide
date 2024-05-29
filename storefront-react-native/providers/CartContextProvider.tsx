import { sdk } from "@/sdk.config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cart } from "@vsf-enterprise/sap-commerce-webservices-sdk";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext<{
  cart: Cart;
  updateCart: (cart: Cart) => void;
}>({
  cart: {} as Cart,
  updateCart: () => { },
});

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({} as Cart);

  useEffect(() => {
    async function getCart() {
      let cart = JSON.parse(await AsyncStorage.getItem("cart") as string);

      if (!cart) {
        cart = await sdk.commerce.createCart();

        await AsyncStorage.setItem("cart", JSON.stringify(cart));
      }
      setCart(cart);
    }

    getCart();
  }, []);

  async function updateCart(updatedCart: Cart) {
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  return <CartContext.Provider value={{ cart, updateCart }}>{children}</CartContext.Provider>;
}