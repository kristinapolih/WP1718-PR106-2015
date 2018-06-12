$(document).ready(function () {
    $("#posalji").click(function () {
        $.post("/api/korisnik/login", data)
            .done(function (data) {
                $("#username").content(data.KorisnickoIme);
                $("#login").hide();
                $("#logout").show();
                $("#registracijaIOpis").hide();
                $("#ulogovan").show();
            });
    });
});