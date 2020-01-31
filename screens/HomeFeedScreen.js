import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeFeedList from '../components/home-feed-list';

export default class HomeFeedScreen extends React.Component {
  render() {
    return (
    <SafeAreaView style={styles.container}>
      <HomeFeedList navigation={this.props.navigation} />
    </SafeAreaView>
    );
  };
}

HomeFeedScreen.navigationOptions = {
  title: 'Home-Feed List',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
