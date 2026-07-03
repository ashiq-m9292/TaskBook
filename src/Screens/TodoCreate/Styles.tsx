import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        marginHorizontal: moderateScale(10),
        marginTop: moderateScale(40),
        gap: moderateScale(40),
    },
    dateTimePickerContainer: {
        gap: moderateScale(10),
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: moderateScale(20),
    }
})

export default styles;