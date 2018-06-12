$(document).ready(function () {
    $("#prijavise").click(function () {
        let data = {
            KorisnickoIme: $("#korisnickoIme").val(),
            Lozinka: $("#lozinka").val()
        }
        $.post("/api/korisnik/login", data)
            .done(function (data) {
                if (data != null) {
                    if (data == "Ne postoji korisnik sa ovim Korisnickim imenom!") {
                        $("#message").text(data);
                    }
                    else if (data == "Pogresna lozinka ili korisnicko ime!") {
                        $("#message").text(data);
                    }
                    else if (data == "Pogresna Lozinka!"){
                        $("#message").text(data);
                    }
                    else {
                        $("#username").text(data.KorisnickoIme);
                        $("#login").hide();
                        $("#logout").show();
                        $("#registracijaIOpis").hide();
                        $("#ulogovan").show();
                        sessionStorage.setItem(data);
                    }
                }
            });
    });

    $("#registrujse").click(function () {
        if ($("#korisnicko").val() == "" || $("#korisnicko").val() == " ") {
            $("#korisnicko").css("border-color", "crimson");
            $("#kor p").show();
            $("#kor br").hide();
        }
        if ($("#lozin").val() == "" || $("#lozin").val() == " ") {
            $("#lozin").css("border-color", "crimson");
            $("#loz p").show();
            $("#loz br").hide();
        }
        if ($("#ponovljenaLozinka").val() == "" || $("#ponovljenaLozinka").val() == " ") {
            $("#ponovljenaLozinka").css("border-color", "crimson");
            $("#ploz p").show();
            $("#ploz br").hide();
        }
        if ($("#ime").val() == "" || $("#ime").val() == " ") {
            $("#ime").css("border-color", "crimson");
            $("#im p").show();
            $("#im br").hide();
        }
        if ($("#prezime").val() == "" || $("#prezime").val() == " ") {
            $("#prezime").css("border-color", "crimson");
            $("#prez p").show();
            $("#prez br").hide();
        }
        if ($("#jmbg").val() == "" || $("#jmbg").val() == " ") {
            $("#jmbg").css("border-color", "crimson");
            $("#jm p").show();
            $("#jm br").hide();
        }
        else {
            let intRegex = /^\d+$/;
            let vall = $("#jmbg").val();
            if ($("#jmbg").val().length != 13 || !intRegex.test(vall)) {
                $("#jmbg").css("border-color", "crimson");
                $("#jm p").show();
                $("#jm p").text("JMBG mora da ima 13 cifara, bez slova!");
                $("#jm br").hide();
            }
        }
        if ($("#telefon").val() == "" || $("#telefon").val() == " ") {
            $("#telefon").css("border-color", "crimson");
            $("#tel p").show();
            $("#tel br").hide();
        }
        else {
            let intRegex = /^\d+$/;
            let vall = $("#telefon").val();
            if (!intRegex.test(vall)) {
                $("#telefon").css("border-color", "crimson");
                $("#tel p").show();
                $("#tel p").text("Broj telefon moze da sadrzi samo brojeve!");
                $("#tel br").hide();
            }
        }
        if ($("#email").val() == "" || $("#email").val() == " ") {
            $("#email").css("border-color", "crimson");
            $("#em p").show();
            $("#em br").hide();
        }
        else {
            if ($("#email").val().search('@') == -1) {
                $("#email").css("border-color", "crimson");
                $("#em p").show();
                $("#em p").text("Mora da postoji '@'!");
                $("#em br").hide();
            }
        }
        if ($("#uloga option:selected").val() == "" || $("#uloga option:selected").val() == " ") {
            $("#uloga option:selected").val("Musterija");
        }
        if ($("#lozin").val() != $("#ponovljenaLozinka").val()) {
            $("#errorMessageReg").text("Lozinka i ponovljena loznika se ne podudaraju!");
            $("#lozin").val("");
            $("#ponovljenaLozinka").val("");
            $("#lozin").addClass("errorRedBorders", function (index, errorRedBorders) { }); //ne radi
            $("#ponovljenaLozinka").addClass("errorRedBorders"); //ne radi
            $("#lozin").focus();
        }
        else {
            let data = {
                KorisnickoIme: $("#korisnicko").val(),
                Lozinka: $("#lozin").val(),
                Ime: $("#ime").val(),
                Prezime: $("#prezime").val(),
                JMBG: $("#jmbg").val(),
                Telefon: $("#telefon").val(),
                Email: $("#email").val(),
                Uloga: $("#uloga option:selected").val()
            }
            $.post("/api/Musterija/Registracija", data)
                .done(function (data) {

                });
        }
    });
});