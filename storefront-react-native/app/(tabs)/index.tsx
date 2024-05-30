import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { sdk } from '@/sdk/sdk.config';
import { Product } from '@vsf-enterprise/sap-commerce-webservices-sdk';
import ProductCard from '@/components/ProductCard';

export default function ProductListingPage() {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  useEffect(() => {
    async function getProducts() {
      const { products } = await sdk.sapcc.searchProduct({});

      setProducts(products);
    }

    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.code as string}
        renderItem={({ item }) => (
          <ProductCard product={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});