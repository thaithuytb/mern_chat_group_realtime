export const checkComfirmPassword = (password, cfPassword) => {
    if (password !== cfPassword || password === '') {
        return false;
    }
    return true;
}