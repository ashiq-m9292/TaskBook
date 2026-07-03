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
    }
})

export default styles;