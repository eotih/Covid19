(function ($) {
  const fields = [
    {
      title: "Tỉnh/TP",
      name: "name",
      type: "text",
      width: 200
    },
    {
      title: "Tổng số ca",
      name: "cases",
      type: "number",
      width: 100
    },
    {
      title: "Hôm nay",
      name: "casesToday",
      type: "number",
      width: 100
    },
    {
      title: "Tử vong",
      name: "death",
      type: "text",
      width: 100
    },
  ]
  'use strict';
  $(function () {
    fetch("https://static.pipezero.com/covid/data.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        
        var duLieuNgayThang = [];
        var duLieuSoCaNhiem = []
        var duLieuSoCaKhoi = []
        var data = response.locations;
        const { cases, death, recovered } = response.today.internal;
        for(let i = 0; i <7; i++) {
          duLieuNgayThang.push(response.overview[i].date);
          duLieuSoCaNhiem.push(response.overview[i].recovered);
          duLieuSoCaKhoi.push(response.overview[i].cases);
        }
        var searchByName = data.filter(v => v.name === 'Bình Dương'
          || v.name === 'TP. Hồ Chí Minh'
          || v.name === 'Đắk Lắk'
          || v.name === 'Gia Lai'
          || v.name === 'Bình Thuận')
        if ($("#js-grid-sortable").length) {
          $("#js-grid-sortable").jsGrid({
            height: "600px",
            width: "100%",
            heading: true,
            sorting: true,
            paging: true,
            autoload: true,
            pageSize: 10,
            pageButtonCount: 5,
            data: data,
            fields: fields
          });
        }
        if ($("#js-grid-sortable2").length) {
          $("#js-grid-sortable2").jsGrid({
            height: "600px",
            width: "100%",
            heading: true,
            sorting: true,
            paging: true,
            autoload: true,
            pageSize: 10,
            pageButtonCount: 5,
            data: searchByName,
            fields: fields
          });
        }
        if ($("#SoCaNhiem").length) {
          var leaveReportChart = document.getElementById("SoCaNhiem").getContext('2d');
          var leaveReportData = {
            labels: duLieuNgayThang,
            datasets: [{
              label: 'SỐ CA NHIỄM',
              data: duLieuSoCaNhiem,
              backgroundColor: "#52CDFF",
              borderColor: [
                '#52CDFF',
              ],
              borderWidth: 0,
              fill: true, // 3: no fill

            }]
          };

          var leaveReportOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                gridLines: {
                  display: true,
                  drawBorder: false,
                  color: "rgba(255,255,255,.05)",
                  zeroLineColor: "rgba(255,255,255,.05)",
                },
                ticks: {
                  beginAtZero: true,
                  autoSkip: true,
                  maxTicksLimit: 5,
                  fontSize: 10,
                  color: "#6B778C"
                }
              }],
              xAxes: [{
                barPercentage: 0.5,
                gridLines: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  beginAtZero: false,
                  autoSkip: true,
                  maxTicksLimit: 7,
                  fontSize: 10,
                  color: "#6B778C"
                }
              }],
            },
            legend: false,

            elements: {
              line: {
                tension: 0.4,
              }
            },
            tooltips: {
              backgroundColor: 'rgba(31, 59, 179, 1)',
            }
          }
          var leaveReport = new Chart(leaveReportChart, {
            type: 'bar',
            data: leaveReportData,
            options: leaveReportOptions
          });
        }

        if ($("#SoCaKhoi").length) {
          var leaveReportChart = document.getElementById("SoCaKhoi").getContext('2d');
          var leaveReportData = {
            labels: duLieuNgayThang,
            datasets: [{
              label: 'SỐ CA KHỎI',
              data: duLieuSoCaKhoi,
              backgroundColor: "#52CDFF",
              borderColor: [
                '#52CDFF',
              ],
              borderWidth: 0,
              fill: true, // 3: no fill

            }]
          };

          var leaveReportOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                gridLines: {
                  display: true,
                  drawBorder: false,
                  color: "rgba(255,255,255,.05)",
                  zeroLineColor: "rgba(255,255,255,.05)",
                },
                ticks: {
                  beginAtZero: true,
                  autoSkip: true,
                  maxTicksLimit: 5,
                  fontSize: 10,
                  color: "#6B778C"
                }
              }],
              xAxes: [{
                barPercentage: 0.5,
                gridLines: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  beginAtZero: false,
                  autoSkip: true,
                  maxTicksLimit: 7,
                  fontSize: 10,
                  color: "#6B778C"
                }
              }],
            },
            legend: false,

            elements: {
              line: {
                tension: 0.4,
              }
            },
            tooltips: {
              backgroundColor: 'rgba(31, 59, 179, 1)',
            }
          }
          var leaveReport = new Chart(leaveReportChart, {
            type: 'bar',
            data: leaveReportData,
            options: leaveReportOptions
          });
        }
        getDateTime();
        $('#canhiemhomnay').text(cases.toLocaleString());
        $('#tuvonghomnay').text(death.toLocaleString());
        $('#hoiphuchomnay').text(recovered.toLocaleString());

        $('#hoiphuchomnaytg').text(response.today.world.recovered.toLocaleString());
        $('#canhiemhomnaytg').text(response.today.world.cases.toLocaleString());

        $('#tongsocanhiem').text(response.total.internal.cases.toLocaleString());
        $('#tongsotuvong').text(response.total.internal.death.toLocaleString());
        $('#tongsocahoiphuctrongnuoc').text(response.total.internal.recovered.toLocaleString());

        $('#tongsocathegioi').text(response.total.world.cases.toLocaleString());
        $('#tongsocahoiphucthegioi').text(response.total.world.recovered.toLocaleString());

        $('#nhiemtrungbinh7ngay').text('Trung bình 7 ngày : ' + response.overview[0].avgCases7day.toLocaleString());
        $('#khoitrungbinh7ngay').text('Trung bình 7 ngày : ' + response.overview[0].avgRecovered7day.toLocaleString());
      })
  });
})(jQuery);
function getDateTime() {

  var myVar = setInterval(function () {
    var today = new Date();
    var current_day = today.getDay();
    var day_name = '';
    switch (current_day) {
      case 0:
        day_name = "Chủ nhật";
        break;
      case 1:
        day_name = "Thứ hai";
        break;
      case 2:
        day_name = "Thứ ba";
        break;
      case 3:
        day_name = "Thứ tư";
        break;
      case 4:
        day_name = "Thứ năm";
        break;
      case 5:
        day_name = "Thứ sau";
        break;
      case 6:
        day_name = "Thứ bảy";
    }
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    var dateTime = day_name + ', ' + date + ' ' + time;
    $('#nguon').text("Nguồn: Bộ Y Tế - Cập nhật lúc  " + dateTime);
  }, 500)

}