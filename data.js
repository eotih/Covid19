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
        var data = response.locations;
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

        getDateTime();
        const { cases, death, recovered } = response.today.internal;
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