import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Stack, Tabs } from 'expo-router';

export default function StackLayout() {

  return (
    <Stack >
      <Stack.Screen
        name='[product_code]/[product_title]/index'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
