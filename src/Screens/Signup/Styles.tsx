import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
      avoidingContainer: {
        flex: 1,
    },
        signupContainer: {
            margin: moderateScale(10),
            flex: 1,
            justifyContent: 'center',
            gap: moderateScale(60),
            flexGrow: 1,
    
        },
        bodyContainer: {
            gap: moderateScale(30),
        },
        footerContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }
});
export default styles;