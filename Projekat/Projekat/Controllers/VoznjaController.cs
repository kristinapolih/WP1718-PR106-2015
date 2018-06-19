using Projekat.Models;
using Projekat.Models.Common;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;

namespace Projekat.Controllers
{
    public class VoznjaController : ApiController
    {
        [HttpPost, Route("api/Voznja/poruciVoznju")]
        public IHttpActionResult poruciVoznju(AdrILok adresaILokacija)
        {
            var intid = Podaci.GetKorisnike()[adresaILokacija.KorisnickoIme].VoznjeIDs[(Podaci.GetKorisnike()[adresaILokacija.KorisnickoIme].VoznjeIDs.Count)];
            if (Podaci.GetSveVoznje()[intid].StatusVoznje != STATUS_VOZNJE.Neuspesna || Podaci.GetSveVoznje()[intid].StatusVoznje != STATUS_VOZNJE.Otkazana || Podaci.GetSveVoznje()[intid].StatusVoznje != STATUS_VOZNJE.Uspesna)
            {
                return Ok("Ne mozete da narucite sledecu voznju!");
            }
            else
            {
                Voznja v = new Voznja();
                if (Podaci.GetKorisnike().ContainsKey(adresaILokacija.KorisnickoIme))
                {
                    v.Musterija = Podaci.GetKorisnike()[adresaILokacija.KorisnickoIme];
                    v.StatusVoznje = STATUS_VOZNJE.Kreirana;
                }
                else if (Podaci.GetDispecere().ContainsKey(adresaILokacija.KorisnickoIme))
                {
                    v.Dispecer = Podaci.GetDispecere()[adresaILokacija.KorisnickoIme];
                    //ponuditi 5 najblizih
                    //v.Vozac = Podaci.GetVozace()[(Podaci.GetSlobodneVozace()[0])];
                    // Podaci.GetSlobodneVozace().Remove(v.Vozac.KorisnickoIme);
                    v.StatusVoznje = STATUS_VOZNJE.Formirana;
                }
                var date = DateTime.Now;
                v.DatumIVremePorudzbine = (date.ToString(Podaci.format));
                v.ID = ++Podaci.cnt;
                if (adresaILokacija.TipAutomobila == TIP_AUTOMOBILA.Kombi.ToString())
                    v.TipAutomobila = TIP_AUTOMOBILA.Kombi;
                else
                    v.TipAutomobila = TIP_AUTOMOBILA.Putnicki;
                v.LokacijaPolazista = new Lokacija();
                v.LokacijaPolazista.Adresa = new Adresa();
                v.LokacijaPolazista.Adresa.UlicaIBroj = adresaILokacija.UlicaiBroj;
                v.LokacijaPolazista.Adresa.MestoIPostanskiFah = adresaILokacija.MestoiPostanski;
                v.LokacijaPolazista.GeoCoordinate = new Koordinate();
                v.LokacijaPolazista.GeoCoordinate.Longitude = adresaILokacija.xlong;
                v.LokacijaPolazista.GeoCoordinate.Latitude = adresaILokacija.ylatit;

                Korisnik k = new Korisnik();
                k.KorisnickoIme = adresaILokacija.KorisnickoIme;
                k.Pol = Podaci.GetKorisnike()[adresaILokacija.KorisnickoIme].Pol;
                k.VoznjeIDs.Add(v.ID);
                Podaci.IzmeniKorisnika(adresaILokacija.KorisnickoIme, k);
                Podaci.DodajVoznje(v);
                Podaci.GetSlobodneVoznje().Add(v.ID);
            }
            return Ok();
        }


        [HttpGet, Route("api/Voznja/GetVoznje")]
        public IHttpActionResult GetVoznje([FromUri]Korisnik korisnik)
        {
            if (korisnik.Uloga == ULOGA.Musterija)
            {
                List<Voznja> ret = new List<Voznja>();
                foreach (int id in Podaci.GetKorisnike()[korisnik.KorisnickoIme].VoznjeIDs)
                {
                    ret.Add(Podaci.GetSveVoznje()[id]);
                }
                return Ok(ret);
            }
            else if (korisnik.Uloga == ULOGA.Vozac)
            {
                List<Voznja> ret = new List<Voznja>();
                foreach (int id in Podaci.GetVozace()[korisnik.KorisnickoIme].VoznjeIDs)
                {
                    ret.Add(Podaci.GetSveVoznje()[id]);
                }
                foreach (int id in Podaci.GetSlobodneVoznje())
                {
                    ret.Add(Podaci.GetSveVoznje()[id]);
                }
                return Ok(ret);
            }
            else if (korisnik.Uloga == ULOGA.Admin)
            {
                List<Voznja> ret = new List<Voznja>();
                foreach (int id in Podaci.GetDispecere()[korisnik.KorisnickoIme].VoznjeIDs)
                {
                    ret.Add(Podaci.GetSveVoznje()[id]);
                }
                foreach (int id in Podaci.GetSlobodneVoznje())
                {
                    ret.Add(Podaci.GetSveVoznje()[id]);
                }
                return Ok(ret);
            }
            else
            {
                return Ok("Niste porucivali voznje");
            }
        }


