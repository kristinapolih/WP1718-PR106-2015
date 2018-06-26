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
            if (adresaILokacija.KorisnickoIme != null &&
                adresaILokacija.MestoiPostanski != null && adresaILokacija.UlicaiBroj != null &&
                adresaILokacija.xlong != 0 && adresaILokacija.ylatit != 0)
            {
                if (Podaci.GetKorisnike().ContainsKey(adresaILokacija.KorisnickoIme) && CheckDrives(adresaILokacija.KorisnickoIme))
                {
                    return Ok("Ne mozete da narucite sledecu voznju!");
                }
                else
                {
                    Voznja v = new Voznja();
                    v.ID = ++Podaci.cnt;
                    Korisnik k = new Korisnik();

                    if (Podaci.GetKorisnike().ContainsKey(adresaILokacija.KorisnickoIme))
                    {
                        k.KorisnickoIme = adresaILokacija.KorisnickoIme;
                        k.Pol = Podaci.GetKorisnike()[adresaILokacija.KorisnickoIme].Pol;
                        k.VoznjeIDs = Podaci.GetKorisnike()[adresaILokacija.KorisnickoIme].VoznjeIDs;
                        k.VoznjeIDs.Add(v.ID);
                        Podaci.IzmeniKorisnika(adresaILokacija.KorisnickoIme, k);

                        v.Musterija = Podaci.GetKorisnike()[adresaILokacija.KorisnickoIme];
                        v.StatusVoznje = STATUS_VOZNJE.Kreirana;
                    }
                    else if (Podaci.GetDispecere().ContainsKey(adresaILokacija.KorisnickoIme))
                    {
                        v.Dispecer = Podaci.GetDispecere()[adresaILokacija.KorisnickoIme];
                        k.KorisnickoIme = adresaILokacija.KorisnickoIme;
                        k.Pol = Podaci.GetDispecere()[adresaILokacija.KorisnickoIme].Pol;
                        k.VoznjeIDs = Podaci.GetDispecere()[adresaILokacija.KorisnickoIme].VoznjeIDs;
                        k.VoznjeIDs.Add(v.ID);
                        Podaci.IzmeniDispecera(adresaILokacija.KorisnickoIme, k);
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
            else
                return Ok("null");
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
            if (korisnik.Uloga.ToString().StartsWith("M"))
            {
                List<Voznja> ret = new List<Voznja>();
                foreach (int id in Podaci.GetKorisnike()[korisnik.KorisnickoIme].VoznjeIDs)
                {
                    ret.Add(Podaci.GetSveVoznje()[id]);
                }
                return Ok(ret);
            }
            else if (korisnik.Uloga.ToString().StartsWith("V"))
            {
                List<Voznja> ret = new List<Voznja>();
                foreach (int id in Podaci.GetVozace()[korisnik.KorisnickoIme].VoznjeIDs)
                {
                    ret.Add(Podaci.GetSveVoznje()[id]);
                }
                return Ok(ret);
            }
            else if (korisnik.Uloga.ToString().StartsWith("A"))
            {
                List<Voznja> ret = new List<Voznja>();
                foreach (int id in Podaci.GetDispecere()[korisnik.KorisnickoIme].VoznjeIDs)
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
            if (kom.Korisnik != null && kom.Ocena >= 0 && kom.Opis != null && kom.Voznja != 0)
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
            else
                return Ok("null");
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
            if (a.MestoiPostanski != null && a.UlicaiBroj != null && a.xlong != 0 && a.ylatit != 0)
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
                vozac.Lokacija = new Lokacija();
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
            else
                return Ok("null");
        }


        [HttpGet, Route("api/Voznja/PrihvatiVoznju")]
        public IHttpActionResult PrihvatiVoznju([FromUri]AdrILok a)
        {
            if (a.KorisnickoIme != null && a.IDVoznje > 0)
            {
                if (Podaci.GetVozace()[a.KorisnickoIme].Slobodan == true)
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
                else
                    return Ok("zauzet");
            }
            else
                return Ok("null");
        }


        [HttpGet, Route("api/Voznja/ZavrsiVoznju")]
        public IHttpActionResult ZavrsiVoznju([FromUri]AdrILok a)
        {
            if (a.Status.ToString() != null)
            {
                Podaci.GetSlobodneVozace().Add(a.KorisnickoIme);

                Voznja v = new Voznja();
                v.Vozac = Podaci.GetVozace()[a.KorisnickoIme];
                if (a.Status.Contains("Neus"))
                    v.StatusVoznje = STATUS_VOZNJE.Neuspesna;
                else
                {
                    v.StatusVoznje = STATUS_VOZNJE.Uspesna;
                    if(a.Cena < 0)
                    {
                        return Ok("cena");
                    }
                }
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
            else
                return Ok("status");
        }


        [HttpGet, Route("api/Voznja/SortirajDatum")]
        public IHttpActionResult SortirajDatum([FromUri]string user, [FromUri]string uloga, [FromUri]string a)
        {
            List<Voznja> ret = new List<Voznja>();
            if (uloga.StartsWith("2"))
            {
                foreach (int id in Podaci.GetKorisnike()[user].VoznjeIDs)
                {
                    ret.Add(Podaci.GetSveVoznje()[id]);
                }
            }
            else if(uloga.StartsWith("1"))
            {
                if (a == "true")
                {
                    foreach (int id in Podaci.GetSlobodneVoznje())
                    {
                        ret.Add(Podaci.GetSveVoznje()[id]);
                    }
                }
                else
                {
                    foreach (int id in Podaci.GetVozace()[user].VoznjeIDs)
                    {
                        ret.Add(Podaci.GetSveVoznje()[id]);
                    }
                }
            }
            else if(uloga.StartsWith("0"))
            {
                if (a == "true")
                {
                    foreach (Voznja v in Podaci.GetSveVoznje().Values)
                    {
                        ret.Add(v);
                    }
                }
                else
                {
                    foreach (int id in Podaci.GetDispecere()[user].VoznjeIDs)
                    {
                        ret.Add(Podaci.GetSveVoznje()[id]);
                    }
                }
            }
            List<Voznja> sort = ret.OrderByDescending(x => DateTime.Parse(x.DatumIVremePorudzbine)).ToList();

            return Ok(sort);
        }
        [HttpGet, Route("api/Voznja/SortirajOcena")]
        public IHttpActionResult SortirajOcena([FromUri]string user, [FromUri]string uloga, [FromUri]string a)
        {
            List<Voznja> ret = new List<Voznja>();
            if (uloga.StartsWith("2"))
            {
                foreach (int id in Podaci.GetKorisnike()[user].VoznjeIDs)
                {
                    if (Podaci.GetSveVoznje()[id].Komentar != null)
                    {
                        ret.Add(Podaci.GetSveVoznje()[id]);
                    }
                }
            }
            else if (uloga.StartsWith("1"))
            {
                if (a == "true")
                {
                    foreach (int id in Podaci.GetSlobodneVoznje())
                    {
                        if (Podaci.GetSveVoznje()[id].Komentar != null)
                        {
                            ret.Add(Podaci.GetSveVoznje()[id]);
                        }
                    }
                }
                else
                {
                    foreach (int id in Podaci.GetVozace()[user].VoznjeIDs)
                    {
                        if (Podaci.GetSveVoznje()[id].Komentar != null)
                        {
                            ret.Add(Podaci.GetSveVoznje()[id]);
                        }
                    }
                }
            }
            else if (uloga.StartsWith("0"))
            {
                if (a == "true")
                {
                    foreach (Voznja v in Podaci.GetSveVoznje().Values)
                    {
                        if (v.Komentar != null)
                        {
                            ret.Add(v);
                        }
                    }
                }
                else
                {
                    foreach (int id in Podaci.GetDispecere()[user].VoznjeIDs)
                    {
                        if (Podaci.GetSveVoznje()[id].Komentar != null)
                        {
                            ret.Add(Podaci.GetSveVoznje()[id]);
                        }
                    }
                }
            }
            List<Voznja> sort = ret.OrderByDescending(x => x.Komentar.Ocena).ToList();

            return Ok(sort);
        }

        [HttpPost, Route("api/Voznja/IzvrsiPretragu")]
        public IHttpActionResult IzvrsiPretragu(Pretraga p)
        {
            List<Voznja> result = Podaci.GetSveVoznje().Values.ToList();
            List<int> ids = new List<int>();
            if (p.Uloga.StartsWith("2"))
            {
                ids = Podaci.GetKorisnike()[p.KIme].VoznjeIDs;
            }
            else if (p.Uloga.StartsWith("1"))
            {
                if (p.a == "true")
                {
                    foreach (int id in Podaci.GetSlobodneVoznje())
                    {
                        ids.Add(id);
                    }
                }
                else
                {
                    ids = Podaci.GetVozace()[p.KIme].VoznjeIDs;
                }
            }
            else if (p.Uloga.StartsWith("0"))
            {
                if (p.a == "true")
                {
                    foreach (int id in Podaci.GetSveVoznje().Keys)
                    {
                        ids.Add(id);
                    }
                }
                else
                {
                    ids = Podaci.GetDispecere()[p.KIme].VoznjeIDs;
                    foreach (int id in Podaci.GetSlobodneVoznje())
                    {
                        ids.Add(id);
                    }
                }
            }

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
                        if (p == PRETRAGA.OdCena && v.Iznos >= i && v.Iznos != 0)
                        {
                            result.Add(v);
                        }
                        else if (p == PRETRAGA.DoCena && v.Iznos <= i && v.Iznos != 0)
                        {
                            result.Add(v);
                        }
                        else if (p == PRETRAGA.OdOcena && v.Komentar != null && v.Komentar.Ocena >= i)
                        {
                            result.Add(v);
                        }
                        else if (p == PRETRAGA.DoOcena && v.Komentar != null && v.Komentar.Ocena <= i)
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
            if (a.KorisnickoIme != null && a.IDVoznje > 0 &&
                a.MestoiPostanski != null && a.UlicaiBroj != null &&
                a.xlong != 0 && a.ylatit != 0)
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

                Podaci.IzmeniVoznju(a.IDVoznje, v);

                return Ok();
            }
            else
                return Ok("null");
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

        [HttpGet, Route("api/Voznja/NadjiNajblize")]
        public IHttpActionResult NadjiNajblize([FromUri]int i)
        {
            Dictionary<double, Vozac> rastojanje = new Dictionary<double, Vozac>();
            double d, x, y;
            foreach (Vozac v in Podaci.GetVozace().Values)
            {
                foreach (string kime in Podaci.GetSlobodneVozace())
                {
                    if(v.KorisnickoIme == kime)
                    {
                        x = Math.Abs((Podaci.GetSveVoznje()[i].LokacijaPolazista.GeoCoordinate.Longitude) - (v.Lokacija.GeoCoordinate.Longitude));
                        y = Math.Abs((Podaci.GetSveVoznje()[i].LokacijaPolazista.GeoCoordinate.Latitude) - (v.Lokacija.GeoCoordinate.Latitude));
                        d = Math.Sqrt(Math.Pow(x, 2) + Math.Pow(y, 2));
                        rastojanje.Add(d, v);
                    }
                }
            }

            var r = rastojanje.OrderBy(w => w.Key).ToDictionary(k => k.Key, v => v.Value);

            List<Vozac> result = new List<Vozac>();
            for(int j = 0; j < r.Count; j++)
            {
                if (j == 5)
                    break;
                result.Add(r.ElementAt(j).Value);
            }
            if (result.Count > 0)
                return Ok(result);
            else
                return Ok("Nema slobodnih vozaca!");
        }

        [HttpGet, Route("api/Voznja/dodelivoznju")]
        public IHttpActionResult dodelivoznju([FromUri]int id, [FromUri]string user)
        {
            Voznja voznja = new Voznja();
            voznja.TipAutomobila = Podaci.GetSveVoznje()[id].TipAutomobila;
            voznja.StatusVoznje = STATUS_VOZNJE.Obradjena;
            voznja.Vozac = Podaci.GetVozace()[user];
            Podaci.IzmeniVoznju(id, voznja);

            Vozac v = new Vozac();
            v.Slobodan = false;
            v.Pol = Podaci.GetVozace()[user].Pol;
            v.VoznjeIDs = Podaci.GetVozace()[user].VoznjeIDs;
            v.VoznjeIDs.Add(id);
            Podaci.IzmeniVozaca(user, v);

            Podaci.GetSlobodneVoznje().Remove(id);
            Podaci.GetSlobodneVozace().Remove(user);

            return Ok();
        }

        [HttpGet, Route("api/Voznja/GetSveVoznje")]
        public IHttpActionResult GetSveVoznje()
        {
            List<Voznja> result = new List<Voznja>();
            foreach (Voznja v in Podaci.GetSveVoznje().Values)
            {
                result.Add(v);
            }
            return Ok(result);
        }

        [HttpGet, Route("api/Voznja/GetSlobodneV")]
        public IHttpActionResult GetSlobodneV()
        {
            List<Voznja> result = new List<Voznja>();
            foreach (int id in Podaci.GetSlobodneVoznje())
            {
                result.Add(Podaci.GetSveVoznje()[id]);
            }
            return Ok(result);
        }

        [HttpGet, Route("api/Voznja/VozacSortira")]
        public IHttpActionResult VozacSortira([FromUri]string user)
        {
            Dictionary<double, Voznja> ret = new Dictionary<double, Voznja>();
            double d, x, y;
            foreach (Voznja v in Podaci.GetSveVoznje().Values)
            {
                foreach (int id in Podaci.GetSlobodneVoznje())
                {
                    if (v.ID == id)
                    {
                        x = Math.Abs((Podaci.GetVozace()[user].Lokacija.GeoCoordinate.Longitude) - (v.LokacijaPolazista.GeoCoordinate.Longitude));
                        y = Math.Abs((Podaci.GetVozace()[user].Lokacija.GeoCoordinate.Latitude) - (v.LokacijaPolazista.GeoCoordinate.Latitude));
                        d = Math.Sqrt(Math.Pow(x, 2) + Math.Pow(y, 2));
                        ret.Add(d, v);
                    }
                }
            }

            var r = ret.OrderBy(w => w.Key).ToDictionary(k => k.Key, v => v.Value);
            List<Voznja> sort = new List<Voznja>();
            foreach (Voznja v in r.Values)
            {
                sort.Add(v);
            }
            
            return Ok(sort);
        }

        [HttpPost, Route("api/Voznja/adminptretrazuje")]
        public IHttpActionResult adminptretrazuje(Pretraga p)
        {
            List<Voznja> result = new List<Voznja>();
            List<int> ids = new List<int>();
            if (p.KIme != null)
            {
                foreach(Korisnik k in Podaci.GetKorisnike().Values)
                {
                    if(k.Ime.ToLower() == p.KIme.ToLower())
                    {
                        foreach(int id in k.VoznjeIDs)
                        {
                            ids.Add(id);
                        }
                    }
                }
            }
            else if (p.KPrezime != null)
            {
                foreach (Korisnik k in Podaci.GetKorisnike().Values)
                {
                    if (k.Prezime.ToLower() == p.KPrezime.ToLower())
                    {
                        foreach (int id in k.VoznjeIDs)
                        {
                            ids.Add(id);
                        }
                    }
                }
            }
            else if (p.VIme != null)
            {
                foreach (Vozac k in Podaci.GetVozace().Values)
                {
                    if (k.Ime.ToLower() == p.VIme.ToLower())
                    {
                        foreach (int id in k.VoznjeIDs)
                        {
                            ids.Add(id);
                        }
                    }
                }
            }
            else if (p.VPrezime != null)
            {
                foreach (Vozac k in Podaci.GetVozace().Values)
                {
                    if (k.Prezime.ToLower() == p.VPrezime.ToLower())
                    {
                        foreach (int id in k.VoznjeIDs)
                        {
                            ids.Add(id);
                        }
                    }
                }
            }

            foreach(int id in ids)
            {
                result.Add(Podaci.GetSveVoznje()[id]);
            }

            if (result.Count > 0)
                return Ok(result);
            else
                return Ok("Nema rezultata!");
        }

        [HttpGet, Route("api/Voznja/GetCurrentLocation")]
        public IHttpActionResult GetCurrentLocation([FromUri] int id)
        {
            string result = "";
            Voznja v = Podaci.GetSveVoznje()[id];

            if(v.LokacijaPolazista != null)
            {
                result = v.LokacijaPolazista.Adresa.UlicaIBroj + " " + v.LokacijaPolazista.Adresa.MestoIPostanskiFah;
                return Ok(result);
            }
            else
            {
                return Ok("");
            }
        }

        [HttpGet, Route("api/Voznja/GetCurrentLocationVozac")]
        public IHttpActionResult GetCurrentLocationVozac([FromUri]string user, [FromUri]string uloga)
        {
            string result = "";
            Vozac v = Podaci.GetVozace()[user];

            if (v.Lokacija != null)
            {
                result = v.Lokacija.Adresa.UlicaIBroj + " " + v.Lokacija.Adresa.MestoIPostanskiFah;
                return Ok(result);
            }
            else
            {
                return Ok("");
            }
        }

        [HttpGet, Route("api/Voznja/VozacMenjaLokaciju")]
        public IHttpActionResult VozacMenjaLokaciju([FromUri]AdrILok a)
        {
            if (a.MestoiPostanski != null && a.UlicaiBroj != null && a.xlong != 0 && a.ylatit != 0 && a.KorisnickoIme != null)
            {
                Vozac v = new Vozac();
                v.KorisnickoIme = a.KorisnickoIme;
                v.Pol = Podaci.GetVozace()[a.KorisnickoIme].Pol;
                v.Slobodan = Podaci.GetVozace()[a.KorisnickoIme].Slobodan;
                v.Blokiran = false;
                Lokacija l = new Lokacija();
                l.Adresa = new Adresa();
                l.Adresa.MestoIPostanskiFah = a.MestoiPostanski;
                l.Adresa.UlicaIBroj = a.UlicaiBroj;
                l.GeoCoordinate = new Koordinate();
                l.GeoCoordinate.Latitude = a.ylatit;
                l.GeoCoordinate.Longitude = a.xlong;
                v.Lokacija = l;

                Podaci.IzmeniVozaca(a.KorisnickoIme, v);
                return Ok();
            }
            else
                return Ok("null");
        }
    }
}
