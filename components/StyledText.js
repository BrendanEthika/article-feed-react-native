import React from 'react';
import { Text } from 'react-native';

export function MonoText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
}

export function RaleText(props) {
  return (
      <Text {...props} style={[props.style, { fontFamily: 'Raleway' }]} />
  );
}

export function RaleText700(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'Raleway700' }]} />
  );
}

export function RaleText900(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'Raleway900' }]} />
  );
}