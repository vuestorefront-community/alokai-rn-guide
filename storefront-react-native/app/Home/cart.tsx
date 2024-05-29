import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import useCart from '@/hooks/useCart';


export default function TabTwoScreen() {
  const { cart } = useCart();

  if (cart.entries && cart.entries.length === 0) {
    return <Text>No items in cart</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Total {cart.totalItems} items</Text>
      {cart.entries && cart.entries.map((entry) => (
        <View key={entry.product?.code} style={styles.itemContainer}>
          <Text>- {entry.quantity} x {entry.product?.name}</Text>
          <Text>Total: {entry.totalPrice?.formattedValue}</Text>
        </View>
      ))}
      <Text style={styles.heading}>Grand Total: {cart.totalPrice?.formattedValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    marginBottom: 16,
  }
});
