//-- 할부 남은 달 구하는 함수 --//
const remainMonthCalculate = (nowYear, nowMonth, startYear, startMonth, payMonth) => {
    let remain
    // 나중에 시작 하고 싶을 경우, 현재 진행하고 있는 경우로 구분
    if ((nowYear < startYear) || ((nowYear === startYear) && (nowMonth < startMonth))) {
        remain = payMonth
    } else {
        if (nowYear === startYear) {
            remain = payMonth - (nowMonth - startMonth)
        } else {
            remain = payMonth - ((nowYear - startYear) * 12 + startMonth - nowMonth)
        }
    }
    return remain
}

//--사진 클릭 시 링크로 개별 아이템 상세 페이지로 들어가는 함수--//
const onclickmypage = (id)=>{
    location.href = "/itempage/?name=" + id
 }

 //-- header 버튼들 클릭시 페이지별로 데이터 보여주는 함수 --//
const buttonClick = (select)=>{
    // main text 버튼 클릭에 따른 변경
    select === 1 && $('.tags').text('#결국 #다내꾸')
    select === 2 && $('.tags').text('#아주 #잠시 #은행꺼')
    select === 3 && $('.tags').text('#넌 #내꺼야!')
         $('.image-container').empty();
         $('.text-container').empty();
            $.ajax({
                type: "GET",
                url: "/mainpage/getitems",
                data: {},
                success: function (response) {
                    if (response['result']==='success') {
                        let items = response["items"];

                        // items가 빈값일 때
                        if (items === undefined) {
                            let temp_html
                            temp_html = `
                <h5 class="add-text">[+]<br><br>추가 버튼으로<br>내 사치템을 추가해 보세요<br><br>⬊ ⬊ ⬊ ⬊ ⬊</h5>
            `
                            $('.text-container').append(temp_html)
                        // items가 있을 때
                        } else {
                            for (let i = 0; i < items.length; i++) {
                                let img = items[i]['image'];
                                let itemId = items[i]['_id']
                                let complete = items[i]['complete']

                                 // item 날짜값 및 현 날짜 가져오기
                                let startDate = new Date(items[i]['date'])
                                let startYear = startDate.getFullYear()
                                let startMonth = startDate.getMonth() + 1
                                let date = new Date
                                let nowMonth = date.getMonth() + 1
                                let nowYear = date.getFullYear()
                                let payMonth = +(items[i]["months"])
                                // 남은 할부 달 가져오기
                                let remainMonth = remainMonthCalculate(nowYear, nowMonth, startYear, startMonth, payMonth)
                                // 남은 할부 별 텍스트
                                let textRemainMonth = remainMonth <= 0 ? '✔' : remainMonth
                                let temp_html
                                //-- 클릭 시 버튼 별 리스트 보여 주기 --//
                                // 모든 리스트 보여주기
                                if (select === 1) {
                                    temp_html = `<div class="image">
                                              <img
                                                id=${itemId}
                                                src=${img}
                                                alt="사고싶은 물건"
                                              />
                                              <div class="circle">${textRemainMonth}</div>
                                           </div>`
                                    $('.image-container').append(temp_html)
                                     // 클릭시 클릭 상품으로 이동
                                    $(`#${itemId}`).click(() => {
                                    onclickmypage(`${itemId}`)
                                    })
                                }
                                  // 할부 남은 리스트 보여주기
                                else if (select === 2 && (remainMonth > 0)) {
                                    temp_html = `<div class="image">
                                              <img
                                                id=${itemId}
                                                src=${img}
                                                alt="사고싶은 물건"
                                              />
                                              <div class="circle">${textRemainMonth}</div>
                                           </div>`
                                    $('.image-container').append(temp_html)
                                    // 클릭시 클릭 상품으로 이동
                                    $(`#${itemId}`).click(() => {
                                    onclickmypage(`${itemId}`)
                                    })
                                    break
                                // 할부 0인 리스트 보여주기
                                }
                                else if((select === 3 && (remainMonth <= 0) || complete === true)) {
                                    temp_html = `<div class="image">
                                              <img
                                                 id=${itemId}
                                                src=${img}
                                                alt="사고싶은 물건"
                                              />
                                              <div class="circle">${textRemainMonth}</div>
                                           </div>`
                                    $('.image-container').append(temp_html)

                                    $(`#${itemId}`).click(() => {
                                    onclickmypage(`${itemId}`)
                                    })
                                }
                            }
                        }
                    // jwt 만료시
                    }else{
                        alert(response['msg'])
                        window.location.href = "/"
                    }
                },
                error: function (response) {
                        alert(response['responseJSON']['msg'])
                }
            })}
 //-- 페이지가 열렸을 때 페이지에 전체 리스트 보여지는 함수 --//
$(function () {
    $('.tags').text('#결국 #다내꾸')
    $('.image-container').empty();
    $('.text-container').empty();
    $.ajax({
        type: "GET",
        url: "/mainpage/getitems",
        data: {},
        success: function (response) {
            if (response['result'] === "success") {
                let items = response["items"];
                 // items가 빈값일 때
                if (items === undefined) {
                    let temp_html
                    temp_html = `
                    <h5 class="add-text">[+]<br><br>추가 버튼으로<br>내 사치템을 추가해 보세요<br><br>⬊ ⬊ ⬊ ⬊ ⬊</h5>
                `
                    $('.text-container').append(temp_html)
                // items가 있을 때
                } else {
                    for (let i = 0; i < items.length; i++) {
                        let img = items[i]['image'];
                        let itemId = items[i]['_id']
                         // item 날짜값 및 현 날짜 가져오기
                        let startDate = new Date(items[i]['date'])
                        let startYear = startDate.getFullYear()
                        let startMonth = startDate.getMonth() + 1
                        let date = new Date
                        let nowMonth = date.getMonth() + 1
                        let nowYear = date.getFullYear()
                        let payMonth = +(items[i]["months"])
                        // 남은 할부 달 가져오기
                        let remainMonth = remainMonthCalculate(nowYear, nowMonth, startYear, startMonth, payMonth)
                        // 남은 할부 별 텍스트
                        let textRemainMonth = remainMonth <= 0 ? '✔' : remainMonth
                        let temp_html
                        temp_html = `<div class="image">
                                              <img
                                                id=${itemId}
                                                src=${img}
                                                alt="사고싶은 물건"
                                              />
                                              <div class="circle">${textRemainMonth}</div>
                                           </div>`
                        $('.image-container').append(temp_html)
                        // 클릭시 클릭 상품으로 이동
                        $(`#${itemId}`).click(() => {
                            onclickmypage(`${itemId}`)
                        })
                    }
                }
              // jwt 만료시
            } else {
                alert(response['msg'])
                window.location.href = '/'
            }
        },

    })
})

//header button 클릭시 리스트 보여주기
$(function(){
    $('.all-list-button').click(()=>{buttonClick(1)})
})
$(function(){
    $('.bank-list-button').click(()=>{buttonClick(2)})
})
$(function(){
    $('.my-list-button').click(()=>{buttonClick(3)})
})

//추가 버튼 클릭 시 이동
$(function() {
    $('.add-button').click(()=>{location.href = '/addpage'})
})

//로그아웃 함수
function logout() {
    $.removeCookie('mytoken', { path: '/' });
    alert('로그아웃!')
    window.location.href = '/'
}

