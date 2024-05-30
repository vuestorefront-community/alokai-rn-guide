import { Text, View } from "@/components/Themed";
import { sdk } from "@/sdk/sdk.config";
import { transformImageUrl } from "@/utils/transformImage";
import { Product } from "@vsf-enterprise/sap-commerce-webservices-sdk";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function ProductDetails() {
  const { product_code } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    async function getProduct() {
      const product = await sdk.sapcc.getProduct({
        id: product_code as string,
      });

      setProduct(product);
    }

    getProduct();
  }, [])

  return (
    <View>
      <Text>Product Details</Text>
      <Carousel
        data={product?.images?.map((image) => transformImageUrl(image.url as string)) ?? []}
        width={300}
        renderItem={({ item }) => (
          <View style={{ width: 300, height: 300 }}>
            <Image source={{ uri: item }} style={{ width: 300, height: 300 }} />
          </View>
        )}
      />
    </View>
  )
}