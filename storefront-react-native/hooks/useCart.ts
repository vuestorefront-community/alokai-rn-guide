import { useContext } from "react";
import { CartContext } from "../providers/CartContextProvider";
import { Product } from "@vsf-enterprise/sap-commerce-webservices-sdk";
import { sdk } from "@/sdk.config";

export default function useCart() {
  const { cart, updateCart } = useContext(CartContext);

  async function addToCart(product: Product, quantity: number = 1) {
    try {
      await sdk.commerce.addCartEntry({
        cartId: cart.guid as string,
        entry: {
          quantity: quantity,
          product: {
            code: product.code as string,
          },
        }
      })

      const updatedCart = await sdk.commerce.getCart({
        cartId: cart.guid as string
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
