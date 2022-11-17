"use strict";

const LOGIN_ID = document.getElementById('login_id');
const LOGIN_PWD = document.getElementById('login_pwd');
const LOGIN_BTN = document.getElementById('login_btn');
const VERIFY_LOGINID = document.getElementById('verify_loginid');
const VERIFY_LOGINPWD = document.getElementById('verify_loginpwd');

//flags

var FLAGLOGINID = false;
var FLAGLOGINPWD = false;

// 로그인 만료
let token_msg = "default"
const searchParams = new URLSearchParams(location.search);
for (const param of searchParams) {
    token_msg = param[1];
}

$(document).ready(function () {
    console.log('login.js called');
    if (token_msg == 'expired_token') {
        alert("로그인 시간이 만료되었습니다.");
    }
    if (token_msg == 'invalid_token') {
        alert("유효하지 않은 로그인 정보입니다.");
    }
});

//로그인 시 영어,숫자만
$(document).ready(function () {
    $("input[name=id]").keyup(function (event) {
        if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^a-z0-9]/gi, ''));
        }
    });
});

//로그인
function login() {
    $.ajax({
        type: "POST",
        url: "/home/login/api/tklogin",
        data: {
            id_give: $('#login_id').val(),
            pw_give: $('#login_pwd').val(),
        },
        success: function (response) {
            if (response['result'] == 'success') {
                //로그인이 정상적으로 되면, 토큰을 받아온다.
                //이 토큰을 mytoken 이라는 키 값으로 쿠키에 저장한다.
                $.cookie('mytoken', response['token']);

                alert('로그인 완료!')
                window.location.href = '/mainpage'  //로그인 완료 되면 메인페이지로 ?
            } else {
                //로그인이 안되면 에러메시지를 띄운다.
                alert(response['msg'])
            }
        }
    })
}



function verify() {
// ID 확인
    if (LOGIN_ID.value.length >= 5 && LOGIN_ID.value.length <= 15) {
        LOGIN_ID.style.backgroundColor = "#EDEDED";
        VERIFY_LOGINID.style.color = "#0095F6";
        VERIFY_LOGINID.innerText = ' ';
        FLAGLOGINID = true;
    } else {
        LOGIN_ID.style.backgroundColor = "#f5dad7";
        VERIFY_LOGINID.style.color = "red";
        VERIFY_LOGINID.innerText = '아이디 형식이 올바르지 않습니다.';
        VERIFY_LOGINID.style.marginBottom = "15px";
        FLAGLOGINID = false;
    }

// PW 확인
    if (LOGIN_PWD.value.length >= 5 && LOGIN_PWD.value.length <= 15) {
        LOGIN_PWD.style.backgroundColor = "#EDEDED";
        VERIFY_LOGINPWD.style.color = "#0095F6";
        VERIFY_LOGINPWD.innerText = ' ';
        FLAGLOGINPWD = true;
    } else {
        LOGIN_PWD.style.backgroundColor = "#f5dad7";
        VERIFY_LOGINPWD.style.color = "red";
        VERIFY_LOGINPWD.innerText = 'PW 형식이 올바르지 않습니다.';
        FLAGLOGINPWD = false;
    }
// 확인하고 버튼 활성화
    if (FLAGLOGINID == true && FLAGLOGINPWD == true) {
        LOGIN_BTN.style.backgroundColor = "#7853F6";
        LOGIN_BTN.disabled = false;
    } else {
        LOGIN_BTN.style.backgroundColor = "#8E8E8E";
        LOGIN_BTN.disabled = true;
    }
}

LOGIN_ID.addEventListener('keyup', verify);
LOGIN_PWD.addEventListener('keyup', verify);
LOGIN_BTN.addEventListener('click', login);
//
// 가지고 있는 토큰만 쿠키에서 없애면 로그아웃
//       function logout(){
//         $.removeCookie('mytoken');
//         alert('로그아웃!')
//         window.location.href='/home/login'
//       }
//

