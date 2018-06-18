$(document).ready(function () {

    window.onload = function refresh() {
        if (sessionStorage.getItem("user") !== null) {
            var head = this.sessionStorage.getItem("divheader");
            $("#divheader").html(head);
            var body = this.sessionStorage.getItem("divbody");
            $("#divbody").html(body);
            var divmap = this.sessionStorage.getItem("divmap");
            $("#map").html("");
            $("#map").html(divmap);
            if (sessionStorage.getItem("blokreload")) {
                BlokReload();
                sessionStorage.setItem("blokreload", false);
            }
            else {
                sessionStorage.setItem("blokreload", false);
            }
            BlokiraneOdjavi();
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
                $("#tel p").text("Broj telefona mo" + `&zcaron;` + "e da sadr" + `&zcaron;` + "i samo brojeve!");
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
        if ($("#lozin").val() !== $("#ponovljenaLozinka").val()) {
            $("#errorMessageReg").text("Lozinka i ponovljena loznika se ne podudaraju!");
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
                $("#dodajVozacaRegistracija #em p").text("Mora da postoji '@'!");
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
                $("#dodajVozacaRegistracija #tel p").text("Broj telefona mo" + `&zcaron;` + "e da sadr" + `&zcaron;` + "i samo brojeve!");
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
                $("#dodajVozacaRegistracija #jm p").text("JMBG mora da ima 13 cifara, bez slova!");
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
            $("#dodajVozacaRegistracija #errorMessageReg").text("Lozinka i ponovljena loznika se ne podudaraju!");
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
                $("#vozac").html("");
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
            success: function (voz) {
                if (voz !== "Ne postoje blokirani korisnici!") {
                    let sessionUser = sessionStorage.getItem("user");
                    for (var k in voz) {
                        if (k.KorisnickoIme === sessionUser) {
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
                        else if (result === "Blokirani ste!"){
                            $("#message").text(result);
                        }
                        else {
                            if (result.Uloga === 0) {
                                $("#uloga").append(`<option value="Vozac" id="vozac" />`);
                                $("#dodajVozacaButton").show();
                                $("#dodajVoznjuButton").show();
                                $("#blokiraj").show();
                            }
                            if (result.Uloga === 2) {
                                $("#dodajVoznjuButton").show();
                            }
                            $("#username").text(result.KorisnickoIme);
                            $("#login").hide();
                            $("#logout").show();
                            $("#registracijaIOpis").hide();
                            $("#ulogovan").show();
                            $("#profilButton").show();

                            sessionStorage.setItem("user", result.KorisnickoIme);
                            sessionStorage.setItem(result.KorisnickoIme, result);
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
                        $("#errorMessageReg").text("Korisni" + `&ccaron;` + "ko ime vec postoji");
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
            $("#mess").value("Lozinka mora biti popunjena!");
            upis = false;
        }
        if ($("#k").val() === "" || $("#k").val() === " ") {
            $("#k").css("border-color", "crimson");
            $("#k").focus();
            $("#mess").text("Korisni" + `&ccaron;` + "ko ime mora biti popunjeno!");
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
                            if (result.Uloga === 2) {
                                $("#dodajVoznjuButton").show();
                            }
                            $("#username").text(result.KorisnickoIme);
                            $("#login").hide();
                            $("#logout").show();
                            $("#registracijaIOpis").hide();
                            $("#ulogovan").show();
                            $("#profilButton").show();
                            sessionStorage.setItem("user", result.KorisnickoIme);
                            sessionStorage.setItem(result.KorisnickoIme, result);
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
        $("#ulogovan").hide();
        $("#registrovan").hide();
        $("#registracijaIOpis").hide();

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
        var divmap = $("#map").html();
        sessionStorage.setItem("divmap", divmap);
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
                $("#god p").text("Godi" + `&scaron;` + "mo" + `&zcaron;` + "e da sadr" + `&zcaron;` + "i samo brojeve!");
                $("#god br").hide();
                $("#godiste").focus();
                upis = false;
            }
            else if ($("#godiste").val().length !== 4) {
                $("#godiste").css("border-color", "crimson");
                $("#god p").show();
                $("#god p").text("Godi" + `&scaron;` + "mo" + `&zcaron;` + "e da sadr" + `&zcaron;` + "i samo 4 broja!");
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
                        $("#dodajVozacaRegistracija #errorMessageReg").text("Korisni" + `&ccaron;` + "ko ime vec postoji!");
                        $("#korisnicko").css("border-color", "crimson");
                        $("#kor br").hide();
                        $("#korisnicko").focus();
                    }
                }
            });

            $.ajax({
                url: "api/Musterija/ail",
                data: auto,
                type: "POST",
                success: function (result) {
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
            });
            $("#mapaDodajVozaca").html("");
        }
    });

    $(document).on("click", "#dodajVoznjuButton", function () {
        BlokiraneOdjavi();
        
        $("#registracijaIOpis").hide();
        $("#registrovan").hide();
        $("#ulogovan").hide();
        $("#dodajVozacaPolja").hide();
        $("#blok").hide();
        $("#dodajVoznjuPolja").show();

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
        var divmap = $("#map").html();
        sessionStorage.setItem("divmap", divmap);
    });

    $(document).on("click", "#narucivoznju", function () {
        BlokiraneOdjavi();

        let lok = {
            KorisnickoIme: $("#username").val(),
            TipAutomobila: $("#narucivoznju #tipautomobila option:selected").val(),
            xlong: LokAdr.xx,
            ylatit: LokAdr.yy,
            UlicaiBroj: LokAdr.ulica_broj,
            MestoiPostanski: LokAdr.grad
        };

        let upis = true;
        if (LokAdr.xx === null || LokAdr.yy === null || LokAdr.ulica_broj === null || LokAdr.grad === null) {
            $("#narucivoznju #mapaDodajVoznju #map p").show();
            upis = false;
        }
        if (upis) {
            $.ajax({
                url: "api/Voznja/poruciVoznju",
                data: lok,
                type: "POST",
                success: function (result) {
                    $("#login").hide();
                    $("#registracijaIOpis").hide();
                    $("#registrovan").hide();
                    $("#dodajVozacaPolja").hide();
                    $("#map").hide();
                    $("#narucivoznju").hide();
                    $("#logout").show();
                    $("#ulogovan").show();
                    $("#profilButton").show();
                    var divheader = $("#divheader").html();
                    sessionStorage.setItem("divheader", divheader);
                    var divbody = $("#divbody").html();
                    sessionStorage.setItem("divbody", divbody);
                    sessionStorage.setItem("divmap", "");
                }
            });
        }
        $("#mapaDodajVozaca").html("");
    });

    $(document).on("click", "#blokiraj", function () {
        $("#registracijaIOpis").hide();
        $("#dodajVozacaPolja").hide();
        $("#dodajVoznjuPolja").hide();
        $("#registrovan").hide();
        $("#ulogovan").hide();
        $("#blok").show();

        BlokReload();
        UnblokReload();

        var divheader = $("#divheader").html();
        sessionStorage.setItem("divheader", divheader);
        var divbody = $("#divbody").html();
        sessionStorage.setItem("divbody", divbody);
        sessionStorage.setItem("divmap", "");
        sessionStorage.setItem("blokreload", true);
    });

    $(document).on("click", "#blokirajKorisnika", function () {
        $("#errorOdlokiraj").html("");
        let upis = true;
        if ($("#korisckoImeBlokiraj").val() === "" || $("#korisckoImeBlokiraj").val() === " ") {
            $("#korisckoImeBlokiraj").css("border-color", "crimson");
            $("#korisnickoBlokiraj p").show();
            $("#korisnickoBlokiraj br").hide();
            $("#korisckoImeBlokiraj").focus();
            upis = false;
        }

        if (upis) {
            let blok = {
                korisckoImeBlokiraj: $("#korisckoImeBlokiraj").val()
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
                        $("#errorBlokiraj").html("Korisnik " + `<b>`+result+`</b>` + " uspe" + `&scaron;` + "no blokiran!");
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
        }
    });

    $(document).on("click", "#odblokirajKorisnika", function () {
        $("#errorBlokiraj").html("");
        let upis = true;
        if ($("#korisckoImeBlokirani").val() === "" || $("#korisckoImeBlokirani").val() === " ") {
            $("#korisckoImeBlokirani").css("border-color", "crimson");
            $("#korisnickoBlokirani p").show();
            $("#korisnickoBlokirani br").hide();
            $("#korisckoImeBlokirani").focus();
            upis = false;
        }

        if (upis) {
            let blok = {
                korisckoImeOdblokiraj: $("#korisckoImeBlokirani").val()
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
                        $("#errorOdlokiraj").html("Korisnik " + `<b>` + result + `</b>` + " uspe" + `&scaron;` + "no odblokiran!");
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
        }
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
                                let blok = "<br/><table border=\"0\"><tr><td width=\"100px\">Korisnicko Ime</td><td width=\"100px\">Uloga</td><td width=\"100px\">Ime</td><td width=\"100px\">Prezime</td></tr>";
                                for (var k in voz) {
                                    blok += "<tr><td width=\"100px\">" + voz[k].KorisnickoIme + "</td>";
                                    blok += "<td width=\"100px\">Voza" + `&ccaron;` + "</td>";
                                    blok += "<td width=\"100px\">" + voz[k].Ime + "</td>";
                                    blok += "<td width=\"100px\">" + voz[k].Prezime + "</td></tr>";
                                }
                                blok += "</table><br/>";
                                $("#odbloksvikorisnici").html(blok);
                                sessionStorage.setItem("blokreload", true);
                            }
                        }
                    });
                }
                else {
                    var blok = "<br/><table border=\"0\"><tr><td width=\"100px\">Korisnicko Ime</td><td width=\"100px\">Uloga</td><td width=\"100px\">Ime</td><td width=\"100px\">Prezime</td></tr>";
                    for (var k in result) {
                        blok += "<tr><td>" + result[k].KorisnickoIme + "</td>";
                        blok += "<td>Mu" + `&scaron;` + "terija</td>";
                        blok += "<td>" + result[k].Ime + "</td>";
                        blok += "<td>" + result[k].Prezime + "</td></tr>";
                    }
                    blok += "</table>";
                    $("#odbloksvikorisnici").html(blok);
                    $.ajax({
                        url: "api/Korisnik/GetBlokiraneVozace",
                        data: "",
                        type: "GET",
                        success: function (voz) {
                            if (voz !== "Ne postoje blokirani korisnici!") {
                                var blok = "<table border=\"0\">";
                                for (var k in voz) {
                                    blok += "<tr><td width=\"100px\">" + voz[k].KorisnickoIme + "</td>";
                                    blok += "<td width=\"100px\">Voza" + `&ccaron;` + "</td>";
                                    blok += "<td width=\"100px\">" + voz[k].Ime + "</td>";
                                    blok += "<td width=\"100px\">" + voz[k].Prezime + "</td></tr>";
                                }
                                blok += "</table><br/><br/>";
                                $("#odbloksvikorisnici").append(blok);
                                sessionStorage.setItem("blokreload", true);
                            }
                            else {
                                $("#odbloksvikorisnici").append("<br/><br/>");
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
                            if (voz === "Ne postoje blokirani korisnici!") {
                                let blok = "<p>Ne postoje blokirani korisnici!</p>";
                                $("#bloksvikorisnici").html(blok);
                            }
                            else {
                                let blok = "<br/><table border=\"0\"><tr><td width=\"100px\">Korisnicko Ime</td><td width=\"100px\">Uloga</td><td width=\"100px\">Ime</td><td width=\"100px\">Prezime</td></tr>";
                                for (var k in voz) {
                                    blok += "<tr><td width=\"100px\">" + voz[k].KorisnickoIme + "</td>";
                                    blok += "<td width=\"100px\">Voza" + `&ccaron;` + "</td>";
                                    blok += "<td width=\"100px\">" + voz[k].Ime + "</td>";
                                    blok += "<td width=\"100px\">" + voz[k].Prezime + "</td></tr>";
                                }
                                blok += "</table><br/><br/>";
                                $("#bloksvikorisnici").html(blok);
                                sessionStorage.setItem("blokreload", true);
                            }
                        }
                    });
                }
                else {
                    var blok = "<br/><table border=\"0\"><tr><td width=\"100px\">Korisnicko Ime</td><td width=\"100px\">Uloga</td><td width=\"100px\">Ime</td><td width=\"100px\">Prezime</td></tr>";
                    for (var k in result) {
                        blok += "<tr><td>" + result[k].KorisnickoIme + "</td>";
                        blok += "<td>Mu" + `&scaron;` + "terija</td>";
                        blok += "<td>" + result[k].Ime + "</td>";
                        blok += "<td>" + result[k].Prezime + "</td></tr>";
                    }
                    blok += "</table>";
                    $("#bloksvikorisnici").html(blok);
                    $.ajax({
                        url: "api/Korisnik/GetAllVozace",
                        data: "",
                        type: "GET",
                        success: function (voz) {
                            if (voz !== "Ne postoje blokirani korisnici!") {
                                var blok = "<table border=\"0\">";
                                for (var k in voz) {
                                    blok += "<tr><td width=\"100px\">" + voz[k].KorisnickoIme + "</td>";
                                    blok += "<td width=\"100px\">Voza" + `&ccaron;` + "</td>";
                                    blok += "<td width=\"100px\">" + voz[k].Ime + "</td>";
                                    blok += "<td width=\"100px\">" + voz[k].Prezime + "</td></tr>";
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
});