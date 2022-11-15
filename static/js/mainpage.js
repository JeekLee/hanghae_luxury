// 남은달 구하는 함수
const remainMonthCalculate = (nowYear, nowMonth, startYear, startMonth, payMonth) => {
                            let remain
                            if (nowYear === startYear) {
                                remain = payMonth - (nowMonth - startMonth)
                            } else if (nowYear > startYear) {
                                remain = payMonth - ((nowYear - startYear) * 12 + startMonth - nowMonth)
                            } else {
                                remain = payMonth
                            }
                            return remain
                        }

const buttonClick = (select)=>{
    select === 1 && $('.tags').text('#결국 #다내꾸')
    select === 2 && $('.tags').text('#아주 #잠시 #은행꺼')
    select === 3 && $('.tags').text('#넌 #내꺼야!')
        $('.image-container').empty();
            $.ajax({
                type: "GET",
                url: "/mainpage/getitems",
                data: {},

                success: function (response) {
                    let items = response["items"];
                    for (let i = 0; i < items.length; i++) {
                        let img = items[i]['image'];

                        // 남은 달 구하기
                        let startDate = items[i]['date']
                        let startYear = startDate.split('-')[0]
                        let startMonth = startDate.split('-')[2]
                        let date = new Date
                        let nowMonth = date.getMonth()+1
                        let nowYear = date.getFullYear()
                        let payMonth = items[i]["months"]
                        let remainMonth = remainMonthCalculate(nowYear, nowMonth, startYear, startMonth, payMonth)

                        let textRemainMonth = remainMonth === 0? '✔' : remainMonth

                        let temp_html

                        if(select === 1){temp_html = `<div class="image">
                                              <img
                                                src=${img}
                                                alt="사고싶은 물건"
                                              />
                                              <div class="circle">${textRemainMonth}</div>
                                           </div>`
                        $('.image-container').append(temp_html)}

                        else if(select === 2 && remainMonth > 0){temp_html = `<div class="image">
                                              <img
                                                src=${img}
                                                alt="사고싶은 물건"
                                              />
                                              <div class="circle">${textRemainMonth}</div>
                                           </div>`
                        $('.image-container').append(temp_html)}

                        else if(select === 3 && remainMonth <= 0){temp_html = `<div class="image">
                                              <img
                                                src=${img}
                                                alt="사고싶은 물건"
                                              />
                                              <div class="circle">${textRemainMonth}</div>
                                           </div>`
                        $('.image-container').append(temp_html)}
                    }
                }
            })}



$(function(){
    $('.all-list-button').click(()=>{buttonClick(1)})
})

$(function(){
    $('.bank-list-button').click(()=>{buttonClick(2)})
})

$(function(){
    $('.my-list-button').click(()=>{buttonClick(3)})
})

