import React from 'react';

const refreshHook = (callBack: () => void) => {
    const [refresh, setRefresh] = React.useState(false);
    const onRefresh = async () => {
        try {
            setRefresh(true);
            await callBack();
        } catch (error) {
            console.warn(error);
            return
        } finally {
            setRefresh(false);
        }
    }
    return { onRefresh, refresh };
}

export default refreshHook;