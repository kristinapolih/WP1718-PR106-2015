$(document).ready(function () {

    window.onload = function refresh() {
        if (sessionStorage.getItem("user") !== null) {
            var head = this.sessionStorage.getItem("divheader");
            $("#divheader").html(head);
            var body = this.sessionStorage.getItem("divbody");
            $("#divbody").html(body);
        }
    };

    var dat = {
        KorisnickoIme: $("#korisnickoIme").val(),
        Lozinka: $("#lozinka").val()
    };

    $(document).on("click", "#prijavise", function () {
        let upis = true;
        if ($("#lozinka").val() === "" || $("#lozinka").val() === " ") {
            $("#lozinka").css("border-color", "crimson");
            $("#llozinka").focus();
            $("#message").text("Lozinka mora biti popunjena!");
            upis = false;
        }
        if ($("#korisnickoIme").val() === "" || $("#korisnickoIme").val() === " ") {
            $("#korisnickoIme").css("border-color", "crimson");
            $("#korisnickoIme").focus();
            $("#message").text("Korisni" + `&ccaron;` + "ko ime mora biti popunjeno!");
            upis = false;
        }
        if (upis) {
            dat = {
                KorisnickoIme: $("#korisnickoIme").val(),
                Lozinka: $("#lozinka").val()
            };
            $.ajax({
                url: "api/korisnik/login",
                data: dat,
                type: "GET",
                success: function (result) {
                    if (result !== null) {
                        if (result === "Ne postoji korisnik sa ovim Korisnickim imenom!") {
                            $("#message").text(result);
                        }
                        else if (result === "Pogresna lozinka ili korisnicko ime!") {
                            $("#message").text(result);
                        }
                        else if (result === "Pogresna Lozinka!") {
                            $("#message").text(result);
                        } 
                        else if (result === "Vec ste ulogovani!") {
                            $("#message").text(result);
                        }
                        else {
                            if (result.Uloga === "Admin") {
                                $("#uloga").append(`<option value="Vozac" id="vozac" />`);
                            }
                            $("#username").text(result.KorisnickoIme);
                            $("#login").hide();
                            $("#logout").show();
                            $("#registracijaIOpis").hide();
                            $("#ulogovan").show();
                            $("#profilButton").show();
                            sessionStorage.setItem("user", result.KorisnickoIme);
                            let divheader = $("#divheader").html();
                            sessionStorage.setItem("divheader", divheader);
                            let divbody = $("#divbody").html();
                            sessionStorage.setItem("divbody", divbody);
                        }
                    }
                }});
        }
    });

    $(document).on("click", "#registrujse", function () {
        var upis = true;
        if ($("#uloga option:selected").val() === "" || $("#uloga option:selected").val() === " ") {
            $("#uloga option:selected").val("Musterija");
        }
        if ($("#email").val() === "" || $("#email").val() === " ") {
            $("#email").css("border-color", "crimson");
            $("#em p").show();
            $("#em br").hide();
            $("#email").focus();
            upis = false;
        }
        else {
            if ($("#email").val().search('@') === -1) {
                $("#email").css("border-color", "crimson");
                $("#em p").show();
                $("#em p").text("Mora da postoji '@'!");
                $("#em br").hide();
                $("#email").focus();
                upis = false;
            }
        }
        if ($("#telefon").val() === "" || $("#telefon").val() === " ") {
            $("#telefon").css("border-color", "crimson");
            $("#tel p").show();
            $("#tel br").hide();
            $("#telefon").focus();
            upis = false;
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
                upis = false;
            }
        }
        if ($("#jmbg").val() === "" || $("#jmbg").val() === " ") {
            $("#jmbg").css("border-color", "crimson");
            $("#jm p").show();
            $("#jm br").hide();
            $("#jmbg").focus();
            upis = false;
        }
        else {
            let intRegex = /^\d+$/;
            let vall = $("#jmbg").val();
            if ($("#jmbg").val().length !== 13 || !intRegex.test(vall)) {
                $("#jmbg").css("border-color", "crimson");
                $("#jm p").show();
                $("#jm p").text("JMBG mora da ima 13 cifara, bez slova!");
                $("#jm br").hide();
                $("#jmbg").focus();
                upis = false;
            }
        }
        if ($("#prezime").val() === "" || $("#prezime").val() === " ") {
            $("#prezime").css("border-color", "crimson");
            $("#prez p").show();
            $("#prez br").hide();
            $("#prezime").focus();
            upis = false;
        }
        if ($("#ime").val() === "" || $("#ime").val() === " ") {
            $("#ime").css("border-color", "crimson");
            $("#im p").show();
            $("#im br").hide();
            $("#ime").focus();
            upis = false;
        }
        if ($("#ponovljenaLozinka").val() === "" || $("#ponovljenaLozinka").val() === " ") {
            $("#ponovljenaLozinka").css("border-color", "crimson");
            $("#ploz p").show();
            $("#ploz br").hide();
            $("#ponovljenaLozinka").focus();
            $("#lozin").val("");
            upis = false;
        }
        if ($("#lozin").val() === "" || $("#lozin").val() === " ") {
            $("#lozin").css("border-color", "crimson");
            $("#loz p").show();
            $("#loz br").hide();
            $("#lozin").focus();
            $("#ponovljenaLozinka").val("");
            upis = false;
        }
        if ($("#korisnicko").val() === "" || $("#korisnicko").val() === " ") {
            $("#korisnicko").css("border-color", "crimson");
            $("#kor p").show();
            $("#kor br").hide();
            $("#korisnicko").focus();
            upis = false;
        }
        if ($("#lozin").val() !== $("#ponovljenaLozinka").val()) {
            $("#errorMessageReg").text("Lozinka i ponovljena loznika se ne podudaraju!");
            $("#lozin").val("");
            $("#ponovljenaLozinka").val("");
            $("#lozin").css("border-color", "crimson");
            $("#ponovljenaLozinka").css("border-color", "crimson");
            $("#lozin").focus();
            upis = false;
        }
        if(upis) {
            let data = {
                KorisnickoIme: $("#korisnicko").val(),
                Lozinka: $("#lozin").val(),
                Ime: $("#ime").val(),
                Prezime: $("#prezime").val(),
                JMBG: $("#jmbg").val(),
                Telefon: $("#telefon").val(),
                Email: $("#email").val(),
                Uloga: $("#uloga option:selected").val()
            };
            $.post("/api/Musterija/Registracija", data)
                .done(function (data) {
                    if (data === "Korisnicko ime vec postoji") {
                        $("#errorMessageReg").text("Korisni" + `&ccaron;` +"ko ime vec postoji");
                        $("#korisnicko").css("border-color", "crimson");
                        $("#kor br").hide();
                        $("#korisnicko").focus();
                    }
                    else {
                        $("#login").hide();
                        $("#registracijaIOpis").hide();
                        $("#registrovan").show();
                        var divheader = $("#divheader").html();
                        sessionStorage.setItem("divheader", divheader);
                        var divbody = $("#divbody").html();
                        sessionStorage.setItem("divbody", divbody);
                    }
                });
        }
    });

    $(document).on("click", "#prijav", function () {
        let upis = true;
        if ($("#l").val() === "" || $("#l").val() === " ") {
            $("#l").css("border-color", "crimson");
            $("#l").focus();
            $("#mess").value("Lozinka mora biti popunjena!");
            upis = false;
        }
        if ($("#k").val() === "" || $("#k").val() === " ") {
            $("#k").css("border-color", "crimson");
            $("#k").focus();
            $("#mess").text("Korisni"+`&ccaron;`+"ko ime mora biti popunjeno!");
            upis = false;
        }
        if (upis) {
            dat = {
                KorisnickoIme: $("#k").val(),
                Lozinka: $("#l").val()
            };
            $.ajax({
                url: "api/korisnik/login",
                data: dat,
                type: "GET",
                success: function (result) {
                    if (result !== null) {
                        if (result === "Ne postoji korisnik sa ovim Korisnickim imenom!") {
                            $("#mess").text(result);
                        }
                        else if (result === "Pogresna lozinka ili korisnicko ime!") {
                            $("#mess").text(result);
                        }
                        else if (result === "Pogresna Lozinka!") {
                            $("#mess").text(result);
                        }
                        else if (result === "Vec ste ulogovani!") {
                            $("#mess").text(result);
                        }
                        else {
                            if (result.Uloga === "Admin") {
                                $("#uloga").append(`<option value="Vozac" id="vozac" />`);
                            }
                            $("#username").text(result.KorisnickoIme);
                            $("#login").hide();
                            $("#logout").show();
                            $("#registracijaIOpis").hide();
                            $("#ulogovan").show();
                            $("#profilButton").show();
                            sessionStorage.setItem("user", result.KorisnickoIme);
                            let divheader = $("#divheader").html();
                            sessionStorage.setItem("divheader", divheader);
                            let divbody = $("#divbody").html();
                            sessionStorage.setItem("divbody", divbody);
                        }
                    }
                }
            });
        }
    });

    $(document).on("click", "#odjavise", function () {
        let dat = {
            KorisnickoIme: sessionStorage.getItem("user")
        };
        $.ajax({
            url: "api/korisnik/logout",
            data: dat,
            type: "DELETE",
            success: function (result) {
                $("#l").val("");
                $("#k").val("");
                $("#lozinka").val("");
                $("#korisnickoIme").val("");
                sessionStorage.setItem("user", "");
                $("#login").show();
                $("#registracijaIOpis").show();
                $("#logout").hide();
                $("#ulogovan").hide();
                $("#profilButton").hide();
                $("#registrovan").hide();
                var divheader = $("#divheader").html();
                sessionStorage.setItem("divheader", divheader);
                var divbody = $("#divbody").html();
                sessionStorage.setItem("divbody", divbody);
            }
        });
    });
});