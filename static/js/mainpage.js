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


$(function () {
        $('.next').click(function () {
            if (n_count == 0) {
                $('.container').attr('style', 'transform: translate(-100vw)');
                n_count = 1;
            } else if (n_count == 1) {
                $('.container').attr('style', 'transform: translate(-200vw)');
                n_count = 2;
            }
        })
    })

$(function(){
    $('.all-list-button').click(function (){
        $('.tags').text('#결국 #다내꾸')
        $('.image-container').empty();
            $.ajax({
                type: "GET",
                url: "/mainpage/items",
                data: {},
                success: function (response) {
                    let items = response["items"];
                    for (let i = 0; i < items.length; i++) {
                        let img = items[i]['imgURL'];

                        // 남은 달 구하기
                        let startYear = items[i]["start_year"];
                        let startMonth = items[i]["start_month"];
                        let date = new Date
                        let nowMonth = date.getMonth() +1
                        let nowYear = date.getFullYear()
                        let payMonth = items[i]["pay_per_month"]
                        let remainMonth = remainMonthCalculate(nowYear, nowMonth, startYear, startMonth, payMonth)

                        let temp_html = `<div class="image">
                                              <img
                                                src=${img}
                                                alt="사고싶은 물건"
                                              />
                                              <div class="circle">${remainMonth}</div>
                                           </div>`
                        $('.image-container').append(temp_html);
                    }
                }
            })
    })

})

$(function(){
    $('.bank-list-button').click(function (){
        $('.tags').text('#아주 #잠시 #은행꺼')
        $('.image-container').empty();
             $.ajax({
                type: "GET",
                url: "/mainpage/items",
                data: {},
                success: function (response) {
                    let items = response["items"];
                    for (let i = 0; i < items.length; i++) {
                        let img = items[i]['imgURL'];

                        // 남은 달 구하기
                        let startYear = items[i]["start_year"];
                        let startMonth = items[i]["start_month"];
                        let date = new Date
                        let nowMonth = date.getMonth() +1
                        let nowYear = date.getFullYear()
                        let payMonth = items[i]["pay_per_month"]
                        let remainMonth = remainMonthCalculate(nowYear, nowMonth, startYear, startMonth, payMonth)
                        let temp_html
                        if(remainMonth > 0){temp_html = `<div class="image">
                                              <img
                                                src=${img}
                                                alt="사고싶은 물건"
                                              />
                                              <div class="circle">${remainMonth}</div>
                                           </div>`
                        $('.image-container').append(temp_html);
                        }
                    }
                }
            })
    })
})

$(function(){
    $('.my-list-button').click(function (){
        $('.tags').text('#넌 #내꺼야!')
        $('.image-container').empty();
              $.ajax({
                type: "GET",
                url: "/mainpage/items",
                data: {},
                success: function (response) {
                    let items = response["items"];
                    for (let i = 0; i < items.length; i++) {
                        let img = items[i]['imgURL'];

                        // 남은 달 구하기
                        let startYear = items[i]["start_year"];
                        let startMonth = items[i]["start_month"];
                        let date = new Date
                        let nowMonth = date.getMonth() +1
                        let nowYear = date.getFullYear()
                        let payMonth = items[i]["pay_per_month"]
                        let remainMonth = remainMonthCalculate(nowYear, nowMonth, startYear, startMonth, payMonth)
                        let temp_html

                        if(remainMonth <= 0){temp_html = `<div class="image">
                                              <img
                                                src=${img}
                                                alt="사고싶은 물건"
                                              />
                                              <div class="circle">${remainMonth}</div>
                                           </div>`

                       $('.image-container').append(temp_html);
                    }
                }
            })
    })

})