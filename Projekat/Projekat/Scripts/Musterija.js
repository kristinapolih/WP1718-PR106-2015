$(document).ready(function () {

    window.onload = function refresh() {
        if (sessionStorage.getItem("user") !== null) {
            var head = this.sessionStorage.getItem("divheader");
            $("#divheader").html(head);
            var body = this.sessionStorage.getItem("divbody");
            $("#divbody").html(body);
            if (this.sessionStorage.getItem("divmap") === "true") {
                Mapa();
            }
            if (sessionStorage.getItem("blokreload") === "true") {
                BlokReload();
                sessionStorage.setItem("blokreload", false);
            }
            else {
                sessionStorage.setItem("blokreload", false);
            }
            if (sessionStorage.getItem("pocetna") === "true") {
                PocetnaStrana();
                sessionStorage.setItem("pocetna", false);
            }
            BlokiraneOdjavi();
            $("#ulogovanMessage").html("");
        }
    };

    var dat = {
        KorisnickoIme: $("#korisnickoIme").val(),
        Lozinka: $("#lozinka").val()
    };

    var LokAdr = {
        xx: null,
        yy: null,
        ulica_broj: null,
        grad: null
    };

    function Mapa() {
        function reverseGeocode(coords) {
            fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
                .then(function (response) { return response.json(); }).then(function (json) {
                    var add = json.address;
                    LokAdr.ulica_broj = add.road; if (add.house_number !== null) {
                        LokAdr.ulica_broj += " " + add.house_number;
                    } LokAdr.grad = add.city + " " + add.postcode;
                });
        }

        var raster = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        var source = new ol.source.Vector({ wrapX: false });

        var vector = new ol.layer.Vector({
            source: source
        });

        var map = new ol.Map({
            layers: [raster, vector],
            target: 'map', view: new ol.View({
                center: [2209717.3810248757, 5660306.884676355], zoom: 19
            })
        });

        var draw;
        function addInteraction() {
            draw = new ol.interaction.Draw({
                source: source,
                type: "Point"
            });
            map.addInteraction(draw);
        }
        addInteraction();

        map.on('click', function (evt) {
            var coord = ol.proj.toLonLat(evt.coordinate); reverseGeocode(coord);
            LokAdr.xx = coord[0]; LokAdr.yy = coord[1];
        });
    }

    function Provera() {
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
                $("#em p").html("Mora da postoji '@'!");
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
                $("#tel p").html("Broj telefona mo" + `&zcaron;` + "e da sadr" + `&zcaron;` + "i samo brojeve!");
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
                $("#jm p").html("JMBG mora da ima 13 cifara, bez slova!");
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
        if ($("#lozin").val() !== $("#ponovljenaLozinka").val()) {
            $("#errorMessageReg").html("Lozinka i ponovljena loznika se ne podudaraju!");
            $("#lozin").val("");
            $("#ponovljenaLozinka").val("");
            $("#lozin").css("border-color", "crimson");
            $("#ponovljenaLozinka").css("border-color", "crimson");
            $("#lozin").focus();
            upis = false;
        }
        if ($("#korisnicko").val() === "" || $("#korisnicko").val() === " ") {
            $("#korisnicko").css("border-color", "crimson");
            $("#kor p").show();
            $("#kor br").hide();
            $("#korisnicko").focus();
            upis = false;
        }
        return upis;
    }

    function ProveraIzmene() {
        var upis = true;
        if ($("#izmenakemailv").val() === "" || $("#izmenakemailv").val() === " ") {
            $("#izmenakemailv").css("border-color", "crimson");
            $("#izmenaerrormessage").show();
            $("#izmenaerrormessage").html("Email ne sme biti prazan!");
            $("#izmenakemailv").focus();
            upis = false;
        }
        else {
            if ($("#izmenakemailv").val().search('@') === -1 || $("#izmenakemailv").val().search('@') === 0) {
                $("#izmenakemailv").css("border-color", "crimson");
                $("#izmenaerrormessage").show();
                $("#izmenaerrormessage").html("Mora da postoji '@'!");
                $("#izmenakemailv").focus();
                upis = false;
            }
        }
        if ($("#izmenatelefonv").val() === "" || $("#izmenatelefonv").val() === " ") {
            $("#izmenatelefonv").css("border-color", "crimson");
            $("#izmenaerrormessage").show();
            $("#izmenaerrormessage").html("Telefon ne sme biti prazan!");
            $("#izmenatelefonv").focus();
            upis = false;
        }
        else {
            let intRegex = /^\d+$/;
            let vall = $("#izmenatelefonv").val();
            if (!intRegex.test(vall)) {
                $("#izmenatelefonv").css("border-color", "crimson");
                $("#izmenaerrormessagep").show();
                $("#izmenaerrormessage").html("Broj telefona mo" + `&zcaron;` + "e da sadr" + `&zcaron;` + "i samo brojeve!");
                $("#izmenatelefonv").focus();
                upis = false;
            }
        }
        if ($("#izmenajmbgv").val() === "" || $("#izmenajmbgv").val() === " ") {
            $("#izmenajmbgv").css("border-color", "crimson");
            $("#izmenaerrormessage").show();
            $("#izmenaerrormessage").html("JMBG ne sme biti prazan!");
            $("#izmenajmbgv").focus();
            upis = false;
        }
        else {
            let intRegex = /^\d+$/;
            let vall = $("#izmenajmbgv").val();
            if ($("#izmenajmbgv").val().length !== 13 || !intRegex.test(vall)) {
                $("#izmenajmbgv").css("border-color", "crimson");
                $("#izmenaerrormessage").show();
                $("#izmenaerrormessage").html("JMBG mora da ima 13 cifara, bez slova!");
                $("#izmenajmbgv").focus();
                upis = false;
            }
        }
        if ($("#izmenaprezimev").val() === "" || $("#izmenaprezimev").val() === " ") {
            $("#izmenaprezimev").css("border-color", "crimson");
            $("#izmenaerrormessage").show();
            $("#izmenaerrormessage").html("Prezime ne sme biti prazno!")
            $("#izmenaprezimev").focus();
            upis = false;
        }
        if ($("#izmenaimev").val() === "" || $("#izmenaimev").val() === " ") {
            $("#izmenaimev").css("border-color", "crimson");
            $("#izmenaerrormessage").show();
            $("#izmenaerrormessage").html("Ime ne sme biti prazno!")
            $("#izmenaimev").focus();
            upis = false;
        }
        if ($("#izmenaplozv").val() === "" || $("#izmenaplozv").val() === " ") {
            $("#izmenaplozv").css("border-color", "crimson");
            $("#izmenaerrormessage").show();
            $("#izmenaerrormessage").text("Ponovljena lozinka ne sme biti prazna!")
            $("#izmenaplozv").focus();
            $("#lozin").val("");
            upis = false;
        }
        if ($("#izmenalozv").val() === "" || $("#izmenalozv").val() === " ") {
            $("#izmenalozv").css("border-color", "crimson");
            $("#izmenaerrormessage").show();
            $("#izmenaerrormessage").html("Lozinka ne sme biti prazna!")
            $("#izmenalozv").focus();
            $("#izmenaplozv").val("");
            upis = false;
        }
        if ($("#izmenalozv").val() !== $("#izmenaplozv").val()) {
            $("#izmenaerrormessage").html("Lozinka i ponovljena loznika se ne podudaraju!");
            $("#izmenalozv").val("");
            $("#izmenaplozv").val("");
            $("#izmenalozv").css("border-color", "crimson");
            $("#izmenaplozv").css("border-color", "crimson");
            $("#izmenalozv").focus();
            upis = false;
        }
        if ($("#izmenakimev").val() === "" || $("#izmenakimev").val() === " ") {
            $("#izmenakimev").css("border-color", "crimson");
            $("#izmenaerrormessage").show();
            $("#izmenaerrormessage").html("Korisni" +`&ccaron;`+"ko ime ne sme biti prazna!")
            $("#korisnickoizmenakimev").focus();
            upis = false;
        }
        return upis;
    }

    function ProveraRegVozaca() {
        var upis = true;
        if ($("#dodajVozacaRegistracija #uloga option:selected").val() === "" || $("#dodajVozacaRegistracija #uloga option:selected").val() === " ") {
            $("#dodajVozacaRegistracija #uloga option:selected").val("Vozac");
        }
        if ($("#dodajVozacaRegistracija #email").val() === "" || $("#dodajVozacaRegistracija #email").val() === " ") {
            $("#dodajVozacaRegistracija #email").css("border-color", "crimson");
            $("#dodajVozacaRegistracija #em p").show();
            $("#dodajVozacaRegistracija #em br").hide();
            $("#dodajVozacaRegistracija #email").focus();
            upis = false;
        }
        else {
            if ($("#dodajVozacaRegistracija #email").val().search('@') === -1) {
                $("#dodajVozacaRegistracija #email").css("border-color", "crimson");
                $("#dodajVozacaRegistracija #em p").show();
                $("#dodajVozacaRegistracija #em p").html("Mora da postoji '@'!");
                $("#dodajVozacaRegistracija #em br").hide();
                $("#dodajVozacaRegistracija #email").focus();
                upis = false;
            }
        }
        if ($("#dodajVozacaRegistracija #telefon").val() === "" || $("#dodajVozacaRegistracija #telefon").val() === " ") {
            $("#dodajVozacaRegistracija #telefon").css("border-color", "crimson");
            $("#dodajVozacaRegistracija #tel p").show();
            $("#dodajVozacaRegistracija #tel br").hide();
            $("#dodajVozacaRegistracija #telefon").focus();
            upis = false;
        }
        else {
            let intRegex = /^\d+$/;
            let vall = $("#dodajVozacaRegistracija #telefon").val();
            if (!intRegex.test(vall)) {
                $("#dodajVozacaRegistracija #telefon").css("border-color", "crimson");
                $("#dodajVozacaRegistracija #tel p").show();
                $("#dodajVozacaRegistracija #tel p").html("Broj telefona mo" + `&zcaron;` + "e da sadr" + `&zcaron;` + "i samo brojeve!");
                $("#dodajVozacaRegistracija #tel br").hide();
                $("#dodajVozacaRegistracija #telefon").focus();
                upis = false;
            }
        }
        if ($("#dodajVozacaRegistracija #jmbg").val() === "" || $("#dodajVozacaRegistracija #jmbg").val() === " ") {
            $("#dodajVozacaRegistracija #jmbg").css("border-color", "crimson");
            $("#dodajVozacaRegistracija #jm p").show();
            $("#dodajVozacaRegistracija #jm br").hide();
            $("#dodajVozacaRegistracija #jmbg").focus();
            upis = false;
        }
        else {
            let intRegex = /^\d+$/;
            let vall = $("#dodajVozacaRegistracija #jmbg").val();
            if ($("#dodajVozacaRegistracija #jmbg").val().length !== 13 || !intRegex.test(vall)) {
                $("#dodajVozacaRegistracija #jmbg").css("border-color", "crimson");
                $("#dodajVozacaRegistracija #jm p").show();
                $("#dodajVozacaRegistracija #jm p").html("JMBG mora da ima 13 cifara, bez slova!");
                $("#dodajVozacaRegistracija #jm br").hide();
                $("#dodajVozacaRegistracija #jmbg").focus();
                upis = false;
            }
        }
        if ($("#dodajVozacaRegistracija #prezime").val() === "" || $("#dodajVozacaRegistracija #prezime").val() === " ") {
            $("#dodajVozacaRegistracija #prezime").css("border-color", "crimson");
            $("#dodajVozacaRegistracija #prez p").show();
            $("#dodajVozacaRegistracija #prez br").hide();
            $("#dodajVozacaRegistracija #prezime").focus();
            upis = false;
        }
        if ($("#dodajVozacaRegistracija #ime").val() === "" || $("#dodajVozacaRegistracija #ime").val() === " ") {
            $("#dodajVozacaRegistracija #ime").css("border-color", "crimson");
            $("#dodajVozacaRegistracija #im p").show();
            $("#dodajVozacaRegistracija #im br").hide();
            $("#dodajVozacaRegistracija #ime").focus();
            upis = false;
        }
        if ($("#dodajVozacaRegistracija #ponovljenaLozinka").val() === "" || $("#dodajVozacaRegistracija #ponovljenaLozinka").val() === " ") {
            $("#dodajVozacaRegistracija #ponovljenaLozinka").css("border-color", "crimson");
            $("#dodajVozacaRegistracija #ploz p").show();
            $("#dodajVozacaRegistracija #ploz br").hide();
            $("#dodajVozacaRegistracija #ponovljenaLozinka").focus();
            $("#dodajVozacaRegistracija #lozin").val("");
            upis = false;
        }
        if ($("#dodajVozacaRegistracija #lozin").val() === "" || $("#dodajVozacaRegistracija #lozin").val() === " ") {
            $("#dodajVozacaRegistracija #lozin").css("border-color", "crimson");
            $("#dodajVozacaRegistracija #loz p").show();
            $("#dodajVozacaRegistracija #loz br").hide();
            $("#dodajVozacaRegistracija #lozin").focus();
            $("#dodajVozacaRegistracija #ponovljenaLozinka").val("");
            upis = false;
        }
        if ($("#dodajVozacaRegistracija #lozin").val() !== $("#dodajVozacaRegistracija #ponovljenaLozinka").val()) {
            $("#dodajVozacaRegistracija #errorMessageReg").html("Lozinka i ponovljena loznika se ne podudaraju!");
            $("#dodajVozacaRegistracija #lozin").val("");
            $("#dodajVozacaRegistracija #ponovljenaLozinka").val("");
            $("#dodajVozacaRegistracija #lozin").css("border-color", "crimson");
            $("#dodajVozacaRegistracija #ponovljenaLozinka").css("border-color", "crimson");
            $("#dodajVozacaRegistracija #lozin").focus();
            upis = false;
        }
        if ($("#dodajVozacaRegistracija #korisnicko").val() === "" || $("#dodajVozacaRegistracija #korisnicko").val() === " ") {
            $("#dodajVozacaRegistracija #korisnicko").css("border-color", "crimson");
            $("#dodajVozacaRegistracija #kor p").show();
            $("#dodajVozacaRegistracija #kor br").hide();
            $("#dodajVozacaRegistracija #korisnicko").focus();
            upis = false;
        }
        return upis;
    }

    function OdjaviSe() {
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
                $("#uloga").html(`<option value="Mu&scaron;terija" id="musterija" />`);
                $("#login").show();
                $("#registracijaIOpis").show();
                $("#logout").hide();
                $("#ulogovan").hide();
                $("#profilButton").hide();
                $("#registrovan").hide();
                $("#dodajVozacaPolja").hide();
                $("#dodajVozacaButton").hide();
                $("#headerButtons").hide();
                $("#dodajVoznjuButton").hide();
                $("#dodajVoznjuPolja").hide();
                $("#blokiraj").hide();
                $("#blok").hide();
                $("#divtabelapretrage").hide();
                $("#vozac").html("");
                $("#profil").hide();
                var divheader = $("#divheader").html();
                sessionStorage.setItem("divheader", divheader);
                var divbody = $("#divbody").html();
                sessionStorage.setItem("divbody", divbody);
            }
        });
    }

    function BlokiraneOdjavi() {
        $.ajax({
            url: "api/Korisnik/GetBlokiraneVozace",
            data: "",
            type: "GET",
            success: function (result) {
                if (result !== "Ne postoje blokirani korisnici!") {
                    let sessionUser = sessionStorage.getItem("user");
                    for (var k in result) {
                        if (result[k].KorisnickoIme === sessionUser) {
                            OdjaviSe();
                            $("#message").text("Blokirani ste!");
                        }
                    }
                }
            }
        });
        $.ajax({
            url: "api/Korisnik/GetBlokiraneKorisnike",
            data: "",
            type: "GET",
            success: function (result) {
                if (result !== "Ne postoje blokirani korisnici!") {
                    let sessionUser = sessionStorage.getItem("user");
                    for (var k in result) {
                        if (result[k].KorisnickoIme === sessionUser) {
                            OdjaviSe();
                            $("#message").text("Blokirani ste!");
                        }
                    }
                }
            }
        });
    }

    $(document).on("click", "#prijavise", function () {
        let upis = true;
        if ($("#lozinka").val() === "" || $("#lozinka").val() === " ") {
            $("#lozinka").css("border-color", "crimson");
            $("#llozinka").focus();
            $("#message").html("Lozinka mora biti popunjena!");
            upis = false;
        }
        if ($("#korisnickoIme").val() === "" || $("#korisnickoIme").val() === " ") {
            $("#korisnickoIme").css("border-color", "crimson");
            $("#korisnickoIme").focus();
            $("#message").html("Korisni&ccaron;ko ime mora biti popunjeno!");
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
                            $("#message").html("Ne postoji korisnik sa ovim korisni&ccaron;kim imenom!");
                        }
                        else if (result === "Pogresna lozinka ili korisnicko ime!") {
                            $("#message").html("Pogre&scaron;na lozinka ili korisni&ccaron;ko ime!");
                        }
                        else if (result === "Pogresna Lozinka!") {
                            $("#message").html("Pogre&scaron;na lozinka!");
                        }
                        else if (result === "Vec ste ulogovani!") {
                            $("#message").html("Ve&cacute; ste ulogovani!");
                        }
                        else if (result === "Blokirani ste!") {
                            $("#message").html("Blokirani ste!");
                        }
                        else if (result === "null") {
                            $("#message").html("Unesite ponovo podatke!");
                        }
                        else {
                            if (result.Uloga === 0) {
                                $("#uloga").html(`<option value="Voza&ccaron;" id="vozac" />`);
                                $("#dodajVozacaButton").show();
                                $("#dodajVoznjuButton").show();
                                $("#blokiraj").show();
                            }
                            if (result.Uloga === 2) {
                                $("#dodajVoznjuButton").show();
                            }
                            $("#message").html("");
                            $("#username").text(result.KorisnickoIme);
                            $("#login").hide();
                            $("#logout").show();
                            $("#registracijaIOpis").hide();
                            $("#ulogovan").show();
                            $("#profilButton").show();

                            sessionStorage.setItem("user", result.KorisnickoIme);
                            sessionStorage.setItem(result.KorisnickoIme, result.Uloga);
                            let divheader = $("#divheader").html();
                            sessionStorage.setItem("divheader", divheader);
                            let divbody = $("#divbody").html();
                            sessionStorage.setItem("divbody", divbody);
                            PocetnaStrana();
                        }
                    }
                }
            });
        }
    });

    $(document).on("click", "#registrujse", function () {
        if (Provera()) {
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
                        $("#errorMessageReg").html("Korisni&ccaron;ko ime vec postoji");
                        $("#korisnicko").css("border-color", "crimson");
                        $("#kor br").hide();
                        $("#errorMessageReg").show();
                        $("#korisnicko").focus();
                    }
                    else if (data === "null") {
                        $("#errorMessageReg").html("Unesite ponovo podatke!");
                        $("#korisnicko").css("border-color", "crimson");
                        $("#errorMessageReg").show();
                    }
                    else {
                        $("#errorMessageReg").hide();
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
        $("#uloga option:selected").val("");
        $("#email").val("");
        $("#telefon").val("");
        $("#jmbg").val("");
        $("#prezime").val("");
        $("#ime").val("");
        $("#ponovljenaLozinka").val("");
        $("#lozin").val("");
        $("#korisnicko").val("");

        let upis = true;
        if ($("#l").val() === "" || $("#l").val() === " ") {
            $("#l").css("border-color", "crimson");
            $("#l").focus();
            $("#mess").value("Lozinka ne sme biti prazna!");
            upis = false;
        }
        if ($("#k").val() === "" || $("#k").val() === " ") {
            $("#k").css("border-color", "crimson");
            $("#k").focus();
            $("#mess").text("Korisni" + `&ccaron;` + "ko ime ne sme biti prazno!");
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
                            $("#mess").html("Ne postoji korisnik sa ovim korisni&ccaron;kim imenom!");
                        }
                        else if (result === "Pogresna lozinka ili korisnicko ime!") {
                            $("#mess").html("Pogre&scaron;na lozinka ili korisni&ccaron;ko ime!");
                        }
                        else if (result === "Pogresna Lozinka!") {
                            $("#mess").html("Pogre&scaron;na lozinka!");
                        }
                        else if (result === "Vec ste ulogovani!") {
                            $("#mess").html("Ve&cacute; ste ulogovani!");
                        }
                        else if (result === "null") {
                            $("#mess").html("Unesite ponovo");
                        }
                        else {
                            if (result.Uloga === 2) {
                                $("#dodajVoznjuButton").show();
                            }
                            $("#username").text(result.KorisnickoIme);
                            $("#login").hide();
                            $("#logout").show();
                            $("#registracijaIOpis").hide();
                            $("#ulogovan").show();
                            $("#profilButton").show();
                            $("#mess").html("");
                            sessionStorage.setItem("user", result.KorisnickoIme);
                            sessionStorage.setItem(result.KorisnickoIme, result);
                            let divheader = $("#divheader").html();
                            sessionStorage.setItem("divheader", divheader);
                            let divbody = $("#divbody").html();
                            sessionStorage.setItem("divbody", divbody);
                            PocetnaStrana();
                        }
                    }
                }
            });
        }
    });

    $(document).on("click", "#odjavise", function () {
        OdjaviSe();
    });

    $(document).on("focusout", "#dodajVozacaRegistracija #korisnicko", function () {
        $("#vozackorime").val($("#dodajVozacaRegistracija #korisnicko").val());
    });

    $(document).on("click", "#dodajVozacaButton", function () {
        let reg = $("#registracija").html();
        $("#dodajVozacaRegistracija").html(reg);
        $("#dodajVozacaPolja").show();
        $("#dodajVozacaRegistracija #registrujse").hide();
        $("#blok").hide();
        $("#dodajVoznjuPolja").hide();
        $("#divtabelapretrage").hide();
        $("#ulogovan").hide();
        $("#registrovan").hide();
        $("#registracijaIOpis").hide();
        $("#profil").hide();

        var stringMapa = "<div id=\"map\"></div>";
        $("#mapaDodajVozaca").html(stringMapa);
        $("#mapaDodajVozaca").show();
        $("#map").css("height", "300px");
        $("#map").css("width", "100%");
        Mapa();

        var divheader = $("#divheader").html();
        sessionStorage.setItem("divheader", divheader);
        var divbody = $("#divbody").html();
        sessionStorage.setItem("divbody", divbody);
        sessionStorage.setItem("divmap", true);
    });

    $(document).on("click", "#registrujvozaca", function () {

        var upis = true;
        if ($("#tipautomobila option:selected").val() === "" || $("#tipautomobila option:selected").val() === " ") {
            $("#tipautomobila option:selected").val("Putnicki");
        }
        if ($("#godiste").val() === "" || $("#godiste").val() === " ") {
            $("#godiste").css("border-color", "crimson");
            $("#god p").show();
            $("#god br").hide();
            $("#godiste").focus();
            upis = false;
        }
        else {
            let intRegex = /^\d+$/;
            let vall = $("#godiste").val();
            if (!intRegex.test(vall)) {
                $("#godiste").css("border-color", "crimson");
                $("#god p").show();
                $("#god p").html("Godi&scaron;te mo&zcaron;e da sadr&zcaron;i samo brojeve!");
                $("#god br").hide();
                $("#godiste").focus();
                upis = false;
            }
            else if ($("#godiste").val().length !== 4) {
                $("#godiste").css("border-color", "crimson");
                $("#god p").show();
                $("#god p").html("Godi&scaron;te mo&zcaron;e da sadr&zcaron;i samo 4 broja!");
                $("#god br").hide();
                $("#godiste").focus();
                upis = false;
            }
        }
        if (LokAdr.xx === null || LokAdr.yy === null || LokAdr.ulica_broj === null || LokAdr.grad === null) {
            $("#map p").show();
            upis = false;
        }

        var prov = ProveraRegVozaca();
        if (upis && prov) {
            let data = {
                KorisnickoIme: $("#dodajVozacaRegistracija #korisnicko").val(),
                Lozinka: $("#dodajVozacaRegistracija #lozin").val(),
                Ime: $("#dodajVozacaRegistracija #ime").val(),
                Prezime: $("#dodajVozacaRegistracija #prezime").val(),
                JMBG: $("#dodajVozacaRegistracija #jmbg").val(),
                Telefon: $("#dodajVozacaRegistracija #telefon").val(),
                Email: $("#dodajVozacaRegistracija #email").val(),
                Uloga: $("#dodajVozacaRegistracija #uloga option:selected").val()
            };

            let auto = {
                KorisnickoIme: $("#vozackorime").val(),
                GodisteAutomobila: $("#godiste").val(),
                TipAutomobila: $("#tipautomobila option:selected").val(),
                xlong: LokAdr.xx,
                ylatit: LokAdr.yy,
                UlicaiBroj: LokAdr.ulica_broj,
                MestoiPostanski: LokAdr.grad
            };

            $.ajax({
                url: "api/Musterija/RegistracijaVozaca",
                data: data,
                type: "POST",
                success: function (result) {
                    if (result === "Korisnicko ime vec postoji") {
                        $("#dodajVozacaRegistracija #errorMessageReg").html("Korisni&ccaron;ko ime ve&cacute; postoji!");
                        $("#korisnicko").css("border-color", "crimson");
                        $("#kor br").hide();
                        $("#korisnicko").focus();
                    }
                    else if (result === "null") {
                        $("#dodajVozacaRegistracija #errorMessageReg").html("Unesite ponovo podatke!");
                    }
                }
            });

            $.ajax({
                url: "api/Musterija/ail",
                data: auto,
                type: "POST",
                success: function (result) {
                    if (result === "null") {
                        $("#dodajVozacaRegistracija #errorMessageReg").html("Unesite ponovo podatke!");
                    }
                    else {
                        $("#login").hide();
                        $("#registracijaIOpis").hide();
                        $("#registrovan").hide();
                        $("#dodajVozacaPolja").hide();
                        $("#map").hide();
                        $("#logout").show();
                        $("#ulogovan").show();
                        $("#profilButton").show();
                        var divheader = $("#divheader").html();
                        sessionStorage.setItem("divheader", divheader);
                        var divbody = $("#divbody").html();
                        sessionStorage.setItem("divbody", divbody);
                    }
                }
            });
            $("#mapaDodajVozaca").html("");
            sessionStorage.setItem("divmap", false);
        }
    });

    $(document).on("click", "#dodajVoznjuButton", function () {
        BlokiraneOdjavi();

        $("#divtabelapretrage").hide();
        $("#registracijaIOpis").hide();
        $("#registrovan").hide();
        $("#ulogovan").hide();
        $("#dodajVozacaPolja").hide();
        $("#blok").hide();
        $("#dodajVoznjuPolja").show();
        $("#narucivoznju").show();
        $("#errormapadodajvoznju").hide();
        $("#profil").hide();
        $("tipautadodajvoznju").val("");

        $("#mapaDodajVozaca").html("");
        var stringMapa = "<div id=\"map\" style=\"text-align: center; justify - content: center\"></div>";
        $("#mapaDodajVoznju").html(stringMapa);
        $("#mapaDodajVoznju").show();
        $("#map").css("height", "350px");
        $("#map").css("width", "100%");
        Mapa();

        var divheader = $("#divheader").html();
        sessionStorage.setItem("divheader", divheader);
        var divbody = $("#divbody").html();
        sessionStorage.setItem("divbody", divbody);
        sessionStorage.setItem("divmap", true);
    });

    $(document).on("click", "#narucivoznju", function () {
        BlokiraneOdjavi();

        var lok = {
            KorisnickoIme: $("#username").text(),
            TipAutomobila: sessionStorage.getItem("tipautomobilaa"),
            xlong: LokAdr.xx,
            ylatit: LokAdr.yy,
            UlicaiBroj: LokAdr.ulica_broj,
            MestoiPostanski: LokAdr.grad
        };

        let upis = true;
        if (LokAdr.xx === null || LokAdr.yy === null || LokAdr.ulica_broj === null || LokAdr.grad === null) {
            $("#errormapadodajvoznju").show();
            upis = false;
        }
        else if (LokAdr.xx === "null" || LokAdr.yy === "null" || LokAdr.ulica_broj === "null" || LokAdr.grad === "null") {
            $("#errormapadodajvoznju").show();
            upis = false;
        }
        else if (lok.TipAutomobila === null || lok.TipAutomobila === "null") {
            lok.TipAutomobila = "Putnicki";
        }
        if (upis) {
            $.ajax({
                url: "api/Voznja/poruciVoznju",
                data: lok,
                type: "POST",
                success: function (result) {
                    if (result === "Ne mozete da narucite sledecu voznju!") {
                        $("#ulogovanMessage").html("Ne mo&zcaron;ete da naru&ccaron;ite vo&zcaron;nju, prethodna nije zavr&scaron;ena!");
                        $("#ulogovanMessage").show();
                    }
                    if (result === "null") {
                        $("#ulogovanMessage").html("Unesite ponovo podatke!");
                        $("#ulogovanMessage").show();
                    }
                    $("#login").hide();
                    $("#registracijaIOpis").hide();
                    $("#registrovan").hide();
                    $("#dodajVozacaPolja").hide();
                    $("#narucivoznju").hide();
                    $("#map").hide();
                    $("#narucivoznju").hide();
                    $("#errormapadodajvoznju").hide();
                    $("#logout").show();
                    $("#ulogovan").show();
                    $("#profilButton").show();
                    var divheader = $("#divheader").html();
                    sessionStorage.setItem("divheader", divheader);
                    var divbody = $("#divbody").html();
                    sessionStorage.setItem("divbody", divbody);
                    sessionStorage.setItem("divmap", "");
                    PocetnaStrana();
                }
            });
        }
        $("#mapaDodajVozaca").html("");
        sessionStorage.setItem("divmap", true);
        sessionStorage.setItem("tipautomobilaa", "");
    });

    $(document).on("click", "#blokiraj", function () {
        $("#registracijaIOpis").hide();
        $("#dodajVozacaPolja").hide();
        $("#dodajVoznjuPolja").hide();
        $("#registrovan").hide();
        $("#ulogovan").hide();
        $("#blok").show();
        $("#divtabelapretrage").hide();
        $("#profil").hide();
        $("#errorBlokiraj").html("");
        $("#errorOdlokiraj").html("");

        BlokReload();
        UnblokReload();

        var divheader = $("#divheader").html();
        sessionStorage.setItem("divheader", divheader);
        var divbody = $("#divbody").html();
        sessionStorage.setItem("divbody", divbody);
        sessionStorage.setItem("divmap", false);
        sessionStorage.setItem("blokreload", true);
    });
    
    $(document).on("click", "#blokirajkime", function () {
        $("#errorOdlokiraj").html("");
        let k = $(this).attr("name");
            let blok = {
                korisckoImeBlokiraj: k
            };

            $.ajax({
                url: "api/Korisnik/Blokiraj",
                data: blok,
                type: "GET",
                success: function (result) {
                    if (result === "Ne postoji korisnik sa trazenim imenom!") {
                        $("#errorBlokiraj").html("Ne postoji korisnik sa tra&zcaron;enim imenom!");
                    }
                    else {
                        $("#errorBlokiraj").html("Korisnik " + `<b>` + result + `</b>` + " uspe&scaron;no blokiran!");
                        $("#korisckoImeBlokiraj").val("");
                        BlokReload();
                        UnblokReload();
                        var divheader = $("#divheader").html();
                        sessionStorage.setItem("divheader", divheader);
                        var divbody = $("#divbody").html();
                        sessionStorage.setItem("divbody", divbody);
                        sessionStorage.setItem("divmap", "");
                        sessionStorage.setItem("blokreload", true);
                    }
                }
            });
        
    });

    $(document).on("click", "#odblokirajkime", function () {
        $("#errorBlokiraj").html("");
        let k = $(this).attr("name");
            let blok = {
                korisckoImeOdblokiraj: k
            };

            $.ajax({
                url: "api/Korisnik/Odblokiraj",
                data: blok,
                type: "GET",
                success: function (result) {
                    if (result === "Ne postoji korisnik sa trazenim imenom!") {
                        $("#errorOdlokiraj").html("Ne postoji korisnik sa tra" + `&zcaron;` + "enim imenom!");
                    }
                    else {
                        $("#errorOdlokiraj").html("Korisnik " + `<b>` + result + `</b>` + " uspe&scaron;no odblokiran!");
                        $("#korisckoImeBlokirani").val("");
                        BlokReload();
                        UnblokReload();
                        var divheader = $("#divheader").html();
                        sessionStorage.setItem("divheader", divheader);
                        var divbody = $("#divbody").html();
                        sessionStorage.setItem("divbody", divbody);
                        sessionStorage.setItem("divmap", "");
                        sessionStorage.setItem("blokreload", true);
                    }
                }
            });
    });

    function UnblokReload() {
        $.ajax({
            url: "api/Korisnik/GetBlokiraneKorisnike",
            data: "",
            type: "GET",
            success: function (result) {
                if (result === "Ne postoje blokirani korisnici!") {
                    $.ajax({
                        url: "api/Korisnik/GetBlokiraneVozace",
                        data: "",
                        type: "GET",
                        success: function (voz) {
                            if (voz === "Ne postoje blokirani korisnici!") {
                                let blok = "<p>Ne postoje blokirani korisnici!</p><br/>";
                                $("#odbloksvikorisnici").html(blok);
                            }
                            else {
                                var blok = "<br/><table border=\"1\" style=\"border-color:slategray; background-color:lemonchiffon\"><tr><td width=\"130px\"><b>Korisni&ccaron;ko Ime</b></td><td width=\"100px\"><b>Uloga</b></td><td width=\"100px\"><b>Ime</b></td><td width=\"100px\"><b>Prezime</b></td><td width=\"100px\">&nbsp;</td></tr>";
                                for (var k in voz) {
                                    blok += "<tr><td>" + voz[k].KorisnickoIme + "</td>";
                                    blok += "<td>Voza" + `&ccaron;` + "</td>";
                                    blok += "<td>" + voz[k].Ime + "</td>";
                                    blok += "<td>" + voz[k].Prezime + "</td>";
                                    blok += "<td><input id=\"odblokirajkime\" name=\"" + voz[k].KorisnickoIme + "\" type=\"submit\" value=\"Odblokiraj\" class=\"buttons\"/></tr>";
                                }
                                blok += "</table><br/>";
                                $("#odbloksvikorisnici").html(blok);
                                sessionStorage.setItem("blokreload", true);
                            }
                        }
                    });
                }
                else {
                    var blok = "<br/><table border=\"1\" style=\"border-color:slategray; background-color:lemonchiffon\"><tr><td width=\"130px\"><b>Korisni&ccaron;ko Ime</b></td><td width=\"100px\"><b>Uloga</b></td><td width=\"100px\"><b>Ime</b></td><td width=\"100px\"><b>Prezime</b></td><td width=\"100px\">&nbsp;</td></tr>";
                                for (var k in result) {
                        blok += "<tr><td>" + result[k].KorisnickoIme + "</td>";
                        blok += "<td>Mu" + `&scaron;` + "terija</td>";
                        blok += "<td>" + result[k].Ime + "</td>";
                        blok += "<td>" + result[k].Prezime + "</td>";
                        blok += "<td><input id=\"odblokirajkime\" name=\"" + result[k].KorisnickoIme + "\" type=\"submit\" value=\"Odblokiraj\" class=\"buttons\"/></tr>";
                    }
                    blok += "</table>";
                    $("#odbloksvikorisnici").html(blok);
                    $.ajax({
                        url: "api/Korisnik/GetBlokiraneVozace",
                        data: "",
                        type: "GET",
                        success: function (voz) {
                            if (voz !== "Ne postoje blokirani korisnici!") {
                                var blok = "<table border=\"1\" style=\"border-color:slategray; background-color:lemonchiffon\">";
                                for (var k in voz) {
                                    blok += "<tr><td width=\"130px\">" + voz[k].KorisnickoIme + "</td>";
                                    blok += "<td width=\"100px\">Voza" + `&ccaron;` + "</td>";
                                    blok += "<td width=\"100px\">" + voz[k].Ime + "</td>";
                                    blok += "<td width=\"100px\">" + voz[k].Prezime + "</td>";
                                    blok += "<td width=\"100px\"><input id=\"odblokirajkime\" name=\"" + voz[k].KorisnickoIme + "\" type=\"submit\" value=\"Odblokiraj\" class=\"buttons\"/></tr>";
                                }
                                blok += "</table><br/><br/>";
                                $("#odbloksvikorisnici").append(blok);
                                sessionStorage.setItem("blokreload", true);
                            }
                        }
                    });
                }
            }
        });
    }

    function BlokReload() {
        $.ajax({
            url: "api/Korisnik/GetAllKorisnike",
            data: "",
            type: "GET",
            success: function (result) {
                if (result === "Ne postoje blokirani korisnici!") {
                    $.ajax({
                        url: "api/Korisnik/GetAllVozace",
                        data: "",
                        type: "GET",
                        success: function (voz) {
                            if (voz === "") {
                                let blok = "<p>Ne postoje korisnici koji nisu blokirani!</p>";
                                $("#bloksvikorisnici").html(blok);
                            }
                            else {
                                var blok = "<br/><table border=\"1\" style=\"border-color:slategray; background-color:lemonchiffon\"><tr><td width=\"130px\"><b>Korisni&ccaron;ko Ime</b></td><td width=\"100px\"><b>Uloga</b></td><td width=\"100px\"><b>Ime</b></td><td width=\"100px\"><b>Prezime</b></td><td width=\"100px\">&nbsp;</td></tr>";
                                for (var k in voz) {
                                    blok += "<tr><td>" + voz[k].KorisnickoIme + "</td>";
                                    blok += "<td>Voza" + `&ccaron;` + "</td>";
                                    blok += "<td>" + voz[k].Ime + "</td>";
                                    blok += "<td>" + voz[k].Prezime + "</td>";
                                    blok += "<td><input id=\"blokirajkime\" name=\"" + voz[k].KorisnickoIme + "\" type=\"submit\" value=\"Blokiraj\" class=\"buttons\"/></tr>";
                                }
                                blok += "</table><br/><br/>";
                                $("#bloksvikorisnici").html(blok);
                                sessionStorage.setItem("blokreload", true);
                            }
                        }
                    });
                }
                else {
                    var blok = "<br/><table border=\"1\" style=\"border-color:slategray; background-color:lemonchiffon\"><tr><td width=\"130px\"><b>Korisni&ccaron;ko Ime</b></td><td width=\"100px\"><b>Uloga</b></td><td width=\"100px\"><b>Ime</b></td><td width=\"100px\"><b>Prezime</b></td><td width=\"100px\">&nbsp;</td></tr>";
                    for (var k in result) {
                        blok += "<tr><td>" + result[k].KorisnickoIme + "</td>";
                        blok += "<td>Mu" + `&scaron;` + "terija</td>";
                        blok += "<td>" + result[k].Ime + "</td>";
                        blok += "<td>" + result[k].Prezime + "</td>";
                                    blok += "<td><input id=\"blokirajkime\" name=\"" + result[k].KorisnickoIme + "\" type=\"submit\" value=\"Blokiraj\" class=\"buttons\"/></tr>";
                    }
                    blok += "</table>";
                    $("#bloksvikorisnici").html(blok);
                    $.ajax({
                        url: "api/Korisnik/GetAllVozace",
                        data: "",
                        type: "GET",
                        success: function (voz) {
                            if (voz !== "") {
                                var blok = "<table border=\"1\" style=\"border-color:slategray; background-color:lemonchiffon\">";
                                for (var k in voz) {
                                    blok += "<tr><td width=\"130px\">" + voz[k].KorisnickoIme + "</td>";
                                    blok += "<td width=\"100px\">Voza" + `&ccaron;` + "</td>";
                                    blok += "<td width=\"100px\">" + voz[k].Ime + "</td>";
                                    blok += "<td width=\"100px\">" + voz[k].Prezime + "</td>";
                                    blok += "<td width=\"100px\"><input id=\"blokirajkime\" name=\"" + voz[k].KorisnickoIme + "\" type=\"submit\" value=\"Blokiraj\" class=\"buttons\"/></tr>";
                                }
                                blok += "</table><br/><br/>";
                                $("#bloksvikorisnici").append(blok);
                                sessionStorage.setItem("blokreload", true);
                            }
                        }
                    });
                }
            }
        });
    }

    $(document).on("click", "#profilButton", function () {
        BlokiraneOdjavi();

        $("#registracijaIOpis").hide();
        $("#registrovan").hide();
        $("#ulogovan").hide();
        $("#dodajVozacaPolja").hide();
        $("#blok").hide();
        $("#dodajVoznjuPolja").hide();
        $("#divtabelapretrage").hide();
        $("#ulogovan").hide();
        $("#profil").show();
        $("#vozacmessagelok").html("");
        $("#vozacmessagelok").hide();
        $("#profiliosninf #izmenaerrormessage").html("");
        $("#profiliosninf").hide();

        UcitajProfil();

        sessionStorage.setItem("adminvidisve", false);
        sessionStorage.setItem("sortirajDatum", false);
        sessionStorage.setItem("sortirajOcena", false);
        sessionStorage.setItem("pocetna", true);
        var divheader = $("#divheader").html();
        sessionStorage.setItem("divheader", divheader);
        var divbody = $("#divbody").html();
        sessionStorage.setItem("divbody", divbody);
        sessionStorage.setItem("divmap", "");
        
    }); 

    function UcitajProfil(poruka) {
        let user = sessionStorage.getItem("user");
        let uloga = sessionStorage.getItem(user);
        let data = {
            user: user,
            uloga: uloga
        };

        if (uloga === "2") {
            $("#profiliosninf #izmenaerrormessage").html(poruka);
            $("#profiliosninf").show();
            $("#profilvozac").hide();
        }
        else if (uloga == "1") {
            $("#pv").html($("#profiliosninf").html());
            $("#pv #izmenaerrormessage").html(poruka);
            $("#profilvozac").show();
            $("#profiliosninf").hide();

            $.get("/api/Korisnik/GetAutomobil", data)
                .done(function (result) {
                    if (result !== null) {
                        $("#godauta").html("Godi&scaron;te automobila: " + result.GodisteAutomobila);
                        $("#brregozn").html("Broj registarske oznake: " + result.BrojRegistarskeOznake);
                        $("#brtakvoz").html("Broj taksi vozila: " + result.BrojTaksiVozila);
                        if (result.TipAutomobila === 0)
                            $("#tipautam").html("Tip automobila: Putni&ccaron;ki");
                        else
                            $("#tipautam").html("Tip automobila: Kombi");
                    }
                });
            $.get("/api/Voznja/GetCurrentLocationVozac", data)
                .done(function (result) {
                    if (result !== "") {
                        $("#vozactrenlokizmena").html("Poslednja lokacija: " + result);
                    }
                });

            var stringMapa = "<div id=\"map\"></div>";
            $("#profilvozacmapa").html(stringMapa);
            $("#profilvozacmapa").show();
            $("#map").css("height", "350px");
            $("#map").css("width", "100%");
            Mapa();
        }
        else if (uloga == "0") {
            $("#profiliosninf #izmenaerrormessage").html(poruka);
            $("#profiliosninf").show();
            $("#profilvozac").hide();
        }

        $.get("/api/Korisnik/GetKorisnika", data)
            .done(function (result) {
                if (result !== null) {
                    $("#izmenakimev").val(result.KorisnickoIme);
                    $("#izmenalozv").val(result.Lozinka);
                    $("#izmenaplozv").val(result.Lozinka);
                    $("#izmenaimev").val(result.Ime);
                    $("#izmenaprezimev").val(result.Prezime);
                    if (result.Pol === 0)
                        $("#polm").prop("checked", true);
                    else
                        $("#polz").prop("checked", true);
                    $("#izmenajmbgv").val(result.JMBG);
                    $("#izmenatelefonv").val(result.Telefon);
                    $("#izmenakemailv").val(result.Email);
                }

            });
    }

    $(document).on("click", "#vozacmenjalokaciju", function () {
        var lok = {
            KorisnickoIme: sessionStorage.getItem("user"),
            xlong: LokAdr.xx,
            ylatit: LokAdr.yy,
            UlicaiBroj: LokAdr.ulica_broj,
            MestoiPostanski: LokAdr.grad
        };

        $.get("/api/Voznja/VozacMenjaLokaciju", lok)
            .done(function (result) {
                if (result === "null") {
                    $("#vozacmessagelok").html("Unesite ponovo podatke!");
                    $("#vozacmessagelok").show();
                }
                else {
                    $("#vozacmessagelok").html("Lokacija uspe&scaron;no promenjena!");
                    $("#vozacmessagelok").show();
                    $("#vozacOdrediste").hide();
                    $("#pogledajkomentar").hide();
                    $("#korisnikkomentar").hide();
                    $("#profilvozacmapa").html("");
                    UcitajProfil();
                }
            });
    });

    $(document).on("click", "#izmenaprofil", function () {
        $("#vozacmessagelok").html("");
        $("#vozacmessagelok").hide();
        let user = sessionStorage.getItem("user");
        var ulog = sessionStorage.getItem(user);
        var k = $("#izmenakimev").val();
        let data = {
            StaroKorisnickoIme: user,
            KorisnickoIme: k,
            Lozinka: $("#izmenalozv").val(),
            Ime: $("#izmenaimev").val(),
            Prezime: $("#izmenaprezimev").val(),
            Pol: $("input[name=polizmena]").val(),
            JMBG: $("#izmenajmbgv").val(),
            Telefon: $("#izmenatelefonv").val(),
            Email: $("#izmenakemailv").val(),
            Uloga: ulog
        }
        let poruka = "";
        if (ProveraIzmene()) {
            $.post("/api/Korisnik/IzmeniKorisnika", data)
                .done(function (result) {
                    if (result === "Korisnicko ime vec postoji!") {
                        $("#profiliosninf #izmenaerrormessage").html("Korisni&ccaron;ko ime ve&cacute; postoji!");
                        $("#profiliosninf #izmenaerrormessage").show();
                        $("#izmenakimev").focus();
                    }
                    else if (result === "null") {
                        $("#profiliosninf #izmenaerrormessage").html("Unesite ponovo podatke!");
                        $("#profiliosninf #izmenaerrormessage").show();
                    }
                    else {
                        $("#profiliosninf #izmenaerrormessage").html("Uspe&scaron;no ste izmenili profil!");
                        $("#profiliosninf #izmenaerrormessage").show();
                        poruka = "Uspe&scaron;no ste izmenili profil!";
                        sessionStorage.setItem("user", k);
                        sessionStorage.setItem(k, ulog);
                        dat.KorisnickoIme = k;
                        dat.Lozinka = $("#izmenalozv").val();
                        $("#username").text(k);
                        UcitajProfil(poruka);
                        
                        sessionStorage.setItem("adminvidisve", false);
                        sessionStorage.setItem("sortirajDatum", false);
                        sessionStorage.setItem("sortirajOcena", false);
                        sessionStorage.setItem("pocetna", true);
                        var divheader = $("#divheader").html();
                        sessionStorage.setItem("divheader", divheader);
                        var divbody = $("#divbody").html();
                        sessionStorage.setItem("divbody", divbody);
                        sessionStorage.setItem("divmap", "");
                    }
                });
        }
    });

    $(document).on("click", "#pocetna", function () {
        $("#ulogovanMessage").html("");
        sessionStorage.setItem("adminvidisve", "false");
        PocetnaStrana();
    });

    function PocetnaStrana() {
        BlokiraneOdjavi();
        $("#mapaDodajVoznju").html("");
        $("#mapaDodajVoznju").hide();
        $("#mapaodrediste").html("");
        $("#mapaodrediste").hide();
        $("#mapapolaziste").html("");
        $("#mapapolaziste").hide();
        $("#divtabelapretrage").show();
        $("#registracijaIOpis").hide();
        $("#registrovan").hide();
        $("#ulogovan").show();
        $("#tabelaPretrage").show();
        $("#dodajVozacaPolja").hide();
        $("#blok").hide();
        $("#dodajVoznjuPolja").hide();
        $("#profil").hide();

        var user = sessionStorage.getItem("user");
        var ul = sessionStorage.getItem(user);
        var data = {
            KorisnickoIme: user,
            Uloga: ul
        };

        $.ajax({
            url: "api/Voznja/GetVoznje",
            data: data,
            type: "GET",
            success: function (result) {
                if (result === "Niste porucivali voznje") {
                    $("#ulogovanMessage").html("Niste poru&ccaron;ivali vo&zcaron;nje!");
                    $("#ulogovanMessage").show();
                }
                else {
                    DodajDatum(result);
                    if (sessionStorage.getItem("sortirajDatum") === "true") {
                        let b = {
                            user: sessionStorage.getItem("user"),
                            uloga: sessionStorage.getItem(sessionStorage.getItem("user")),
                            a: sessionStorage.getItem("adminvidisve")
                        }
                        sessionStorage.setItem("sortirajDatum", false);
                        sessionStorage.setItem("sortirajOcena", false);
                        $.get("/api/Voznja/SortirajDatum", b)
                            .done(function (r) {
                                $("#ulogovanMessage").html("Sortiranje po datumu primenjeno");
                                $("#ulogovanMessage").show();
                                if (ul === "2") {
                                    TabelaKlijent(r);
                                    DodajDatum(r);
                                }
                                else if (ul === "1") {
                                    TabelaVozac(r);
                                    DodajDatum(r);
                                }
                                else if (ul === "0") {
                                    TabelaAdmin(r);
                                    DodajDatum(r);
                                    DodajImenaPrezimena();
                                }
                            });
                    }
                    else if (sessionStorage.getItem("sortirajOcena") === "true") {
                        let b = {
                            user: sessionStorage.getItem("user"),
                            uloga: sessionStorage.getItem(sessionStorage.getItem("user")),
                            a: sessionStorage.getItem("adminvidisve")
                        }
                        sessionStorage.setItem("sortirajDatum", false);
                        sessionStorage.setItem("sortirajOcena", false);
                        $.get("/api/Voznja/SortirajOcena", b)
                            .done(function (r) {
                                $("#ulogovanMessage").html("Sortiranje po ocenama primenjeno");
                                $("#ulogovanMessage").show();
                                if (ul === "2") {
                                    TabelaKlijent(r);
                                    DodajDatum(r);
                                }
                                else if (ul === "1") {
                                    TabelaVozac(r);
                                    DodajDatum(r);
                                }
                                else if (ul === "0") {
                                    TabelaAdmin(r);
                                    DodajDatum(r);
                                    DodajImenaPrezimena();
                                }
                            });
                    }
                    else {
                        if (ul === "2") {
                            TabelaKlijent(result);
                            DodajDatum(result);
                        }
                        else if (ul === "1") {
                            TabelaVozac(result);
                            DodajDatum(result);
                        }
                        else if (ul === "0") {
                            TabelaAdmin(result);
                            DodajDatum(result);
                            DodajImenaPrezimena();
                        }
                    }

                    sessionStorage.setItem("sortirajDatum", false);
                    sessionStorage.setItem("sortirajOcena", false);
                    sessionStorage.setItem("pocetna", true);
                    var divheader = $("#divheader").html();
                    sessionStorage.setItem("divheader", divheader);
                    var divbody = $("#divbody").html();
                    sessionStorage.setItem("divbody", divbody);
                    sessionStorage.setItem("divmap", "");
                }
            }
        });
    }

    function TabelaKlijent(result) {
        $("#adminvidisve").hide();
        $("#adminvoznja").hide();
        $("#vozacvoznja").hide();
        $("#vozacslobodne").hide();
        $("#vozacsortira").hide();
        $("#admintraziimeprezime").hide();
        $("#tableklijent").html("");
        $("#divtabelapretrage").show();
        var t = "";
        t += "<table border=\"3\" style=\"border-color:slategray; background-color:lemonchiffon\"><tr  style=\"background-color:yellow\"><td width=\"100px\"><b>Vreme i datum</b></td><td width=\"150px\"><b>Polazi&scaron;te</b></td><td width=\"150px\"><b>Odredi" + `&scaron;` + "te</b></td><td width=\"80px\"><b>Tip vozila</b></td><td width=\"100px\"><b>Status vo" + `&zcaron;` + "nje</b></td><td width=\"80px\"><b>Cena</b></td><td width=\"150px\">&nbsp;</td></tr>";
        for (var i in result) {
            t += "<tr><td>" + result[i].DatumIVremePorudzbine + "</td>";
            if (result[i].StatusVoznje === 0) {
                t += "<td><input type=\"submit\" name=\"" + `${result[i].ID}` + "\" class=\"trigger_popup_fricc buttons\" value=\"Promeni polazi" + `&scaron;` + "te\" id=\"promenipolaziste\"></td>";
            }
            else {
                t += "<td>" + result[i].LokacijaPolazista.Adresa.UlicaIBroj + "&nbsp;" + result[i].LokacijaPolazista.Adresa.MestoIPostanskiFah + "</td>";
            }
            if (result[i].LokacijaOdredista !== null) {
                t += "<td>" + result[i].LokacijaOdredista.Adresa.UlicaIBroj + "&nbsp;" + result[i].LokacijaOdredista.Adresa.MestoIPostanskiFah + "</td>";
            }
            else {
                t += "<td>" + `&nbsp;` + "</td>";
            }
            if (result[i].StatusVoznje === 0) {
                t += "<td><input list=\"tipa\" name=\"" + `${result[i].ID}` + "\" placeholder=\"Tip automobila\"><datalist id=\"tipa\"><option value=\"Putni&ccaron;ki\" id=\"putnicki\" /><option value=\"Kombi\" id=\"kombi\" /></datalist></td>";
            }
            else {
                if (result[i].TipAutomobila === 0) {
                    t += "<td>Putni&ccaron;ki</td>";
                }
                else {
                    t += "<td>Kombi</td>";
                }
            }
            t += Statusi(result[i].StatusVoznje);
            if (result[i].Iznos !== 0) {
                t += "<td>" + result[i].Iznos + "</td>";
            }
            else {
                t += "<td>" + `&nbsp;` + "</td>";
            }
            t += "<td>";
            if (result[i].Komentar !== null) {
                t += "<input type=\"submit\" name=\"" + `${result[i].ID}` + "\" class=\"trigger_popup_fricc buttons\" value=\"Pogledaj komentar\" id=\"pogledajkomentar\">";
            }
            else {
                if (result[i].StatusVoznje === 6 || result[i].StatusVoznje === 4) {
                    t += "<input type=\"submit\" name=\"" + `${result[i].ID}` + "\" class=\"trigger_popup_fricc buttons\" value=\"Dodaj komentar\" id=\"dodajkomentar\">";
                }
                else {
                    t += "" + `&nbsp;`;
                }
            }
            if (result[i].StatusVoznje === 0) {
                t += "<input type=\"submit\" name=\"" + `${result[i].ID}` + "\" class=\"trigger_popup_fricc buttons\" value=\"Otka" + `&zcaron;` + "i vo" + `&zcaron;` + "nju\" id=\"otkazivoznju\">";
            }
            else {
                t += "" + `&nbsp;`;
            }
            t += "</td>";
        }
        t += "</tr></table>";
        $("#tableklijent").html(t);
        $("#korisnikvoznja").show();
    }

    function TabelaAdmin(result) {
        $("#korisnikvoznja").hide();
        $("#vozacvoznja").hide();
        $("#adminvidisve").show();
        $("#vozacslobodne").hide();
        $("#vozacsortira").hide();
        $("#admintraziimeprezime").show();
        $("#tableadmin").html("");
        $("#divtabelapretrage").show();
        var t = "";
        t += "<table border=\"3\" style=\"border-color:slategray; background-color:lemonchiffon\"><tr style=\"background-color:yellow\"><td width=\"100px\"><b>Vreme i datum</b></td><td width=\"150px\"><b>Polazi" + `&scaron;` + "te</b></td><td width=\"150px\"><b>Odredi" + `&scaron;` + "te</b></td><td width=\"80px\"><b>Tip vozila</b></td><td width=\"100px\"><b>Status vo" + `&zcaron;` + "nje</b></td><td width=\"80px\"><b>Cena</b></td><td width=\"80px\"><b>Korisnik</b></td><td width=\"80px\"><b>Voza" + `&ccaron;` + "</b></td><td width=\"150px\">&nbsp;</td></tr>";
        for (var i in result) {
            t += "<tr><td>" + result[i].DatumIVremePorudzbine + "</td>";
            t += "<td>" + result[i].LokacijaPolazista.Adresa.UlicaIBroj + "&nbsp;" + result[i].LokacijaPolazista.Adresa.MestoIPostanskiFah + "</td>";
            if (result[i].LokacijaOdredista !== null) {
                t += "<td>" + result[i].LokacijaOdredista.Adresa.UlicaIBroj + "&nbsp;" + result[i].LokacijaOdredista.Adresa.MestoIPostanskiFah + "</td>";
            }
            else {
                t += "<td>" + `&nbsp;` + "</td>";
            }
            if (result[i].TipAutomobila === 0) {
                t += "<td>Putni" + `&ccaron;` + "ki</td>";
            }
            else {
                t += "<td>Kombi</td>";
            }
                t +=  Statusi(result[i].StatusVoznje);
            if (result[i].Iznos !== 0) {
                t += "<td>" + result[i].Iznos + "</td>";
            }
            else {
                t += "<td>" + `&nbsp;` + "</td>";
            }
            if (result[i].Musterija !== null) {
                t += "<td>" + result[i].Musterija.KorisnickoIme + "</td>";
            }
            else {
                t += "<td>" + `&nbsp;` + "</td>";
            }
            if (result[i].Vozac !== null) {
                t += "<td>" + result[i].Vozac.KorisnickoIme + "</td>";
            }
            else {
                t += "<td>" + `&nbsp;` + "</td>";
            }
            t += "<td>";
            if (result[i].StatusVoznje === 0 || result[i].StatusVoznje === 1) {
                t += "<input type=\"submit\" name=\"" + `${result[i].ID}` + "\" class=\"trigger_popup_fricc buttons\" value=\"Dodeli vo" + `&zcaron;` + "nju\" id=\"dodelivoznju\">";
            }
            else {
                if (result[i].Komentar !== null) {
                    t += "<input type=\"submit\" name=\"" + `${result[i].ID}` + "\" class=\"trigger_popup_fricc buttons\" value=\"Pogledaj komentar\" id=\"pogledajkomentar\">";
                }
                else {
                    t += "" + `&nbsp;`;
                }
            }
            t += "</td>";
        }
        t += "</tr></table>";
        $("#tableadmin").html(t);
        $("#adminvoznja").show();
    }

    function TabelaVozac(result) {
        $("#korisnikvoznja").hide();
        $("#adminvoznja").hide();
        $("#adminvidisve").hide();
        $("#vozacslobodne").show();
        $("#vozacsortira").show();
        $("#admintraziimeprezime").hide();
        $("#divtabelapretrage").show();
        var t = "";
        $("#tablevozac").html("");
        t += "<table border=\"3\" style=\"border-color:slategray; background-color:lemonchiffon\"><tr  style=\"background-color:yellow\"><td width=\"100px\"><b>Vreme i datum</b></td><td width=\"150px\"><b>Polazi" + `&scaron;` + "te</b></td><td width=\"150px\"><b>Odredi" + `&scaron;` + "te</b></td><td width=\"80px\"><b>Tip vozila</b></td><td width=\"150px\"><b>Status vo" + `&zcaron;` + "nje</b></td><td width=\"80px\"><b>Cena</b></td><td width=\"150px\">&nbsp;</td></tr>";
        for (var i in result) {
            t += "<tr><td>" + result[i].DatumIVremePorudzbine + "</td>";
            t += "<td>" + result[i].LokacijaPolazista.Adresa.UlicaIBroj + "&nbsp;" + result[i].LokacijaPolazista.Adresa.MestoIPostanskiFah + "</td>";
            if (result[i].LokacijaOdredista !== null) {
                t += "<td>" + result[i].LokacijaOdredista.Adresa.UlicaIBroj + "&nbsp;" + result[i].LokacijaOdredista.Adresa.MestoIPostanskiFah + "</td>";
            }
            else {
                if (result[i].StatusVoznje === 0 || result[i].StatusVoznje === 5 || result[i].StatusVoznje === 1 || result[i].StatusVoznje === 4) {
                    t += "<td>" + `&nbsp;` + "</td>";
                }
                else {
                    t += "<td><input type=\"submit\" name=\"" + `${result[i].ID}` + "\" class=\"trigger_popup_fricc buttons\" value=\"Dodaj odredi" + `&scaron;` + "te\" id=\"unesiodrediste\"></td>";

                }
            }
            if (result[i].TipAutomobila === 0) {
                t += "<td>Putni" + `&ccaron;` + "ki</td>";
            }
            else {
                t += "<td>Kombi</td>";
            }
            if (result[i].StatusVoznje === 2 || result[i].StatusVoznje === 3) {
                t += "<td><input list=\"statusv\" name=\"statusv\" placeholder=\"Status\"><datalist id=\"statusv\">";
                t += "<option value=\"Neuspe" + `&scaron;` + "na\" id=\"5\"><option value=\"Uspe" + `&scaron;` + "na\" id=\"6\">";
                t += "</datalist></td>";
            }
            else {
                t += Statusi(result[i].StatusVoznje)
            }
            if (result[i].Iznos !== 0) {
                t += "<td>" + result[i].Iznos + " din</td>";
            }
            else {
                if (result[i].StatusVoznje === 0 || result[i].StatusVoznje === 5 || result[i].StatusVoznje === 1) {
                    t += "<td>" + `&nbsp;` + "</td>";
                }
                else {
                    t += "<td><input type=\"text\" name=\"iznos\" id=\"iznos\" placeholder=\"Cena\"><br /></td>";

                }
            }
            t += "<td>";
            if (result[i].StatusVoznje === 0 || result[i].StatusVoznje === 1) {
                t += "<input type=\"submit\" name=\"" + `${result[i].ID}` + "\" value=\"Prihvati vo" + `&zcaron;` + "nju\" id=\"prihvativoznju\" class=\"buttons\">";
            }
            else if (result[i].StatusVoznje === 5 && result[i].Komentar === null) {
                var id = result[i].ID;
                sessionStorage.setItem("id", id);
                DodajKomentar();
            }
            else if (result[i].StatusVoznje === 2 || result[i].StatusVoznje === 3) {
                t += "<input type=\"submit\" name=\"" + `${result[i].ID}` + "\" value=\"Dodaj Izmene\" id=\"dodajizmene\" class=\"buttons\">";
            }
            else if (result[i].StatusVoznje === 6 || result[i].StatusVoznje === 5 || result[i].StatusVoznje === 4) {
                if (result[i].Komentar !== null) {
                    t += "<input type=\"submit\" name=\"" + `${result[i].ID}` + "\" class=\"trigger_popup_fricc buttons\" value=\"Pogledaj komentar\" id=\"pogledajkomentar\">";
                }
                else {
                    t += "" + `&nbsp;`;
                }
            }
            else {
                t += "" + `&nbsp;`;
            }
            t += "</td>";
        }
        t += "</tr></table>";
        $("#tablevozac").html(t);
        $("#vozacvoznja").show();
    }

    function Statusi(status) {
        if (status === 0) {
            return "<td>Kreirana</td>";
        }
        else if (status === 1) {
            return "<td>Formirana</td>";
        }
        else if (status === 2) {
            return "<td>Obra" + `&dstrok;` + "ena</td>";
        }
        else if (status === 3) {
            return "<td>Prihva" + `&cacute;` + "ena</td>";
        }
        else if (status === 4) {
            return "<td>Otkazana</td>";
        }
        else if (status === 5) {
            return "<td>Neuspe" + `&scaron;` + "na</td>";
        }
        else if (status === 6) {
            return "<td>Uspe" + `&scaron;` + "na</td>";
        }
    }

    function DodajDatum(result) {
        $("#oddatumpretraga").html("");
        $("#dodatumpretraga").html("");
        for (var i in result) {
            $("#oddatumpretraga").append(`<option value="${result[i].DatumIVremePorudzbine}" id="${i}" />`);
        }
        for (var i in result) {
            $("#dodatumpretraga").append(`<option value="${result[i].DatumIVremePorudzbine}" id="${i}" />`);
        }
    }

    function DodajImenaPrezimena() {
        $("#admintraziimek").html("");
        $("#admintraziprezimek").html("");
        $("#admintraziimev").html("");
        $("#admintraziprezimev").html("");

        $.get("/api/Korisnik/GetImenaKorisnika", "")
            .done(function (result) {
                for (var i in result) {
                    $("#admintraziimek").append(`<option value="${result[i]}" id="${i}" />`);
                }
            });
        $.get("/api/Korisnik/GetPrezimenaKorisnika", "")
            .done(function (result) {
                for (var i in result) {
                    $("#admintraziprezimek").append(`<option value="${result[i]}" id="${i}" />`);
                }
            });
        $.get("/api/Korisnik/GetImenaVozaca", "")
            .done(function (result) {
                for (var i in result) {
                    $("#admintraziimev").append(`<option value="${result[i]}" id="${i}" />`);
                }
            });
        $.get("/api/Korisnik/GetPrezimenaVozaca", "")
            .done(function (result) {
                for (var i in result) {
                    $("#admintraziprezimev").append(`<option value="${result[i]}" id="${i}" />`);
                }
            });
    }

    $(document).on("click", "#otkazivoznju", function () {
        var id = $(this).attr("name");
        sessionStorage.setItem("id", id);
        DodajKomentar();
        var data = {
            user: $(this).attr("name")
        }
        $.get("/api/Voznja/OtkaziVoznju", data)
            .done(function (result) {
                $("#ulogovanMessage").html("Vo" + `&zcaron;` + "nja otkazana!");
                $("#ulogovanMessage").show();
                $("#opiskomentar").html("");
                $("#input").val("");
                PocetnaStrana();
            });
    });

    $(document).on("click", "#unesiodrediste", function () {
        var id = $(this).attr("name");
        sessionStorage.setItem("id", id);
        $("#vozacOdrediste").show();
        $("#pogledajkomentar").hide();
        $("#korisnikkomentar").hide();
        $("#mapazovacodresdisteerror").hide();

        var stringMapa = "<div id=\"map\"></div>";
        $("#mapaodrediste").html(stringMapa);
        $("#mapaodrediste").show();
        $("#map").css("height", "300px");
        $("#map").css("width", "400px");
        Mapa();
    });

    $(document).on("click", "#promenipolaziste", function () {
        var id = $(this).attr("name");
        sessionStorage.setItem("id", id);
        $("#promenipolazistekorisnik").show();
        $("#pogledajkomentar").hide();
        $("#korisnikkomentar").hide();
        $("#vozacOdrediste").hide();
        $("#dodelivoznjuvozacu").hide();

        $("#mapapolaziste").html("");
        var stringMapa = "<div id=\"map\"></div>";
        $("#mapapolaziste").html(stringMapa);
        $("#mapapolaziste").show();
        $("#map").css("height", "250px");
        $("#map").css("width", "350px");
        Mapa();

        let i = {
            id: id
        }
        $("#trnutnopolaziste").html("Trenutna lokacija: ");
        $.get("/api/Voznja/GetCurrentLocation", i)
            .done(function (result) {
                if (result !== "") {
                    $("#trnutnopolaziste").append(result);
                }
            });
    });

    $(document).on("click", "#dodajlokacijupolazista", function () {
        let id = sessionStorage.getItem("id");
        sessionStorage.setItem("id", "");
        var lok = {
            KorisnickoIme: sessionStorage.getItem("user"),
            xlong: LokAdr.xx,
            ylatit: LokAdr.yy,
            UlicaiBroj: LokAdr.ulica_broj,
            MestoiPostanski: LokAdr.grad,
            IDVoznje: id
        };

        $.post("/api/Voznja/PromeniLokaciju", lok)
            .done(function (result) {
                if (result !== "null") {
                    $("#ulogovanMessage").html("Polazi" + `&scaron;` + "te uspe" + `&scaron;` + "no promenjeno!");
                    $("#ulogovanMessage").show();
                    $("#vozacOdrediste").hide();
                    $("#pogledajkomentar").hide();
                    $("#korisnikkomentar").hide();
                    $("#promenipolazistekorisnik").hide();
                    $("#vozacOdrediste").hide();
                    $("#dodelivoznjuvozacu").hide();
                    $("#mapapolaziste").html("");
                    $("#trnutnopolaziste").html("Trenutna lokacija: ");
                    $(this).hide();
                    PocetnaStrana();
                }
                else {
                    $("#ulogovanMessage").html("Unesite ponovo podatke!");
                    $("#ulogovanMessage").show();
                }
            });
    });

    $(document).on("click", "#dodajlokaciju", function () {
        let id = sessionStorage.getItem("id");
        sessionStorage.setItem("id", "");
        var lok = {
            KorisnickoIme: sessionStorage.getItem("user"),
            xlong: LokAdr.xx,
            ylatit: LokAdr.yy,
            UlicaiBroj: LokAdr.ulica_broj,
            MestoiPostanski: LokAdr.grad,
            IDVoznje: id
        };

        let upis = true;
        if (LokAdr.xx === null || LokAdr.yy === null || LokAdr.ulica_broj === null || LokAdr.grad === null) {
            $("#mapazovacodresdisteerror").show();
            upis = false;
        }
        else if (LokAdr.xx === "null" || LokAdr.yy === "null" || LokAdr.ulica_broj === "null" || LokAdr.grad === "null") {
            $("#mapazovacodresdisteerror").show();
            upis = false;
        }
        if (upis) {
            $.get("/api/Voznja/UnesiOdrediste", lok)
                .done(function (result) {
                    if (result === "null") {
                        $("#ulogovanMessage").html("Ponovo unesite podatke!");
                        $("#ulogovanMessage").show();
                    }
                    else {
                        $("#ulogovanMessage").html("Odredi" + `&scaron;` + "te uspe" + `&scaron;` + "no dodato!");
                        $("#ulogovanMessage").show();
                        $("#vozacOdrediste").hide();
                        $("#pogledajkomentar").hide();
                        $("#korisnikkomentar").hide();
                        $("#mapaodrediste").html("");
                        $(this).hide();
                        PocetnaStrana();
                    }
                });
        }
    });

    $(document).on("click", "#pogledajkomentar", function () {
        $("#vozacOdrediste").hide();
        $("#pogledajkoment").show();
        $("#korisnikkomentar").hide();
        $("#ulogovanMessage").html("");
        $("#ulogovanMessage").hide();
        var id = {
            voznja: $(this).attr("name")
        }

        $.get("/api/Voznja/GetKomentar", id)
            .done(function (result) {
                $("#komopis").append(result.Opis);
                $("#komdatum").append(result.DatumObjave);
                $("#komkorisnik").append(result.Korisnik);
                $("#komocena").append(result.Ocena);
            });
    });

    $(document).on("click", "#dodajizmene", function () {
        $("#ulogovanMessage").html("");
        $("#ulogovanMessage").hide();
        let id = $(this).attr("name");

        var lok = {
            KorisnickoIme: sessionStorage.getItem("user"),
            IDVoznje: id,
            Cena: $("#iznos").val(),
            Status: sessionStorage.getItem("status")
        };
        let upis = true;
        if (lok.Status === null || lok.Status === "null") {
            $("#ulogovanMessage").html("Morate izabrati status!");
            $("#ulogovanMessage").show();
            upis = false;
        }
        if (upis) {
            $.get("/api/Voznja/ZavrsiVoznju", lok)
                .done(function (result) {
                    if (result === "status") {
                        $("#ulogovanMessage").html("Morate izabrati status!");
                        $("#ulogovanMessage").show();
                    }
                    else if (result === "cena") {
                        $("#ulogovanMessage").html("Morate uneti cenu!");
                        $("#ulogovanMessage").show();
                    }
                    else {
                        $("#ulogovanMessage").html("Vo" + `&zcaron;` + "nja uspe" + `&scaron;` + "no zavr" + `&scaron;` + "ena!");
                        $("#ulogovanMessage").show();
                        $("#iznos").val("");
                        PocetnaStrana();
                    }
                });
        }
    });

    $(document).on("click", "#dodajkomentar", function () {
        if (sessionStorage.getItem("id") === "" || sessionStorage.getItem("id") === 0 || sessionStorage.getItem("id") === null) {
            var id = $(this).attr("name");
            sessionStorage.setItem("id", id);
        }
        DodajKomentar();
    });

    $(document).on("click", "#napusti", function () {
        $("#komopis").html("Opis:");
        $("#komdatum").html("Datum objave: ");
        $("#komkorisnik").html("Korisnik:");
        $("#komocena").html("Ocena: ");
        $("#ulogovanMessage").hide();
        $("#vozacOdrediste").hide();
        $("#pogledajkoment").hide();
        $("#korisnikkomentar").hide();
        $("#dodelivoznjuvozacu").hide();
        $("#promenipolazistekorisnik").hide();
    });

    function DodajKomentar() {
        $("#ulogovanMessage").html("Komentar uspe" + `&scaron;` + "no dodat!" + `<br/>`);
        $("#vozacOdrediste").hide();
        $("#pogledajkomentar").hide();
        $("#korisnikkomentar").show();
        $("#ulogovanMessage").html("");
        $("#ulogovanMessage").hide();
    }

    $(document).on("click", "#dodajKoment", function () {
        var id = sessionStorage.getItem("id");
        sessionStorage.setItem("id", "");
        var komentar = {
            Opis: $("#opiskomentar").val(),
            Korisnik: sessionStorage.getItem("user"),
            Voznja: id,
            Ocena: sessionStorage.getItem("ocenakoment")
        }

        $.post("/api/Voznja/DodajKomentar", komentar)
            .done(function (result) {
                if (result != "null") {
                    $("#ulogovanMessage").html("Unesite ponovo podatke!");
                    $("#ulogovanMessage").show();
                }
                $("#ulogovanMessage").html("Komentar uspe" + `&scaron;` + "no dodat!");
                $("#ulogovanMessage").show();
                PocetnaStrana();
            });
    });

    $(document).on("click", '#dodajKoment', function () {
        $('.hover_bkgr_fricc').hide();
    });

    $(document).on("click", "#prihvativoznju", function () {
        $("#ulogovanMessage").html("");
        $("#ulogovanMessage").hide();
        var id = $(this).attr("name");

        let data = {
            KorisnickoIme: sessionStorage.getItem("user"),
            IDVoznje: id
        }

        $.get("/api/Voznja/PrihvatiVoznju", data)
            .done(function (result) {
                if (result === "null") {
                    $("#ulogovanMessage").html("Unesite ponovo podatke!");
                    $("#ulogovanMessage").show();
                }
                if (result === "zauzet") {
                    $("#ulogovanMessage").html("Niste zavr&scaron;ili prethodnu vo&zcaron;nju!");
                    $("#ulogovanMessage").show();
                }
                else {
                    $("#ulogovanMessage").html("Vo" + `&zcaron;` + "nja uspe" + `&scaron;` + "no prihva" + `&cacute;` + "ena!");
                    $("#ulogovanMessage").show();
                    PocetnaStrana();
                }
            });
    });

    $(document).on("click", "#sortirajDatum", function () {
        sessionStorage.setItem("sortirajDatum", true);
        sessionStorage.setItem("sortirajOcena", false);
        PocetnaStrana();
    });
    $(document).on("click", "#sortirajOcena", function () {
        sessionStorage.setItem("sortirajOcena", true);
        sessionStorage.setItem("sortirajDatum", false);
        PocetnaStrana();
    });
    $(document).on("focusout", "input[name=statusv]", function () {
        sessionStorage.setItem("status", $(this).val());
    });
    $(document).on("focusout", "input[name=ocenakomentar]", function () {
        sessionStorage.setItem("ocenakoment", $(this).val());
    });
    $(document).on("focusout", "input[name=tipautomobilaa]", function () {
        sessionStorage.setItem("tipautomobilaa", $(this).val());
    });
    $(document).on("focusout", "input[name=tipa]", function () {
        let a = {
            auto: $(this).val(),
            id: $(this).attr("name")
        }
        $.get("/api/Voznja/PromeniVozilo", a)
            .done(function (result) {
                $("#ulogovanMessage").html("Tip vozila uspe" + `&scaron;` + "no promenjen!");
                $("#ulogovanMessage").show();
                PocetnaStrana();
            });
    });

    //pretraga
    $(document).on("focusout", "input[list=filterstatus]", function () {
        sessionStorage.setItem("filterstatus", $(this).val());
    });
    $(document).on("focusout", "input[list=oddatumpretraga]", function () {
        sessionStorage.setItem("oddatumpretraga", $(this).val());
    });
    $(document).on("focusout", "input[list=dodatumpretraga]", function () {
        sessionStorage.setItem("dodatumpretraga", $(this).val());
    });
    $(document).on("focusout", "input[list=odocenapretraga]", function () {
        sessionStorage.setItem("odocenapretraga", $(this).val());
    });
    $(document).on("focusout", "input[list=doocenapretraga]", function () {
        sessionStorage.setItem("doocenapretraga", $(this).val());
    });
    $(document).on("focusout", "input[list=odcenapretraga]", function () {
        sessionStorage.setItem("odcenapretraga", $(this).val());
    });
    $(document).on("focusout", "input[list=docenapretraga]", function () {
        sessionStorage.setItem("docenapretraga", $(this).val());
    });

    $(document).on("focusin", "input[list=filterstatus]", function () {
        $(this).val("");
    });
    $(document).on("focusin", "input[list=oddatumpretraga]", function () {
        $(this).val("");
    });
    $(document).on("focusin", "input[list=dodatumpretraga]", function () {
        $(this).val("");
    });
    $(document).on("focusin", "input[list=odocenapretraga]", function () {
        $(this).val("");
    });
    $(document).on("focusin", "input[list=doocenapretraga]", function () {
        $(this).val("");
    });
    $(document).on("focusin", "input[list=odcenapretraga]", function () {
        $(this).val("");
    });
    $(document).on("focusin", "input[list=docenapretraga]", function () {
        $(this).val("");
    });

    $(document).on("focusin", "input[list=admintraziimek]", function () {
        $(this).val("");
    });
    $(document).on("focusin", "input[list=admintraziprezimek]", function () {
        $(this).val("");
    });
    $(document).on("focusin", "input[list=admintraziimev]", function () {
        $(this).val("");
    });
    $(document).on("focusin", "input[list=admintraziprezimev]", function () {
        $(this).val("");
    });

    $(document).on("click", "#primenikriterijum", function () {
        $("#ulogovanMessage").html("");
        $("#ulogovanMessage").hide();
        var user = sessionStorage.getItem("user");
        var ul = sessionStorage.getItem(user);
        var data = {
            Uloga: sessionStorage.getItem(user),
            KIme: user,
            FilterStatus: sessionStorage.getItem("filterstatus"),
            OdDatum: sessionStorage.getItem("oddatumpretraga"),
            DoDatum: sessionStorage.getItem("dodatumpretraga"),
            OdOcena: sessionStorage.getItem("odocenapretraga"),
            DoOcena: sessionStorage.getItem("doocenapretraga"),
            OdCena: sessionStorage.getItem("odcenapretraga"),
            DoCena: sessionStorage.getItem("docenapretraga"),
            a: sessionStorage.getItem("adminvidisve")
        }
        $.post("/api/Voznja/IzvrsiPretragu", data)
            .done(function (result) {
                if (result === "Ne postoje voznje za trazene kriterujeme!") {
                    $("#ulogovanMessage").html("Ne postoje vo" + `&zcaron;` + "nje za tra" + `&zcaron;` + "ene kriterijume!");
                    $("#ulogovanMessage").show();
                    if (ul === "2") {
                        $("#korisnikvoznja").hide();
                    }
                    else if (ul === "1") {
                        $("#vozacvoznja").hide();
                    }
                    else if (ul === "0") {
                        $("#adminvoznja").hide();
                    }
                }
                else {
                    if (ul === "2") {
                        $("#korisnikvoznja").show();
                        $("#ulogovan").show();
                        TabelaKlijent(result);
                    }
                    else if (ul === "1") {
                        $("#vozacvoznja").show();
                        $("#ulogovan").show();
                        TabelaVozac(result);
                    }
                    else if (ul === "0") {
                        $("#adminvoznja").show();
                        $("#ulogovan").show();
                        $("#admintraziimeprezime").show();
                        TabelaAdmin(result);
                    }
                }
            });
    });

    $(document).on("click", "#dodelivoznju", function () {
        $("#ulogovanMessage").html("");
        $("#ulogovanMessage").hide();
        $("#vozacOdrediste").hide();
        $("#pogledajkomentar").hide();
        $("#korisnikkomentar").hide();
        $("#promenipolazistekorisnik").hide();
        $("#dodelivoznjuvozacu").show();

        var id = $(this).attr("name");
        sessionStorage.setItem("id", id);
        var idd = {
            i: id
        }
        $.get("/api/Voznja/NadjiNajblize", idd)
            .done(function (result) {
                if (result === "Nema slobodnih vozaca!") {
                    let p = "<p style=\"color: crimson; font - size: medium\">Nema slobodnih voza" + `&ccaron;` + "a!</p></br><input type=\"submit\" value=\"Napusti\" id=\"napusti\" class=\"buttons\">";
                    $("#voznjevozacima").html(p);
                    $("#voznjevozacima").show();
                }
                else {
                    let t = "<table border=\"0\"><tr><td width=\"30%\"><b>Korisni" + `&ccaron;` + "ko ime</b></td><td width=\"40%\"><b>Trenutna lokacija<b></td><td width=\"30%\">&nbsp;</td></tr>"
                    for (var i in result) {
                        t += "<tr><td>" + result[i].KorisnickoIme + "</td>";
                        t += "<td>" + result[i].Lokacija.Adresa.UlicaIBroj + "&nbsp;" + result[i].Lokacija.Adresa.MestoIPostanskiFah + "</td>";
                        t += "<td><input type=\"submit\" name=\"" + `${result[i].KorisnickoIme}` + "\" value=\"Dodeli\" id=\"dodeli\" class=\"buttons\"></td>";
                    }
                    t += "</tr></table></br></br><input type=\"submit\" value=\"Napusti\" id=\"napusti\" class=\"buttons\">";
                    $("#voznjevozacima").html(t);
                    $("#dodelivoznjuvozacu").show();
                }
            });
    });

    $(document).on("click", "#dodeli", function () {
        let user = $(this).attr("name");
        $("#ulogovanMessage").html("");
        $("#ulogovanMessage").hide();
        $("#vozacOdrediste").hide();
        $("#pogledajkomentar").hide();
        $("#korisnikkomentar").hide();
        $("#promenipolazistekorisnik").hide();
        $("#dodelivoznjuvozacu").hide();

        var idvuser = {
            id: sessionStorage.getItem("id"),
            user: user
        }
        $.get("/api/Voznja/dodelivoznju", idvuser)
            .done(function (result) {
                $("#ulogovanMessage").html("Vo" + `&zcaron;` + "nja uspe" + `&scaron;` + "no dodeljena!");
                $("#ulogovanMessage").show();
                PocetnaStrana();
            });
    });
    
    $(document).on("click", "#vidisvevoznje", function () {
        $("#ulogovanMessage").html("");
        $("#ulogovanMessage").hide();
        $("#mapaodrediste").html("");
        $("#mapaodrediste").hide();
        $("#divtabelapretrage").show();
        $("#registracijaIOpis").hide();
        $("#registrovan").hide();
        $("#ulogovan").show();
        $("#tabelaPretrage").show();
        $("#dodajVozacaPolja").hide();
        $("#blok").hide();
        $("#dodajVoznjuPolja").hide();

        $.get("/api/Voznja/GetSveVoznje", "")
            .done(function (result) {
                TabelaAdmin(result);
                DodajDatum(result);
                DodajImenaPrezimena();

                sessionStorage.setItem("adminvidisve", true);
                sessionStorage.setItem("sortirajDatum", false);
                sessionStorage.setItem("sortirajOcena", false);
                sessionStorage.setItem("pocetna", true);
                var divheader = $("#divheader").html();
                sessionStorage.setItem("divheader", divheader);
                var divbody = $("#divbody").html();
                sessionStorage.setItem("divbody", divbody);
                sessionStorage.setItem("divmap", "");
            });
    });

    $(document).on("click", "#vslobodne", function () {
        $("#ulogovanMessage").html("");
        $("#ulogovanMessage").hide();
        $("#mapaodrediste").html("");
        $("#mapaodrediste").hide();
        $("#divtabelapretrage").show();
        $("#registracijaIOpis").hide();
        $("#registrovan").hide();
        $("#ulogovan").show();
        $("#tabelaPretrage").show();
        $("#dodajVozacaPolja").hide();
        $("#blok").hide();
        $("#dodajVoznjuPolja").hide();

        $.get("/api/Voznja/GetSlobodneV", "")
            .done(function (result) {
                TabelaVozac(result);
                DodajDatum(result);

                sessionStorage.setItem("adminvidisve", true);
                sessionStorage.setItem("sortirajDatum", false);
                sessionStorage.setItem("sortirajOcena", false);
                sessionStorage.setItem("pocetna", true);
                var divheader = $("#divheader").html();
                sessionStorage.setItem("divheader", divheader);
                var divbody = $("#divbody").html();
                sessionStorage.setItem("divbody", divbody);
                sessionStorage.setItem("divmap", "");
            });
    });
    
    $(document).on("click", "#onemogucikriterujume", function () {
        Onemoguci();
        PocetnaStrana();
    });

    function Onemoguci() {
        $("#ulogovanMessage").html("");
        $("#ulogovanMessage").hide();
        sessionStorage.setItem("filterstatus", "");
        sessionStorage.setItem("oddatumpretraga", "");
        sessionStorage.setItem("dodatumpretraga", "");
        sessionStorage.setItem("odocenapretraga", "");
        sessionStorage.setItem("doocenapretraga", "");
        sessionStorage.setItem("odcenapretraga", "");
        sessionStorage.setItem("docenapretraga", "");
        $("#fs").val("");
        $("#ood").val("");
        $("#dod").val("");
        $("#odo").val("");
        $("#doo").val("");
        $("#odc").val("");
        $("#doc").val("");
        $("#atik").val("");
        $("#atpk").val("");
        $("#ativ").val("");
        $("#atpv").val("");
    };

    $(document).on("click", "#vsortira", function () {
        $("#ulogovanMessage").html("");
        $("#ulogovanMessage").hide();

        var u = {
            user: sessionStorage.getItem("user")
        }

        $.get("/api/Voznja/VozacSortira", u)
            .done(function (result) {
                TabelaVozac(result);
                DodajDatum(result);

                sessionStorage.setItem("adminvidisve", false);
                sessionStorage.setItem("sortirajDatum", false);
                sessionStorage.setItem("sortirajOcena", false);
                sessionStorage.setItem("pocetna", true);
                var divheader = $("#divheader").html();
                sessionStorage.setItem("divheader", divheader);
                var divbody = $("#divbody").html();
                sessionStorage.setItem("divbody", divbody);
                sessionStorage.setItem("divmap", "");
            });
    });

    $(document).on("click", "#admintraziip", function () {
        $("#ulogovanMessage").html("");
        $("#ulogovanMessage").hide();

        var pretraga = {
            KIme: $("#atik").val(),
            KPrezime: $("#atpk").val(),
            VIme: $("#ativ").val(),
            VPrezime: $("#atpv").val()
        };

        $.post("/api/Voznja/adminptretrazuje", pretraga)
            .done(function (result) {
                if (result === "Nema rezultata!") {
                    $("#ulogovanMessage").html("Ne postoje vo" + `&zcaron;` + "nje za tra" + `&zcaron;` + "en pretragu!");
                    $("#ulogovanMessage").show();
                        $("#adminvoznja").hide();
                }
                else {
                    $("#adminvoznja").show();
                    $("#ulogovan").show();
                    $("#admintraziimeprezime").show();
                    TabelaAdmin(result);
                }

                sessionStorage.setItem("adminvidisve", false);
                sessionStorage.setItem("sortirajDatum", false);
                sessionStorage.setItem("sortirajOcena", false);
                sessionStorage.setItem("pocetna", true);
                var divheader = $("#divheader").html();
                sessionStorage.setItem("divheader", divheader);
                var divbody = $("#divbody").html();
                sessionStorage.setItem("divbody", divbody);
                sessionStorage.setItem("divmap", "");
            });
    });
});