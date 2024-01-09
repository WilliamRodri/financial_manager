import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AlertModalProps {
  statusModal: any;
  modalTextAlert: string;
  textButtonOne: string;
  textButtonTwo?: string;
  clickButtonTwo: any;
  clickButtonOne: () => void;
}

function AlertModal(props: AlertModalProps) {
  const [ isModalVisible, setModalVisible ] = useState(props.statusModal);

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTextAlert}>{props.modalTextAlert}</Text>

          <View style={styles.boxButtonsAlert}>
            <TouchableOpacity
                style={styles.buttonAlertBox}
                onPress={props.clickButtonOne}
            >
              <Text style={styles.textAlertBox}>{props.textButtonOne}</Text>
            </TouchableOpacity>

            {props.textButtonTwo == '' ? null : <TouchableOpacity
                style={styles.buttonAlertBoxCancel}
                onPress={() => setModalVisible(props.clickButtonTwo)}
            >
              <Text style={styles.textAlertBoxCancel}>{props.textButtonTwo}</Text>
            </TouchableOpacity>}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: '#232265',
    padding: 20,
    borderRadius: 13,
    width: '80%',
  },
  modalTextAlert: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  boxButtonsAlert: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonAlertBox: {
    padding: 10,
    width: '45%',
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAlertBoxCancel: {
    padding: 10,
    width: '45%',
    borderRadius: 5,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAlertBox: {
    color: '#090937',
    fontSize: 16,
  },
  textAlertBoxCancel: {
    color: 'white',
    fontSize: 15,
  },
});

export default AlertModal;