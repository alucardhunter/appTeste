import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator, Text} from 'react-native';
import Colors from '#/Utils/Colors';

const Loader = props => {
  const {loading} = props;

  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Text>Carregando...</Text>
          <ActivityIndicator color={Colors.loader} animating={loading} size="large" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#ffffff',
    height: 150,
    width: 200,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
