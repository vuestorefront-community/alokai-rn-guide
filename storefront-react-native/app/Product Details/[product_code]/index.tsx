import { Text, View } from "@/components/Themed";
import useCart from "@/hooks/useCart";
import { sdk } from "@/sdk/sdk.config";
import { SfProduct } from "@/types/product";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react";
import { Alert, Dimensions, Image, Pressable, ScrollView, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function ProductScreen() {
  const { product_code } = useLocalSearchParams();
  const [product, setProduct] = useState<SfProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const width = Dimensions.get("window").width;
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const { product } = await sdk.commerce.getProductDetails({ id: product_code as string });

      setProduct(product);
    }

    fetchProduct();
  }, []);

  if (!product) {
    return <Text>Loading...</Text>;
  }

  const addToCartFunction = async () => {
    setLoading(true);
    await addToCart(product);
    setLoading(false);
    Alert.alert("Product added to cart");
  }

  return (
    <ScrollView style={styles.page}>
      <View style={{
        ...styles.container,
        backgroundColor: loading ? '#e5e5e5' : '#fff',
      }}>
        <View>
          <Carousel
            loop
            pagingEnabled
            snapEnabled
            style={styles.imageContainer}
            width={width * 0.95}
            height={width * 0.8}
            data={product.gallery}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.url }}
                style={{ width: width * 0.95, height: width * 0.8 }}
              />
            )}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textBold}>{product.name}</Text>
          <Text style={styles.textBold}>{product.price?.value.amount}</Text>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>{product?.description}</Text>
        </View>
        <Pressable style={{
          ...styles.addToCartButton,
          backgroundColor: loading ? '#a5a5a5' : '#0d7f3f',
        }} onPress={addToCartFunction}>
          {loading ? <FontAwesome name="spinner" size={24} color="#fff" /> : <FontAwesome name="cart-plus" size={24} color="#fff" />}
          <Text style={styles.addToCartButtonText}>{loading ? 'Adding to cart...' : 'Add to cart'}</Text>
        </Pressable>
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
  addToCartButton: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#0d7f3f',
    padding: 12,
    borderRadius: 12,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})