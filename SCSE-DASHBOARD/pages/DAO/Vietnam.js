
window.addEventListener('load', loadData)

async function loadData() {
    fetch("https://owsnews.herokuapp.com/covid")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            document.getElementById("imgLogo").src = response.Logo;
            $('#TenCongTy').text(response.Name);
            $('#lv1').text(response.Field);
            $('#SoDienThoai').text(response.Phone);
            $('#mail').text(response.Email);
            $('#Fanpage2').text(response.Fanpage);
            $('#Youtube2').text(response.Youtube);


            $('#ID').val(response.ID);
            document.getElementById("LogoToChuc").src = response.Logo;
            $('#Name').val(response.Name);
            $('#Field').val(response.Field);
            $('#Phone').val(response.Phone);
            $('#Email').val(response.Email);
            $('#Address').val(response.Address);
            $('#Fanpage').val(response.Fanpage);
            $('#Youtube').val(response.Youtube);
        })
}

