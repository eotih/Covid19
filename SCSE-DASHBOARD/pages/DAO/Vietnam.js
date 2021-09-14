
window.addEventListener('load', loadData)
window.addEventListener('load', loadData2)

async function loadData() {
    fetch("https://owsnews.herokuapp.com/covid")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response.data)
            var tong = 0;
            for (let i = 0; i < response.data.length; i++) {
                tong += response.data[i].tong_nhiem;
            }
        })
}
async function loadData2() {
    fetch("https://static.pipezero.com/covid/data.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response.total)

        })
}

