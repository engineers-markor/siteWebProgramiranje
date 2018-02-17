export const getLessonIdFromPathName = (pathName) => {
    return pathName.split('/').pop();
};

export const objectToArray = (object) => {
    const keys = Object.keys(object);
    const arr = [];
    keys.forEach(el => {
        arr.push(object[el]);
    });
    return arr;
};