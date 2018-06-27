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
            if (korisnik.Email != null && korisnik.Ime != null && korisnik.JMBG != null && korisnik.KorisnickoIme != null && korisnik.Lozinka != null &&
                korisnik.Prezime != null && korisnik.Telefon != null && korisnik.Uloga.ToString() != null && korisnik.Pol.ToString() != null)
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
                    korisnik.Uloga = ULOGA.Musterija;
                    Podaci.DodajKorisnik(korisnik, korisnik.KorisnickoIme);

                    return Ok();
                }
            }
            else
                return Ok("null");
        }


        [HttpPost, Route("api/Musterija/RegistracijaVozaca")]
        public IHttpActionResult RegistracijaVozaca(Vozac vozac)
        {
            if (vozac.Email != null && vozac.Ime != null && vozac.JMBG != null && vozac.KorisnickoIme != null && vozac.Lozinka != null &&
                vozac.Prezime != null && vozac.Telefon != null && vozac.Pol.ToString() != null)
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
                    voz.Slobodan = true;
                    voz.Blokiran = false;
                    voz.Uloga = ULOGA.Vozac;
                    Podaci.DodajVozac(voz, voz.KorisnickoIme);
                    Podaci.GetSlobodneVozace().Add(voz.KorisnickoIme);

                    return Ok();
                }
            }
            else
                return Ok("null");
        }


        [HttpPost, Route("api/Musterija/ail")]
        public IHttpActionResult ail(AdrILok adresaILokacija)
        {
            if (adresaILokacija.GodisteAutomobila != null && adresaILokacija.KorisnickoIme != null &&
                adresaILokacija.MestoiPostanski != null && adresaILokacija.UlicaiBroj != null &&
                adresaILokacija.xlong != 0 && adresaILokacija.ylatit != 0)
            {
                Vozac v = new Vozac();
                Podaci.GetVozace().TryGetValue(adresaILokacija.KorisnickoIme, out v);

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

                v.Automobil = a;
                v.Lokacija = l;
                Podaci.IzmeniVozaca(adresaILokacija.KorisnickoIme, v);

                return Ok();
            }
            else
                return Ok("null");
        }
    }
}