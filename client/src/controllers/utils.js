const convertNumberToTwoDigits = (num) => {
    return num < 10 ? `0${num}` : num;
};

class Utils {
    convertSecondToViewedString = (seconds) => {
        if (!isNaN(seconds)) {
            const hour = convertNumberToTwoDigits(
                Math.floor(seconds / 3600)
            );
            const minute = convertNumberToTwoDigits(
                Math.floor(seconds / 60)
            );
            const second = convertNumberToTwoDigits(
                Math.floor(seconds % 60)
            );

            return {
                hour: `${hour}`,
                minute: `${minute}`,
                second: `${second}`,
            };
        } else return seconds;
    };
}

export default new Utils();
