import React from 'react';
const { default: funcUtils } = require("~/utils/funcUtils");

const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
export const validateId = (id) => {
    if (id.length < 6) {
        funcUtils.notify('Tài khoản phải dài hơn 6 ký tự!', 'error');
        return false;
    }
    if (id.length > 20) {
        funcUtils.notify('Tài khoản không được dài quá !', 'error');
        return false;
    }
    if (specialCharRegex.test(id)) {
        funcUtils.notify('Tài khoản không được chứa ký tự !', 'error');
        return false;
    }
    return true;
};

export const validatePassword = (password) => {

    if (password.length > 20) {
        funcUtils.notify('Mật khẩu không được dài quá !', 'error');
        return false;
    }
    if (specialCharRegex.test(password)) {
        funcUtils.notify('Mật khẩu không được chứa ký tự !', 'error');
        return false;
    }
    if (password.length < 8) {
        funcUtils.notify('Mật khẩu phải dài hơn 8 ký tự !', 'error');
        return false;
    }
    return true;
};

