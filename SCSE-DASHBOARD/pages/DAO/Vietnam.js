window.addEventListener('load', loadData)

async function loadData() {
    fetch("https://owsnews.herokuapp.com/covid")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response.data)
            var tongtuvong = 0;
            var tongcanhiem = 0;
            for (let i = 0; i < response.data.length; i++) {
                tongtuvong += Number(response.data[i].tong_tuvong.replace(/\./g, ''));
                tongcanhiem += Number(response.data[i].tong_nhiem.replace(/\./g, ''));
            }
            var html = response.map(function (response) {
                return `<tr>
                    <td>${response.tinh}</td>
                    <td>${response.tong_nhiem}</td>
                    <td>${response.nhiem}</td>
                    <td>${response.tong_tuvong}</td>
                    </tr>`;
                    })
                    document.getElementById("tbody").innerHTML = html.join('');
        })
}
