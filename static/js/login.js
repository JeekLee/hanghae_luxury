"use strict";

const LOGIN_ID = document.getElementById('login_id');
const LOGIN_PWD = document.getElementById('login_pwd');
const LOGIN_BTN = document.getElementById('login_btn');
const VERIFY_ID = document.getElementById('verify_id');
const VERIFY_PWD = document.getElementById('verify_pwd1');

//flags

var FLAGID = false;
var FLAGPWD = false;

$(document).ready(function () {
    console.log('login.js called');
});

//로그인 시 영어,숫자만
function login_rule(ele) {
    ele.value = ele.value.replace(/^[A-Za-z0-9+]*$/, "");
}

// ID 확인
if (LOGIN_ID.value.length >= 5 && LOGIN_ID.value.length <= 15) {
    LOGIN_ID.style.backgroundColor = "#FAFAFA";
    VERIFY_ID.style.color = "#0095F6";
    VERIFY_ID.innerText = ' ';
    FLAGID = true;
} else {
    LOGIN_ID.style.backgroundColor = "#f5dad7";
    VERIFY_ID.style.color = "red";
    VERIFY_ID.innerText = '아이디 형식이 올바르지 않습니다.';
    FLAGID = false;
}

// PW 확인
if (LOGIN_PWD.value.length >= 5 && LOGIN_PWD.value.length <= 15) {
    LOGIN_PWD.style.backgroundColor = "#FAFAFA";
    VERIFY_PWD.style.color = "#0095F6";
    VERIFY_PWD.innerText = ' ';
    FLAGPWD = true;
} else {
    LOGIN_PWD.style.backgroundColor = "#f5dad7";
    VERIFY_PWD.style.color = "red";
    VERIFY_PWD.innerText = 'PW 형식이 올바르지 않습니다.';
    FLAGPWD = false;
}
// 확인하고 버튼 활성화
if (FLAGID == true && FLAGPWD == true) {
    LOGIN_BTN.style.backgroundColor = "#0095F6";
    LOGIN_BTN.disabled = false;
} else {
    LOGIN_BTN.style.backgroundColor = "#8E8E8E";
    LOGIN_BTN.disabled = true;
}