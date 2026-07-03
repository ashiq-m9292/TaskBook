import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    bodyContainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    avatarContainer: {
        alignItems: 'center',
        gap: moderateScale(10)
    },
    infoContainer: {
        gap: moderateScale(14),
        padding: moderateScale(10),

    }
});
export default styles;