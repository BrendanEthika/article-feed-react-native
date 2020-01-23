import React from 'react';
import { Text } from 'react-native';

export function MonoText(props) {
  return (
    {/*<Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />*/},
    <Text {...props} style={[props.style, { fontFamily: 'Raleway' }]} />
  );
}
