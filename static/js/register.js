"use strict";

const REGISTER_ID = document.getElementById('register_id');
const REGISTER_PWD1 = document.getElementById('register_pwd1');
const REGISTER_PWD2 = document.getElementById('register_pwd2');
const REGISTER_BTN = document.getElementById('register_btn');
const OVERLAP_BTN = document.getElementById('over_btn');
const VERIFY_ID = document.getElementById('verify_id');
const VERIFY_PWD1 = document.getElementById('verify_pwd1');
const VERIFY_PWD2 = document.getElementById('verify_pwd2');

var FLAGID = false;
var FLAGPW1 = false;
var FLAGPW2 = false;

$(document).ready(function () {
    console.log('register.js called');
});

function moveToLogin() {
    console.log('move to login page');

}

//회원가입 시 영어,숫자만
function regi_rule(ele) {
    ele.value = ele.value.replace(/^[A-Za-z0-9+]*$/, "");
}

//아이디 중복 체크
var a = 0;
var c = 0;
let p_check = 0;
$(function () {
    $('.login-button').click(function () {
        location.href = '/login'
    })
})

function check() {
    let ID = $('#id').val()

    if (ID == "") {
        alert("아이디를 입력해주세요!");
    } else {
        $.ajax({
            type: "GET",
            url: "/register/check" + ID,
            data: {id: ID},
            success: function (response) {
                console.log(response);
                alert(response['message']);
                a = response['success'];
                c = 1;
                console.log(a);
                if (a == false) {
                    var input = document.getElementById("id");
                    input.value = null;
                }
            }
        });
    }
}


// 암호화 등록, 데이터 POST
function post_userinfo() {
    let user_id = REGISTER_ID.value;
    let user_pw = sha256(REGISTER_PWD2.value);

    $.ajax({
        type: "POST",
        url: "/register/post",
        async: false,
        data: {
            id_give: user_id,
            pw_give: user_pw,
        },
        success: function (response) {
            alert(response["msg"])
        }
    });
}

// 회원가입 정보 확인, 모두 일치 시 버튼 활성화
function verify() {
    // ID 형식 확인
    if (REGISTER_ID.value.length >= 5 && REGISTER_ID.value.length <= 15) {
        REGISTER_ID.style.backgroundColor = "#FAFAFA";
        VERIFY_ID.style.color = "#0095F6";
        VERIFY_ID.innerText = '사용 가능한 ID 형식입니다.';
        FLAGID = true;
    } else {
        REGISTER_ID.style.backgroundColor = "#f5dad7";
        VERIFY_ID.style.color = "red";
        VERIFY_ID.innerText = 'ID는 5글자 이상, 15글자 이하 영문, 숫자 입력이 가능합니다.';
        FLAGID = false;
    }
    if (FLAGID == true) {
        OVERLAP_BTN.disabled = false;
    } else {
        OVERLAP_BTN.disabled = true;
    }

    // PW 형식 확인
    if (REGISTER_PWD1.value.length >= 5 && REGISTER_PWD1.value.length <= 15) {
        REGISTER_PWD1.style.backgroundColor = "#FAFAFA";
        VERIFY_PWD1.style.color = "#0095F6";
        VERIFY_PWD1.innerText = '사용 가능한 PW입니다.';
        FLAGPW1 = true;
    } else {
        REGISTER_PWD1.style.backgroundColor = "#f5dad7";
        VERIFY_PWD1.style.color = "red";
        VERIFY_PWD1.innerText = 'PW는 5글자 이상, 15글자 이하 영문, 숫자 입력이 가능합니다.';
        FLAGPW1 = false;
    }

    // PW 일치 확인
    if (REGISTER_PWD1.value == REGISTER_PWD2.value) {
        REGISTER_PWD2.style.backgroundColor = "#FAFAFA";
        VERIFY_PWD2.style.color = "#0095F6";
        VERIFY_PWD2.innerText = '비밀번호가 일치합니다.';
        FLAGPW2 = true;
    } else {
        REGISTER_PWD1.style.backgroundColor = "#f5dad7";
        VERIFY_PWD2.style.color = "red";
        VERIFY_PWD2.innerText = '비밀번호가 일치하지 않습니다';
        FLAGPW2 = false;
    }

    // 확인하고 회원가입 버튼 활성화
    if (FLAGID == true && FLAGPW1 == true && FLAGPW2 == true) {
        REGISTER_BTN.style.backgroundColor = "#0095F6";
        REGISTER_BTN.disabled = false;
    } else {
        REGISTER_BTN.style.backgroundColor = "#8E8E8E";
        REGISTER_BTN.disabled = true;
    }
}