import {ToastAndroid, Alert, Platform} from 'react-native';

export default (message = '', desc = '') => {
    if (Platform.OS == 'android') {
        ToastAndroid.showWithGravity(`${message}\n${desc}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    } else {
        Alert.alert(message, desc, [{text: 'ok'}], {cancelable: true});
    }
};
