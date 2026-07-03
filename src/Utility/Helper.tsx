// slice text
export const sliceFunction = (text: string, limit: number) => {
    return text.length > limit ? `${text.slice(0, limit)}...` : text
};

// format date time
export const formatTime = (dateTime: any) => {
    const date = new Date(dateTime).toLocaleString('en-Us', { day: 'numeric', month: 'short', year: 'numeric' });
    const time = new Date(dateTime).toLocaleString('en-Us', { hour: 'numeric', minute: 'numeric', hour12: true });
    return `${date} ${time}`
};

// // dark mode function
export const handleDarkMode = (calBack: () => void) => {
    try {
        calBack();
    } catch (error: any) {
        console.warn(error);
        return
    }
};

// handle grid mode 
export const handleGridModeFunction = (calBack: () => void) => {
    try {
        calBack();
    } catch (error: any) {
        console.warn(error);
        return
    }
};

// select all ids 
export const handleSelectAllId = ({ data, setState, key }: any) => {
    try {
        setState(data.map((item: any) => item[key]));
    } catch (error) {
        console.warn(error);
        return
    }
};
