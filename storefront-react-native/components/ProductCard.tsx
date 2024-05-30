import { Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Product } from "@vsf-enterprise/sap-commerce-webservices-sdk";
import { transformImageUrl } from "@/utils/transformImage";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <Link href={{
      pathname: "Product Details/[product_code]",
      params: { product_code: product.code },
    }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: transformImageUrl(product.firstVariantImage!) }} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>{product.price?.formattedValue}</Text>
          <Pressable style={styles.addToCartButton}>
            <FontAwesome name="cart-plus" size={24} color="#fff" />
            <Text style={styles.addToCartButtonText}>Add to cart</Text>
          </Pressable>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 380,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#eceff1',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: '100%',
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    borderWidth: 1,
    borderColor: '#eceff1',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopWidth: 0,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'semibold',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addToCartButton: {
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
});