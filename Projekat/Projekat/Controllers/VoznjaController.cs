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
            if (CheckDrives(adresaILokacija.KorisnickoIme))
            {
                return Ok("Ne mozete da narucite sledecu voznju!");
            }
            else
            {
                Voznja v = new Voznja();
                v.ID = ++Podaci.cnt;
                Korisnik k = new Korisnik();
                k.KorisnickoIme = adresaILokacija.KorisnickoIme;
                k.Pol = Podaci.GetKorisnike()[adresaILokacija.KorisnickoIme].Pol;
                k.VoznjeIDs = Podaci.GetKorisnike()[adresaILokacija.KorisnickoIme].VoznjeIDs;
                k.VoznjeIDs.Add(v.ID);
                Podaci.IzmeniKorisnika(adresaILokacija.KorisnickoIme, k);
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
                
                Podaci.DodajVoznje(v);
                Podaci.GetSlobodneVoznje().Add(v.ID);
            }
            return Ok();
        }

        public bool CheckDrives(string k)
        {
            bool ret = false;
            List<int> ids = new List<int>();
            ids = Podaci.GetKorisnike()[k].VoznjeIDs;

            foreach(Voznja v in Podaci.GetSveVoznje().Values)
            {
                foreach (int id in ids)
                {
                    if (v.ID == id)
                    {
                        if (v.StatusVoznje != STATUS_VOZNJE.Neuspesna && v.StatusVoznje != STATUS_VOZNJE.Otkazana && v.StatusVoznje != STATUS_VOZNJE.Uspesna)
                        {
                            ret = true;
                            break;
                        }
                    }
                }
            }
            return ret;
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
            v.StatusVoznje = Podaci.GetSveVoznje()[kom.Voznja].StatusVoznje;
            v.Komentar = kom;
            if (kom.Ocena == 0 || kom.Ocena.CompareTo(null) == 0)
                kom.Ocena = 0;
            Podaci.IzmeniVoznju(kom.Voznja, v);

            return Ok();
        }


        [HttpGet, Route("api/Voznja/OtkaziVoznju")]
        public IHttpActionResult OtkaziVoznju([FromUri]int user)
        {
            Voznja v = Podaci.GetSveVoznje()[user];
            v.StatusVoznje = STATUS_VOZNJE.Otkazana;

            Podaci.IzmeniVoznju(user, v);

            return Ok();
        }


        [HttpGet, Route("api/Voznja/GetKomentar")]
        public IHttpActionResult GetKomentar([FromUri]int voznja)
        {
            Komentar k = Podaci.GetSveVoznje()[voznja].Komentar;

            return Ok(k);
        }


        [HttpGet, Route("api/Voznja/UnesiOdrediste")]
        public IHttpActionResult UnesiOdrediste([FromUri]AdrILok a)
        {
            Voznja v = new Voznja();
            v.LokacijaOdredista = new Lokacija();
            v.LokacijaOdredista.Adresa = new Adresa();
            v.LokacijaOdredista.Adresa.MestoIPostanskiFah = a.MestoiPostanski;
            v.LokacijaOdredista.Adresa.UlicaIBroj = a.UlicaiBroj;
            v.LokacijaOdredista.GeoCoordinate = new Koordinate();
            v.LokacijaOdredista.GeoCoordinate.Latitude = a.ylatit;
            v.LokacijaOdredista.GeoCoordinate.Longitude = a.xlong;
            v.StatusVoznje = STATUS_VOZNJE.Prihvacena;
            Podaci.IzmeniVoznju(a.IDVoznje, v);

            Vozac vozac = new Vozac();
            vozac.KorisnickoIme = a.KorisnickoIme;
            vozac.Lokacija = new Lokacija ();
            vozac.Lokacija.Adresa = new Adresa();
            vozac.Lokacija.GeoCoordinate = new Koordinate();
            vozac.Lokacija.Adresa.MestoIPostanskiFah = a.MestoiPostanski;
            vozac.Lokacija.Adresa.UlicaIBroj = a.UlicaiBroj;
            vozac.Lokacija.GeoCoordinate.Latitude = a.ylatit;
            vozac.Lokacija.GeoCoordinate.Longitude = a.xlong;
            vozac.Slobodan = false;
            Podaci.IzmeniVozaca(a.KorisnickoIme, vozac);

            return Ok();
        }


        [HttpGet, Route("api/Voznja/PrihvatiVoznju")]
        public IHttpActionResult PrihvatiVoznju([FromUri]AdrILok a)
        {
            Podaci.GetSlobodneVozace().Remove(a.KorisnickoIme);
            Podaci.GetSlobodneVoznje().Remove(a.IDVoznje);

            Vozac vozac = new Vozac();
            vozac.Slobodan = false;
            vozac.VoznjeIDs = Podaci.GetVozace()[a.KorisnickoIme].VoznjeIDs;
            vozac.VoznjeIDs.Add(a.IDVoznje);
            Podaci.IzmeniVozaca(a.KorisnickoIme, vozac);

            Voznja v = new Voznja();
            v.Vozac = new Vozac();
            v.Vozac = Podaci.GetVozace()[a.KorisnickoIme];
            v.StatusVoznje = STATUS_VOZNJE.Prihvacena;
            Podaci.IzmeniVoznju(a.IDVoznje, v);

            return Ok();
        }


        [HttpGet, Route("api/Voznja/ZavrsiVoznju")]
        public IHttpActionResult ZavrsiVoznju([FromUri]AdrILok a)
        {
            Podaci.GetSlobodneVozace().Add(a.KorisnickoIme);

            Voznja v = new Voznja();
            v.Vozac = Podaci.GetVozace()[a.KorisnickoIme];
            if (a.Status.Contains("Neus"))
                v.StatusVoznje = STATUS_VOZNJE.Neuspesna;
            else
                v.StatusVoznje = STATUS_VOZNJE.Uspesna;
            v.Iznos = a.Cena;
            if (v.StatusVoznje == STATUS_VOZNJE.Neuspesna)
            {
                v.Iznos = 0;
                v.LokacijaOdredista = null;
            }
            Podaci.IzmeniVoznju(a.IDVoznje, v);

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
            List<Voznja> sort = ret.OrderByDescending(x => x.DatumIVremePorudzbine).ToList();

            return Ok(sort);
        }
        [HttpGet, Route("api/Voznja/SortirajOcena")]
        public IHttpActionResult SortirajOcena([FromUri]string user)
        {
            List<Voznja> ret = new List<Voznja>();
            foreach (int id in Podaci.GetKorisnike()[user].VoznjeIDs)
            {
                ret.Add(Podaci.GetSveVoznje()[id]);
            }
            List<Voznja> sort = ret.OrderByDescending(x => x.Komentar.Ocena).ToList();

            return Ok(sort);
        }

        [HttpPost, Route("api/Voznja/IzvrsiPretragu")]
        public IHttpActionResult IzvrsiPretragu(Pretraga p)
        {
            List<Voznja> result = Podaci.GetSveVoznje().Values.ToList();
            List<int> ids = new List<int>();
            ids = Podaci.GetKorisnike()[p.KIme].VoznjeIDs;
            if (p.FilterStatus != null)
            {
                result = PretragaString(ids, PRETRAGA.Status, p.FilterStatus.Substring(0, 3), result);
            }
            if(p.OdDatum != null)
            {
                result = PretragaString(ids, PRETRAGA.OdDatum, p.OdDatum, result);
            }
            if (p.DoDatum != null)
            {
                result = PretragaString(ids, PRETRAGA.DoDatum, p.DoDatum, result);
            }
            if (p.OdCena != 0)
            {
                result = PretragaInt(ids, PRETRAGA.OdCena, p.OdCena, result);
            }
            if (p.DoCena != 0)
            {
                result = PretragaInt(ids, PRETRAGA.DoCena, p.DoCena, result);
            }
            if (p.OdOcena != 0)
            {
                result = PretragaInt(ids, PRETRAGA.OdOcena, p.OdOcena, result);
            }
            if (p.DoOcena != 0)
            {
                result = PretragaInt(ids, PRETRAGA.DoOcena, p.DoOcena, result);
            }

            if (result.Count > 0)
                return Ok(result);
            else
                return Ok("Ne postoje voznje za trazene kriterujeme!");
        }

        public List<Voznja> PretragaString(List<int> ids, PRETRAGA p, string s, List<Voznja> r)
        {
            List<Voznja> result = new List<Voznja>();
            foreach (Voznja v in r)
            {
                foreach (int id in ids)
                {
                    if (v.ID == id)
                    {
                        if(p == PRETRAGA.Status && v.StatusVoznje.ToString().Substring(0, 3) == s)
                        {
                            result.Add(v);
                        }
                        else if (p == PRETRAGA.OdDatum && DateTime.Compare(DateTime.Parse(v.DatumIVremePorudzbine), DateTime.Parse(s)) >= 0 )
                        {
                            result.Add(v);
                        }
                        else if (p == PRETRAGA.DoDatum && DateTime.Compare(DateTime.Parse(v.DatumIVremePorudzbine), DateTime.Parse(s)) <= 0)
                        {
                            result.Add(v);
                        }
                    }
                }
            }
            return result;
        }

        public List<Voznja> PretragaInt(List<int> ids, PRETRAGA p, int i, List<Voznja> r)
        {
            List<Voznja> result = new List<Voznja>();
            foreach (Voznja v in r)
            {
                foreach (int id in ids)
                {
                    if (v.ID == id)
                    {
                        if (p == PRETRAGA.OdCena && v.Iznos >= i)
                        {
                            result.Add(v);
                        }
                        else if (p == PRETRAGA.DoCena && v.Iznos <= i)
                        {
                            result.Add(v);
                        }
                        else if (p == PRETRAGA.OdOcena && v.Komentar.Ocena >= i)
                        {
                            result.Add(v);
                        }
                        else if (p == PRETRAGA.DoOcena && v.Komentar.Ocena <= i)
                        {
                            result.Add(v);
                        }
                    }
                }
            }
            return result;
        }

        [HttpPost, Route("api/Voznja/PromeniLokaciju")]
        public IHttpActionResult PromeniLokaciju(AdrILok a)
        {
            Voznja v = new Voznja();
            Lokacija l = new Lokacija();
            l.Adresa = new Adresa();
            l.Adresa.MestoIPostanskiFah = a.MestoiPostanski;
            l.Adresa.UlicaIBroj = a.UlicaiBroj;
            l.GeoCoordinate = new Koordinate();
            l.GeoCoordinate.Latitude = a.ylatit;
            l.GeoCoordinate.Longitude = a.xlong;
            v.LokacijaPolazista = l;
            v.ID = a.IDVoznje;
            v.TipAutomobila = Podaci.GetSveVoznje()[a.IDVoznje].TipAutomobila;

            Podaci.IzmeniVoznju(a.IDVoznje,v );

            return Ok();
        }

        [HttpGet, Route("api/Voznja/PromeniVozilo")]
        public IHttpActionResult PromeniVozilo([FromUri]string a, [FromUri]int id)
        {
            Voznja v = new Voznja();
            v.ID = id;
            if (a == "Kombi")
                v.TipAutomobila = TIP_AUTOMOBILA.Kombi;
            else
                v.TipAutomobila = TIP_AUTOMOBILA.Putnicki;

            Podaci.IzmeniVoznju(id, v);

            return Ok();
        }
    }
}
