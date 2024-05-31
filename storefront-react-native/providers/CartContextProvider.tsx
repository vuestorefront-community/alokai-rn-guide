import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { sdk } from "@/sdk/sdk.config";
import { SfCart } from "@vsf-enterprise/unified-api-sapcc";

export const CartContext = createContext<{
  cart: SfCart;
  updateCart: (cart: SfCart) => void;
}>({
  cart: {} as SfCart,
  updateCart: () => { },
});

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<SfCart>({} as SfCart);

  useEffect(() => {
    async function getCart() {
      let cart = JSON.parse(await AsyncStorage.getItem("cart") as string);

      if (!cart) {
        cart = await sdk.commerce.getCart({});

        await AsyncStorage.setItem("cart", JSON.stringify(cart));
      }
      setCart(cart);
    }

    getCart();
  }, []);

  async function updateCart(updatedCart: SfCart) {
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  return <CartContext.Provider value={{ cart, updateCart }}>{children}</CartContext.Provider>;
}