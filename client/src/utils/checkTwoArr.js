export const checkTwoArr = (a, b) => {
    for(let i= 0; i <a?.length; ++i) {
        for(let y =0; y <b?.length; ++y) {
            if (a[i] === b[y]) {
                return true;
            }
        }
    };
   
    return false;
}
/* 
note: Khi xử dụng các hàm như set or for....of
gọi 2 lần liên tiếp mà giá trị a vẫn như thế thì bị lỗi
// chi tiết lỗi gg:
TypeError: 'x' is not iterable
*/