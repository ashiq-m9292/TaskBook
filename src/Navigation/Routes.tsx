import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { useDispatch, useSelector } from 'react-redux';
import { loadToken } from '../Redux/Action/UserAction';
import { Splash } from '../Screens/Screens';
import NetInfo from '@react-native-community/netinfo';
import { TextCenter } from '../Components/Components';
import { navigationRef } from './NavigationRefContainer';

const Routes = () => {
    const { loading, token } = useSelector((state: any) => state.USER);
    const dispatch = useDispatch<any>();
    const [isConnection, setIsConnection] = React.useState<boolean | null>(false)


    React.useEffect(() => {
        dispatch(loadToken());
    }, [dispatch]);

    React.useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnection(state.isConnected);
        });
        return () => unsubscribe();
    }, []);


    return (
        <NavigationContainer ref={navigationRef}>
            {
                loading ? (
                    <Splash />
                ) : token ? (
                    isConnection ? (
                        <MainStack />
                    ) : (
                        <TextCenter title='No Internet Connection' />
                    )
                ) : (
                    <AuthStack />
                )
            }
        </NavigationContainer>
    );
}

export default Routes;
