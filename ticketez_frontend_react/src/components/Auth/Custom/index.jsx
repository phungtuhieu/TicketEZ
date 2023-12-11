import React from 'react';
const { default: funcUtils } = require("~/utils/funcUtils");

const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const numericRegex = /\d/;
const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const phoneRegex = /^(0[1-9][0-9]{8}|84[1-9][0-9]{7})$/;
const regexFullname = /^[A-ZĐÂÊÔƠƯ][a-zđâêôơưàảãáạăằẳẵắặâầẩẫấậèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵ]+(\s[A-ZĐÂÊÔƠƯ][a-zđâêôơưàảãáạăằẳẵắặâầẩẫấậèẻẽéẹêềểễếệìỉĩíịòỏõóọôồổỗốộơờởỡớợùủũúụưừửữứựỳỷỹýỵ]+)*$/;
const repeatingCharsRegex = /(.)\1{2,}/; 

export const validateId = (id) => {
    if (id.length < 6) {
        funcUtils.notify('Tài khoản phải dài hơn 6 ký tự!', 'error');
        return false;
    }
    if (id.length > 20) {
        funcUtils.notify('Tài khoản không được dài quá 20 ký tự!', 'error');
        return false;
    }
    if (specialCharRegex.test(id)) {
        funcUtils.notify('Tài khoản không được chứa ký tự đặc biệt!', 'error');
        return false;
    }
    return true;
};

export const validatePassword = (password) => {
    if (password.length < 8) {
        funcUtils.notify('Mật khẩu phải dài hơn 8 ký tự!', 'error');
        return false;
    }
    if (password.length > 20) {
        funcUtils.notify('Mật khẩu không được dài quá 20 ký tự!', 'error');
        return false;
    }
    if (!numericRegex.test(password)) {
        funcUtils.notify('Mật khẩu phải chứa ít nhất một số!', 'error');
        return false;
    }
    if (!uppercaseRegex.test(password)) {
        funcUtils.notify('Mật khẩu phải chứa ít nhất một chữ in hoa!', 'error');
        return false;
    }
    if (!lowercaseRegex.test(password)) {
        funcUtils.notify('Mật khẩu phải chứa ít nhất một chữ thường!', 'error');
        return false;
    }
    if (specialCharRegex.test(password)) {
        funcUtils.notify('Mật khẩu không được chứa ký tự đặc biệt!', 'error');
        return false;
    }
    return true;
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.length === 0) {
        funcUtils.notify('Email không được để trống!', 'error');
        return false;
    }
    if (!emailRegex.test(email)) {
        funcUtils.notify('Email không hợp lệ!', 'error');
        return false;
    }
    return true;
};

export const validatePhone = (phone) => {
    if (!numericRegex.test(phone) || phone.length !== 10) {
        funcUtils.notify('Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại gồm 10 chữ số.', 'error');
        return false;
    }
    if (!phoneRegex.test(phone)) {
        funcUtils.notify('Số điện thoại không hợp lệ! Vui lòng nhập đúng định dạng.', 'error');
        return false;
    }
    return true;
};

export const validateFullname = (fullname) => {


    if (repeatingCharsRegex.test(fullname)) {
      funcUtils.notify('Tên không hợp lệ. Không được nhập ký tự lặp lại nhiều lần liên tiếp.', 'error');
      return false;
    }
    if (specialCharRegex.test(fullname)) {
        funcUtils.notify('Tên không hợp lệ. Không được nhập ký tự đặc biệt.', 'error');
        return false;
      }
    
    if (!regexFullname.test(fullname)) {
      funcUtils.notify('Tên không hợp lệ. Vui lòng nhập tên đúng định dạng ', 'error');
      return false;
    }

    const nameParts = fullname.trim().split(' ');
    if (nameParts.length < 1) {
      funcUtils.notify('Tên không hợp lệ. Vui lòng nhập đầy đủ họ và tên.', 'error');
      return false;
    }
  
    return true;
  };
  
  export const validatEaddress = (address) => {



    if (specialCharRegex.test(address)) {
        funcUtils.notify('Địa chỉ không hợp lệ. Không được nhập ký tự đặc biệt.', 'error');
        return false;
      }



    return true;
  };
  
  