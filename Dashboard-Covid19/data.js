(function ($) {
  'use strict';
  $(function () {
    fetch("https://static.pipezero.com/covid/data.json")
    .then(function (response){
      return response.json();
    })
    .then(function (response){
      $('#tongsocathegioi').text(response.total.world.cases.toLocaleString() +" Ca nhiễm");
      $('#tongsocahoiphuctrongnuoc').text(response.total.internal.recovered.toLocaleString() +" Ca hồi phục");
      $('#tongsocahoiphucthegioi').text(response.total.world.recovered.toLocaleString() +" Ca hồi phục");
    })
    fetch("https://owsnews.herokuapp.com/covid")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        var $tongtuvong = 0;
        var $tongcanhiem = 0;
        for (let i = 0; i < response.data.length; i++) {
          $tongtuvong += Number(response.data[i].tong_tuvong.replace(/\./g, ''));
          $tongcanhiem += Number(response.data[i].tong_nhiem.replace(/\./g, ''));
        }
        $('#nguon').text(response.source_covid);
        $('#tongsocanhiem').text($tongcanhiem.toLocaleString() +" Ca nhiễm");
        $('#tongsotuvong').text($tongtuvong.toLocaleString() +" Ca tử vong");
        var $hieu = response.data;
        if ($("#js-grid").length) {
          $("#js-grid").jsGrid({
            height: "600px",
            width: "100%",
            filtering: true,
            //editing: true,
            //inserting: true,
            sorting: true,
            paging: true,
            autoload: true,
            pageSize: 10,
            pageButtonCount: 5,
            deleteConfirm: "Do you really want to delete the client?",
            data: $hieu,
            fields: [{
              title: "Tỉnh",
              name: "tinh",
              type: "text",
              width: 200
            },
            {
              title: "Ca nhiễm",
              name: "nhiem",
              type: "number",
              width: 100
            },
            {
              title: "Tử vong",
              name: "tuvong",
              type: "text",
              width: 100
            },
            {
              title: "Tổng nhiễm",
              name: "tong_nhiem",
              type: "number",
              width: 100
            },
            {
              title: "Tổng tử vong",
              name: "tong_tuvong",
              type: "text",
              width: 100
            },
            {
              type: "control"
            }
            ]
          });
        }

      })
  });
})(jQuery);