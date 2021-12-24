export const fileUpload = async file => {
    const fd = new FormData();
    fd.append('file', file);
    return await instance.post('/all/upload/file', fd);
};