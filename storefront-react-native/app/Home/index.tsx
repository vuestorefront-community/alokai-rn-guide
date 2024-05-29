import { ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { sdk } from '@/sdk.config';
import { Product } from '@vsf-enterprise/sap-commerce-webservices-sdk';
import ProductCard from '@/components/ProductCard';

export default function TabOneScreen() {
  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    async function fetchData() {
      const { products } = await sdk.commerce.searchProduct();

      setProducts(products || []);
    }
    fetchData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {products.map((product) => (
          <ProductCard key={product.code} product={product} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    paddingTop: 8,
  },
});
