import { Text, View } from "@/components/Themed";
import { sdk } from "@/sdk/sdk.config";
import { transformImageUrl } from "@/utils/transformImage";
import { Product } from "@vsf-enterprise/sap-commerce-webservices-sdk";
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function ProductScreen() {
  const { product_code } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const width = Dimensions.get("window").width;

  useEffect(() => {
    async function fetchProduct() {
      const data = await sdk.sapcc.getProduct({ id: product_code as string });

      setProduct(data);
    }

    fetchProduct();
  }, []);

  if (!product) {
    return <Text>Loading...</Text>;
  }

  const galleryImages = product?.images?.filter((image) => image.imageType === "GALLERY" && image.format === "product")
    .map((image) => transformImageUrl(image.url as string)) as [] | string[];

  return (
    <ScrollView style={styles.page}>
      <View style={{
        ...styles.container,
      }}>
        <View>
          <Carousel
            loop
            pagingEnabled
            snapEnabled
            style={styles.imageContainer}
            width={width * 0.95}
            height={width * 0.8}
            data={galleryImages}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width: width * 0.95, height: width * 0.8 }}
              />
            )}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textBold}>{product.name}</Text>
          <Text style={styles.textBold}>{product.price?.formattedValue}</Text>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>{product?.summary}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
    marginTop: 20,
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 18,
  },
  summaryContainer: {
    marginTop: 16,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 20,
    color: "#666",
  },
})