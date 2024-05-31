import { useContext } from "react";
import { CartContext } from "../providers/CartContextProvider";
import { sdk } from "@/sdk/sdk.config";
import { SfProduct } from "@/types/product";

export default function useCart() {
  const { cart, updateCart } = useContext(CartContext);

  async function addToCart(product: SfProduct, quantity: number = 1) {
    try {
      await sdk.commerce.addCartLineItem({
        cartId: cart.id,
        productId: product.id,
        quantity,
        sku: product.sku,
      })

      const updatedCart = await sdk.commerce.getCart({
        cartId: cart.id
      });

      updateCart(updatedCart)
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  }

  return {
    cart,
    addToCart
  }
}
