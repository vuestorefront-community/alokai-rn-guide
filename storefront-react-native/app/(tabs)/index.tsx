import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { sdk } from '@/sdk/sdk.config';
import ProductCard from '@/components/ProductCard';
import { SfProductCatalogItem } from '@/types/product';

export default function ProductListingPage() {
  const [products, setProducts] = useState<SfProductCatalogItem[] | undefined>(undefined);

  useEffect(() => {
    async function getProducts() {
      const { products } = await sdk.commerce.getProducts({});

      console.log(products);
      console.log('ey')

      setProducts(products);
    }

    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id as string}
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