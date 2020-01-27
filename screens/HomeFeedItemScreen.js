import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

export default class HomeFeedItemScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const homeFeedID = navigation.getParam('id', 'NO-ID');
    const homeFeedItem = navigation.getParam('homeFeed', {
      title: ''
    });

    return (
      <SafeAreaView style={styles.container}>
        <Text>Details Screen</Text>
        <Text>
          id: {homeFeedID}
        </Text>
        <Text>
          homeFeed:{JSON.stringify(homeFeedItem)}
        </Text>
        <Text>
          title:{homeFeedItem.title}
        </Text>
      </SafeAreaView>
    );
  }
}

HomeFeedItemScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam('homeFeed', 'HomeFeedItem'),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
