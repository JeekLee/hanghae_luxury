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

//로그인 시 영어,숫자만
$(document).ready(function () {
    $("input[name=id]").keyup(function (event) {
        if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
            var inputVal = $(this).val();
            $(this).val(inputVal.replace(/[^a-z0-9]/gi, ''));
        }
    })
})

var check = 0;

//아이디 중복 검사
function id_test() {
    let ID = $('#register_id').val()
    $.ajax({
        type: "GET",
        url: "/register/check?id=" + ID,
        data: {id: ID},
        success: function (response) {
            console.log(response);
            alert(response['message']);
            console.log(response['success']);
            check = 1;
            if (response['success'] == false) {
                var input = document.getElementById("register_id");
                input.value = null;
            }
        }
    })
}

// 암호화 등록, 데이터 POST
function register() {

    if (check == 0) {
        alert('아이디 중복확인을 해주세요');
    } else {
        $.ajax({
            type: "POST",
            url: "/register/apiregi",
            data: {
                id_give: $('#register_id').val(),
                pw_give: $('#register_pwd1').val(),
            },
            success: function (response) {
                console.log("response");
                alert('회원가입이 완료되었습니다.')
                window.location.href = '/home/login'

            }
        })
    }
}


// 회원가입 정보 확인, 모두 일치 시 버튼 활성화
function verify() {
    // ID 형식 확인
    if (REGISTER_ID.value.length >= 5 && REGISTER_ID.value.length <= 15) {
        REGISTER_ID.style.backgroundColor = "#EDEDED";
        VERIFY_ID.style.color = "#0095F6";
        VERIFY_ID.innerText = '사용 가능한 ID 형식입니다.';
        VERIFY_ID.style.marginBottom = "15px";
        FLAGID = true;
    } else {
        REGISTER_ID.style.backgroundColor = "#f5dad7";
        VERIFY_ID.style.color = "red";
        VERIFY_ID.innerText = 'ID는 5글자 이상, 15글자 이하 영문, 숫자 입력이 가능합니다.';
        VERIFY_ID.style.marginBottom = "15px";
        FLAGID = false;
    }

    // ID조건에 맞으면 중복확인 버튼 활성화
    if (FLAGID == true) {
        OVERLAP_BTN.style.backgroundColor = "#7853F6";
        OVERLAP_BTN.disabled = false;
    } else {
        OVERLAP_BTN.style.backgroundColor = "#8E8E8E";
        OVERLAP_BTN.disabled = true;
    }

    // PW 형식 확인
    if (REGISTER_PWD1.value.length >= 5 && REGISTER_PWD1.value.length <= 15) {
        REGISTER_PWD1.style.backgroundColor = "#EDEDED";
        VERIFY_PWD1.style.color = "#0095F6";
        VERIFY_PWD1.innerText = '사용 가능한 PW입니다.';
        VERIFY_PWD1.style.marginBottom = "15px";
        FLAGPW1 = true;
    } else {
        REGISTER_PWD1.style.backgroundColor = "#f5dad7";
        VERIFY_PWD1.style.color = "red";
        VERIFY_PWD1.innerText = 'PW는 5글자 이상, 15글자 이하 영문, 숫자 입력이 가능합니다.';
        VERIFY_PWD1.style.marginBottom = "15px";
        FLAGPW1 = false;
    }

    // PW 일치 확인
    if (REGISTER_PWD1.value == REGISTER_PWD2.value) {
        REGISTER_PWD2.style.backgroundColor = "#EDEDED";
        VERIFY_PWD2.style.color = "#0095F6";
        VERIFY_PWD2.innerText = '비밀번호가 일치합니다.';
        FLAGPW2 = true;
    } else {
        REGISTER_PWD1.style.backgroundColor = "#f5dad7";
        VERIFY_PWD2.style.color = "red";
        VERIFY_PWD2.innerText = '비밀번호가 일치하지 않습니다';
        FLAGPW2 = false;
    }

    // 조건 충족시 회원가입 버튼 활성화
    if (FLAGID == true && FLAGPW1 == true && FLAGPW2 == true) {
        REGISTER_BTN.style.backgroundColor = "#7853F6";
        REGISTER_BTN.disabled = false;
    } else {
        REGISTER_BTN.style.backgroundColor = "#8E8E8E";
        REGISTER_BTN.disabled = true;
    }
}


REGISTER_ID.addEventListener('keyup', verify);
REGISTER_PWD1.addEventListener('keyup', verify);
REGISTER_PWD2.addEventListener('keyup', verify);
REGISTER_BTN.addEventListener('click', register);