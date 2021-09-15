(function ($) {
  'use strict';
  $(function () {
    fetch("https://static.pipezero.com/covid/data.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        console.log(response)
        if ($("#js-grid-sortable").length) {
          $("#js-grid-sortable").jsGrid({
            height: "600px",
            width: "100%",
            filtering: true,
            sorting: true,
            paging: true,
            autoload: true,
            pageSize: 10,
            pageButtonCount: 5,
            deleteConfirm: "Do you really want to delete the client?",
            data: response.locations,
            fields: [
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
                title: "Tử vong",
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
          });
        }
        if ($("#sort").length) {
          $("#sort").on("click", function () {
            var field = $("#sortingField").val();
            $("#js-grid-sortable").jsGrid("sort", field);
          });
        }

        $('#canhiemhomnay').text(response.today.internal.cases.toLocaleString());
        $('#tuvonghomnay').text(response.today.internal.death.toLocaleString());
        $('#tongsocanhiem').text(response.total.internal.cases.toLocaleString());
        $('#tongsotuvong').text(response.total.internal.death.toLocaleString());
        $('#hoiphuchomnay').text(response.today.internal.recovered.toLocaleString());
        $('#hoiphuchomnaytg').text(response.today.world.recovered.toLocaleString());
        $('#canhiemhomnaytg').text(response.today.world.cases.toLocaleString());
        $('#tongsocathegioi').text(response.total.world.cases.toLocaleString());
        $('#tongsocahoiphuctrongnuoc').text(response.total.internal.recovered.toLocaleString());
        $('#tongsocahoiphucthegioi').text(response.total.world.recovered.toLocaleString());
      })
  });
})(jQuery);