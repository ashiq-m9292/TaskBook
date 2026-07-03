let isPressed = false;

export const singlePress = (
    callback: () => void,
    delay = 1000,
) => {
    if (isPressed) return;

    isPressed = true;

    try {
        callback();
    } finally {
        setTimeout(() => {
            isPressed = false;
        }, delay);
    }
};