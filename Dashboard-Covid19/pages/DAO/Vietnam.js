window.addEventListener('load', getData)
const WEB_API = "https://owsnews.herokuapp.com/covid";

async function getData() {
    fetch(WEB_API)
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
            $('#tongsocanhiem').text($tongcanhiem);
            $('#tongsotuvong').text($tongtuvong);
            let html = response.data.map(function (response) {
                return `<tr>
                    <td>${response.tinh}</td>
                    <td>${response.tong_nhiem}</td>
                    <td><div class="badge badge-opacity-warning">${response.nhiem}</div></td>
                    <td><div class="badge badge-opacity-danger">${response.tong_tuvong}</div></td>
                    </tr>`;
                    })
                    document.getElementById("tbody").innerHTML = html.join('');
        })
}
