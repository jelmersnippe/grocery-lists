export const capitalize = (string: string) => {
    const stringPieces = string.split(' ');
    const capitalizedStrings = stringPieces.map((string) => {
        const lowercaseString = string.toLowerCase();
        return lowercaseString.charAt(0).toUpperCase() + lowercaseString.slice(1);
    });

    return capitalizedStrings.reduce((acc, cur) => {
        if (acc === '') {
            return acc + cur;
        } else {
            return acc + ' ' + cur;
        }
    }, '');
};
