$(document).ready(function () {
    window.onload = function refresh() {
        if (localStorage.getItem("user") != null) {
            if (localStorage.getItem("Admin") != null) {
                $("#username").text(localStorage.getItem("Admin"));
                $("#uloga").append(`<option value="Vozac" id="vozac" />`);
                $("#registracijaIOpis").show();
                $("#login").hide();
                $("#logout").show();
            }
        }
    }
    var dat = {
        KorisnickoIme: $("#korisnickoIme").val(),
        Lozinka: $("#lozinka").val()
    }
    $("#prijavise").click(function () {
        dat = {
            KorisnickoIme: $("#korisnickoIme").val(),
            Lozinka: $("#lozinka").val()
        }
        $.post("/api/korisnik/login", dat)
            .done(function (data) {
                if (data != null) {
                    if (data == "Ne postoji korisnik sa ovim Korisnickim imenom!") {
                        $("#message").text(data);
                    }
                    else if (data == "Pogresna lozinka ili korisnicko ime!") {
                        $("#message").text(data);
                    }
                    else if (data == "Pogresna Lozinka!") {
                        $("#message").text(data);
                    }
                    else if (data == "Admin") {
                        $("#username").text( dat.KorisnickoIme);
                        $("#uloga").append(`<option value="Vozac" id="vozac" />`);
                        $("#registracijaIOpis").show();
                        $("#login").hide();
                        $("#logout").show();
                        sessionStorage.setItem(dat.KorisnickoIme, dat.Lozinka);
                        localStorage.setItem("user", dat.KorisnickoIme);
                        localStorage.setItem("Admin", dat.KorisnickoIme);
                    }
                    else {
                        $("#username").text(dat.KorisnickoIme);
                        $("#login").hide();
                        $("#logout").show();
                        $("#registracijaIOpis").hide();
                        $("#ulogovan").show();
                        sessionStorage.setItem(dat.KorisnickoIme, dat.Lozinka);
                        localStorage.setItem(dat.KorisnickoIme, this.body);
                    }
                }
            });
    });

    $("#registrujse").click(function () {
        if ($("#uloga option:selected").val() == "" || $("#uloga option:selected").val() == " ") {
            $("#uloga option:selected").val("Musterija");
        }
        if ($("#email").val() == "" || $("#email").val() == " ") {
            $("#email").css("border-color", "crimson");
            $("#em p").show();
            $("#em br").hide();
            $("#email").focus();
        }
        else {
            if ($("#email").val().search('@') == -1) {
                $("#email").css("border-color", "crimson");
                $("#em p").show();
                $("#em p").text("Mora da postoji '@'!");
                $("#em br").hide();
                $("#email").focus();
            }
        }
        if ($("#telefon").val() == "" || $("#telefon").val() == " ") {
            $("#telefon").css("border-color", "crimson");
            $("#tel p").show();
            $("#tel br").hide();
            $("#telefon").focus();
        }
        else {
            let intRegex = /^\d+$/;
            let vall = $("#telefon").val();
            if (!intRegex.test(vall)) {
                $("#telefon").css("border-color", "crimson");
                $("#tel p").show();
                $("#tel p").text("Broj telefona mo&zcaron;e da sadr&zcaron;i samo brojeve!");
                $("#tel br").hide();
                $("#telefon").focus();
            }
        }
        if ($("#jmbg").val() == "" || $("#jmbg").val() == " ") {
            $("#jmbg").css("border-color", "crimson");
            $("#jm p").show();
            $("#jm br").hide();
            $("#jmbg").focus();
        }
        else {
            let intRegex = /^\d+$/;
            let vall = $("#jmbg").val();
            if ($("#jmbg").val().length != 13 || !intRegex.test(vall)) {
                $("#jmbg").css("border-color", "crimson");
                $("#jm p").show();
                $("#jm p").text("JMBG mora da ima 13 cifara, bez slova!");
                $("#jm br").hide();
                $("#jmbg").focus();
            }
        }
        if ($("#prezime").val() == "" || $("#prezime").val() == " ") {
            $("#prezime").css("border-color", "crimson");
            $("#prez p").show();
            $("#prez br").hide();
            $("#prezime").focus();
        }
        if ($("#ime").val() == "" || $("#ime").val() == " ") {
            $("#ime").css("border-color", "crimson");
            $("#im p").show();
            $("#im br").hide();
            $("#ime").focus();
        }
        if ($("#ponovljenaLozinka").val() == "" || $("#ponovljenaLozinka").val() == " ") {
            $("#ponovljenaLozinka").css("border-color", "crimson");
            $("#ploz p").show();
            $("#ploz br").hide();
            $("#ponovljenaLozinka").focus();
            $("#lozin").val("");
        }
        if ($("#lozin").val() == "" || $("#lozin").val() == " ") {
            $("#lozin").css("border-color", "crimson");
            $("#loz p").show();
            $("#loz br").hide();
            $("#lozin").focus();
            $("#ponovljenaLozinka").val("");
        }
        if ($("#korisnicko").val() == "" || $("#korisnicko").val() == " ") {
            $("#korisnicko").css("border-color", "crimson");
            $("#kor p").show();
            $("#kor br").hide();
            $("#korisnicko").focus();
        }
        if ($("#lozin").val() != $("#ponovljenaLozinka").val()) {
            $("#errorMessageReg").text("Lozinka i ponovljena loznika se ne podudaraju!");
            $("#lozin").val("");
            $("#ponovljenaLozinka").val("");
            $("#lozin").css("border-color", "crimson");
            $("#ponovljenaLozinka").css("border-color", "crimson");
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
                    if (data == "Korisni&ccaron;ko ime vec postoji") {
                        $("#errorMessageReg").text(data);
                        $("#korisnicko").css("border-color", "crimson");
                        $("#kor br").hide();
                        $("#korisnicko").focus();
                    }
                    else {
                        $("#login").hide();
                        $("#registracijaIOpis").hide();
                        $("#registrovan").show();
                    }
                });
        }
    });

    $("#prijav").click(function () {
        dat = {
            KorisnickoIme: $("#k").val(),
            Lozinka: $("#l").val()
        }
        $.post("/api/korisnik/login", dat)
            .done(function (dat) {
                if (dat != null) {
                    if (data == "Ne postoji korisnik sa ovim Korisnickim imenom!") {
                        $("#message").text(data);
                    }
                    else if (data == "Pogresna lozinka ili korisnicko ime!") {
                        $("#message").text(data);
                    }
                    else if (data == "Pogresna Lozinka!") {
                        $("#message").text(data);
                    }
                    else {
                        $("#username").text(dat.KorisnickoIme);
                        $("#registrovan").hide();
                        $("#logout").show();
                        $("#ulogovan").show();
                        $("#profilButton").show();
                        $("#odjavise").show();
                        sessionStorage.setItem(dat.KorisnickoIme, dat.Lozinka);
                        localStorage.setItem(dat.KorisnickoIme, this.body);
                    }
                }
            });
    });
});