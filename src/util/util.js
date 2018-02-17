export const getLessonIdFromPathName = (pathName) => {
    return pathName.split('/').pop();
};