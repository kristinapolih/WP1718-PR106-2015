using Projekat.Models;
using Projekat.Models.Common;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Script.Serialization;

namespace Projekat.Controllers
{
    public class MusterijaController : ApiController
    {
        public static Vozac voz;

        [HttpPost, Route("api/Musterija/Registracija")]
        public IHttpActionResult NovaMusterija(Korisnik korisnik)
        {
            if (Podaci.GetKorisnike().ContainsKey(korisnik.KorisnickoIme))
            {
                return Ok("Korisnicko ime vec postoji");
            }
            else if (Podaci.GetVozace().ContainsKey(korisnik.KorisnickoIme))
            {
                return Ok("Korisnicko ime vec postoji");
            }
            else if (Podaci.GetDispecere().ContainsKey(korisnik.KorisnickoIme))
            {
                return Ok("Korisnicko ime vec postoji");
            }
            else
            {
                Podaci.DodajKorisnik(korisnik);
                return Ok();
            }
        }


        [HttpPost, Route("api/Musterija/RegistracijaVozaca")]
        public IHttpActionResult RegistracijaVozaca(Vozac vozac)
        {
            if (Podaci.GetKorisnike().ContainsKey(vozac.KorisnickoIme))
            {
                return Ok("Korisnicko ime vec postoji");
            }
            else if (Podaci.GetVozace().ContainsKey(vozac.KorisnickoIme))
            {
                return Ok("Korisnicko ime vec postoji");
            }
            else if (Podaci.GetDispecere().ContainsKey(vozac.KorisnickoIme))
            {
                return Ok("Korisnicko ime vec postoji");
            }
            else
            {
                voz = new Vozac();
                voz = vozac;
                Podaci.GetSlobodneVozace().Add(voz.KorisnickoIme);
                return Ok();
            }
        }


        [HttpPost, Route("api/Musterija/ail")]
        public IHttpActionResult ail(AdrILok adresaILokacija)
        {
            Automobil a = new Automobil();
            a.GodisteAutomobila = adresaILokacija.GodisteAutomobila;
            if (adresaILokacija.TipAutomobila == TIP_AUTOMOBILA.Kombi.ToString())
                a.TipAutomobila = TIP_AUTOMOBILA.Kombi;
            else
                a.TipAutomobila = TIP_AUTOMOBILA.Putnicki;

            Adresa adresa = new Adresa();
            adresa.UlicaIBroj = adresaILokacija.UlicaiBroj;
            adresa.MestoIPostanskiFah = adresaILokacija.MestoiPostanski;

            Lokacija l = new Lokacija();
            l.Adresa = adresa;
            l.GeoCoordinate = new Koordinate();
            l.GeoCoordinate.Longitude = adresaILokacija.xlong;
            l.GeoCoordinate.Latitude = adresaILokacija.ylatit;

            voz.Automobil = a;
            voz.Lokacija = l;
            Podaci.DodajVozac(voz);

            return Ok();
        }
    }
}