        [HttpPost, Route("api/Voznja/DodajKomentar")]
        public IHttpActionResult DodajKomentar(Komentar kom)
        {
            var date = DateTime.Now;
            kom.DatumObjave = (date.ToString(Podaci.format));

            Voznja v = new Voznja();
            v.Komentar = kom;
            Podaci.IzmeniVoznju(kom.Voznja, v);

            return Ok();
        }


        [HttpGet, Route("api/Voznja/OtkaziVoznju")]
        public IHttpActionResult OtkaziVoznju([FromUri]int id)
        {
            Voznja v = Podaci.GetSveVoznje()[id];
            v.StatusVoznje = STATUS_VOZNJE.Otkazana;
            
            Podaci.IzmeniVoznju(id, v);

            return Ok();
        }


        [HttpGet, Route("api/Voznja/GetKomentar")]
        public IHttpActionResult GetKomentar([FromUri]int id)
        {
            Komentar k = Podaci.GetSveVoznje()[id].Komentar;

            return Ok(k);
        }


        [HttpGet, Route("api/Voznja/UnesiOdrediste")]
        public IHttpActionResult UnesiOdrediste([FromUri]AdrILok a)
        {
            Lokacija l = new Lokacija();
            l.Adresa = new Adresa();
            l.Adresa.MestoIPostanskiFah = a.MestoiPostanski;
            l.Adresa.UlicaIBroj = a.UlicaiBroj;
            l.GeoCoordinate = new Koordinate();
            l.GeoCoordinate.Latitude = a.ylatit;
            l.GeoCoordinate.Longitude = a.xlong;

            Voznja v = new Voznja();
            v.LokacijaOdredista = l;
            Podaci.IzmeniVoznju(a.IDVoznje, v);

            Vozac vozac = new Vozac();
            vozac.KorisnickoIme = a.KorisnickoIme;
            vozac.Lokacija = l;
            vozac.Slobodan = false;
            Podaci.IzmeniVozaca(a.KorisnickoIme, vozac);

            return Ok();
        }


        [HttpGet, Route("api/Voznja/PrihvatiVoznju")]
        public IHttpActionResult PrihvatiVoznju([FromUri]AdrILok a)
        {
            Podaci.GetSlobodneVozace().Remove(a.KorisnickoIme);

            Voznja v = new Voznja();
            v.Vozac = Podaci.GetVozace()[a.KorisnickoIme];
            v.StatusVoznje = STATUS_VOZNJE.Prihvacena;
            Podaci.IzmeniVoznju(a.IDVoznje, v);

            Vozac vozac = new Vozac();
            vozac.Slobodan = false;
            vozac.VoznjeIDs.Add(a.IDVoznje);
            Podaci.IzmeniVozaca(a.KorisnickoIme, vozac);

            return Ok();
        }


        [HttpGet, Route("api/Voznja/ZavrsiVoznju")]
        public IHttpActionResult ZavrsiVoznju([FromUri]AdrILok a)
        {
            Podaci.GetSlobodneVozace().Add(a.KorisnickoIme);

            Voznja v = new Voznja();
            v.Vozac = Podaci.GetVozace()[a.KorisnickoIme];
            v.StatusVoznje = StatusHelper.GetStatus(a.Status);
            v.Iznos = a.Cena;
            Podaci.IzmeniVoznju(a.IDVoznje, v);

            if (StatusHelper.GetStatus(a.Status) == STATUS_VOZNJE.Neuspesna)
            {
                v.Iznos = 0;
                v.LokacijaOdredista = null;
            }

            Vozac vozac = new Vozac();
            vozac.Slobodan = true;
            Podaci.IzmeniVozaca(a.KorisnickoIme, vozac);

            return Ok();
        }


        [HttpGet, Route("api/Voznja/SortirajDatum")]
        public IHttpActionResult SortirajDatum([FromUri]string user)
        {
            List<Voznja> ret = new List<Voznja>();
            foreach (int id in Podaci.GetKorisnike()[user].VoznjeIDs)
            {
                ret.Add(Podaci.GetSveVoznje()[id]);
            }
            ret.OrderBy(x => x.DatumIVremePorudzbine);

            return Ok(ret);
        }
        [HttpGet, Route("api/Voznja/SortirajOcena")]
        public IHttpActionResult SortirajOcena([FromUri]string user)
        {
            List<Voznja> ret = new List<Voznja>();
            foreach (int id in Podaci.GetKorisnike()[user].VoznjeIDs)
            {
                ret.Add(Podaci.GetSveVoznje()[id]);
            }
            ret.OrderBy(x => x.Komentar.Ocena);

            return Ok(ret);
        }
        [HttpGet, Route("api/Voznja/FiltrirajStatus")]
        public IHttpActionResult FiltrirajStatus([FromUri]string user)
        {
            List<Voznja> ret = new List<Voznja>();
            foreach (int id in Podaci.GetKorisnike()[user].VoznjeIDs)
            {
                if()
                ret.Add(Podaci.GetSveVoznje()[id]);
            }

            return Ok(ret);
        }
    }
}
