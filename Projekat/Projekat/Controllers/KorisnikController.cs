using Projekat.Models;
using Projekat.Models.Common;
using System.Collections.Generic;
using System.Web.Http;

namespace Projekat.Controllers
{
    public class KorisnikController : ApiController
    {
        [HttpGet, Route("api/Korisnik/Login")]
        public IHttpActionResult Login([FromUri]LogIn korisnik)
        {
            if (korisnik.KorisnickoIme != null && korisnik.Lozinka != null)
            {
                Korisnik k = new Korisnik();
                Vozac v = new Vozac();
                if (!Podaci.GetUlogovane().Contains(korisnik.KorisnickoIme))
                {
                    if (!Podaci.GetKorisnike().ContainsKey(korisnik.KorisnickoIme))
                    {
                        if (!Podaci.GetDispecere().ContainsKey(korisnik.KorisnickoIme))
                        {
                            if (!Podaci.GetVozace().ContainsKey(korisnik.KorisnickoIme))
                            {
                                return Ok("Ne postoji korisnik sa ovim Korisnickim imenom!");
                            }
                            else if (Podaci.GetVozace().TryGetValue(korisnik.KorisnickoIme, out v))
                            {
                                if (v.Lozinka == korisnik.Lozinka)
                                {
                                    if (v.Blokiran)
                                    {
                                        return Ok("Blokirani ste!");
                                    }
                                    else
                                    {
                                        Podaci.GetUlogovane().Add(v.KorisnickoIme);
                                        return Ok(v);
                                    }
                                }
                                else
                                {
                                    return Ok("Pogresna Lozinka!");
                                }
                            }
                            else
                            {
                                return Ok("Pogresna lozinka ili korisnicko ime!");
                            }
                        }
                        else if (Podaci.GetDispecere().TryGetValue(korisnik.KorisnickoIme, out k))
                        {
                            if (k.Lozinka == korisnik.Lozinka)
                            {
                                Podaci.GetUlogovane().Add(k.KorisnickoIme);
                                return Ok(k);
                            }
                            else
                            {
                                return Ok("Pogresna Lozinka!");
                            }
                        }
                        else
                        {
                            return Ok("Pogresna lozinka ili korisnicko ime!");
                        }
                    }
                    else if (Podaci.GetKorisnike().TryGetValue(korisnik.KorisnickoIme, out k))
                    {
                        if (k.Lozinka == korisnik.Lozinka)
                        {
                            if (k.Blokiran)
                            {
                                return Ok("Blokirani ste!");
                            }
                            else
                            {
                                Podaci.GetUlogovane().Add(k.KorisnickoIme);
                                return Ok(k);
                            }
                        }
                        else
                        {
                            return Ok("Pogresna Lozinka!");
                        }
                    }
                    else
                    {
                        return Ok("Pogresna lozinka ili korisnicko ime!");
                    }
                }
                else
                {
                    return Ok("Vec ste ulogovani!");
                }
            }
            else
            {
                return Ok("null");
            }
        }
        
        [HttpDelete, Route("api/Korisnik/LogOut")]
        public IHttpActionResult LogOut(LogIn korisnik)
        {
            if(Podaci.GetUlogovane().Contains(korisnik.KorisnickoIme))
            {
                Podaci.GetUlogovane().Remove(korisnik.KorisnickoIme);
            }
            return Ok();
        }



        [HttpGet, Route("api/Korisnik/GetBlokiraneKorisnike")]
        public IHttpActionResult GetBlokiraneKorisnike()
        {
            if (Podaci.GetBlokiraneKorisnike().Count > 0)
            {
                List<Korisnik> ret = new List<Korisnik>();
                foreach (string s in Podaci.GetBlokiraneKorisnike())
                {
                    ret.Add(Podaci.GetKorisnike()[s]);
                }
                return Ok(ret);
            }
            else
            {
                return Ok("Ne postoje blokirani korisnici!");
            }
        }
        
        [HttpGet, Route("api/Korisnik/GetBlokiraneVozace")]
        public IHttpActionResult GetBlokiraneVozace()
        {
            if (Podaci.GetBlokiraneVozace().Count > 0)
            {
                List<Vozac> ret = new List<Vozac>();
                foreach (string s in Podaci.GetBlokiraneVozace())
                {
                    ret.Add(Podaci.GetVozace()[s]);
                }
                return Ok(ret);
            }
            else
            {
                return Ok("Ne postoje blokirani korisnici!");
            }
        }



        [HttpGet, Route("api/Korisnik/GetAllKorisnike")]
        public IHttpActionResult GetAllKorisnike()
        {
            List<Korisnik> ret = new List<Korisnik>();
            foreach (Korisnik k in Podaci.GetKorisnike().Values)
            {
                if(!Podaci.GetBlokiraneKorisnike().Contains(k.KorisnickoIme))
                    ret.Add(k);
            }
            if (ret.Count > 0)
                return Ok(ret);
            else
                return Ok("");
        }
        
        [HttpGet, Route("api/Korisnik/GetAllVozace")]
        public IHttpActionResult GetAllVozace()
        {
            List<Vozac> ret = new List<Vozac>();
            foreach (Vozac k in Podaci.GetVozace().Values)
            {
                if(!Podaci.GetBlokiraneVozace().Contains(k.KorisnickoIme))
                    ret.Add(k);
            }
            if (ret.Count > 0)
                return Ok(ret);
            else
                return Ok("");
        }
        


        [HttpGet, Route("api/Korisnik/Blokiraj")]
        public IHttpActionResult Blokiraj([FromUri]string korisckoImeBlokiraj)
        {
            if (Podaci.GetVozace().ContainsKey(korisckoImeBlokiraj))
            {
                Vozac v = new Vozac();
                v.KorisnickoIme = korisckoImeBlokiraj;
                v.Blokiran = true;
                v.Slobodan = false;
                v.Pol = Podaci.GetVozace()[korisckoImeBlokiraj].Pol;
                Podaci.IzmeniVozaca(korisckoImeBlokiraj, v);
                Podaci.GetBlokiraneVozace().Add(korisckoImeBlokiraj);
                return Ok(korisckoImeBlokiraj);
            }
            else
            {
                if (Podaci.GetKorisnike().ContainsKey(korisckoImeBlokiraj))
                {
                    Korisnik k = new Korisnik();
                    k.KorisnickoIme = korisckoImeBlokiraj;
                    k.Blokiran = true;
                    k.Pol = Podaci.GetKorisnike()[korisckoImeBlokiraj].Pol;
                    Podaci.IzmeniKorisnika(korisckoImeBlokiraj, k);
                    Podaci.GetBlokiraneKorisnike().Add(korisckoImeBlokiraj);
                    return Ok(korisckoImeBlokiraj);
                }
                else
                {
                    return Ok("Ne postoji korisnik sa trazenim imenom!");
                }
            }
        }
        
        [HttpGet, Route("api/Korisnik/Odblokiraj")]
        public IHttpActionResult Odblokiraj([FromUri]string korisckoImeOdblokiraj)
        {
            if (Podaci.GetVozace().ContainsKey(korisckoImeOdblokiraj))
            {
                Vozac v = new Vozac();
                v.KorisnickoIme = korisckoImeOdblokiraj;
                v.Blokiran = false;
                v.Slobodan = true;
                v.Pol = Podaci.GetVozace()[korisckoImeOdblokiraj].Pol;
                Podaci.IzmeniVozaca(korisckoImeOdblokiraj, v);
                Podaci.GetBlokiraneVozace().Remove(korisckoImeOdblokiraj);
                return Ok(korisckoImeOdblokiraj);
            }
            else
            {
                if (Podaci.GetKorisnike().ContainsKey(korisckoImeOdblokiraj))
                {
                    Korisnik k = new Korisnik();
                    k.KorisnickoIme = korisckoImeOdblokiraj;
                    k.Blokiran = false;
                    k.Pol = Podaci.GetKorisnike()[korisckoImeOdblokiraj].Pol;
                    Podaci.IzmeniKorisnika(korisckoImeOdblokiraj, k);
                    Podaci.GetBlokiraneKorisnike().Remove(korisckoImeOdblokiraj);
                    return Ok(korisckoImeOdblokiraj);
                }
                else
                {
                    return Ok("Ne postoji korisnik sa trazenim imenom!");
                }
            }
        }



        [HttpGet, Route("api/Korisnik/GetImenaKorisnika")]
        public IHttpActionResult GetImenaKorisnika()
        {
            List<string> result = new List<string>();

            foreach(Korisnik k in Podaci.GetKorisnike().Values)
            {
                result.Add(k.Ime);
            }

            return Ok(result);
        }

        [HttpGet, Route("api/Korisnik/GetPrezimenaKorisnika")]
        public IHttpActionResult GetPrezimenaKorisnika()
        {
            List<string> result = new List<string>();

            foreach (Korisnik k in Podaci.GetKorisnike().Values)
            {
                result.Add(k.Prezime);
            }

            return Ok(result);
        }

        [HttpGet, Route("api/Korisnik/GetImenaVozaca")]
        public IHttpActionResult GetImenaVozaca()
        {
            List<string> result = new List<string>();

            foreach (Vozac v in Podaci.GetVozace().Values)
            {
                result.Add(v.Ime);
            }

            return Ok(result);
        }

        [HttpGet, Route("api/Korisnik/GetPrezimenaVozaca")]
        public IHttpActionResult GetPrezimenaVozaca()
        {
            List<string> result = new List<string>();

            foreach (Vozac v in Podaci.GetVozace().Values)
            {
                result.Add(v.Prezime);
            }

            return Ok(result);
        }



        [HttpGet, Route("api/Korisnik/GetKorisnika")]
        public IHttpActionResult GetKorisnika([FromUri]string user, [FromUri]string uloga)
        {
            Korisnik result = null;
            Vozac r = null;
            if(uloga == "2")
            {
                result = Podaci.GetKorisnike()[user];
            }
            else if (uloga == "1")
            {
                r = Podaci.GetVozace()[user];
            }
            else if (uloga == "0")
            {
                result = Podaci.GetDispecere()[user];
            }

            if (result == null)
                return Ok(r);
            else
                return Ok(result);
        }

        [HttpPost, Route("api/Korisnik/IzmeniKorisnika")]
        public IHttpActionResult IzmeniKorisnika(IzmenaKorisnik izmena)
        {
            if (izmena.Email != null && izmena.Ime != null && izmena.JMBG != null && izmena.KorisnickoIme != null &&
                izmena.Lozinka != null && izmena.Prezime != null && izmena.StaroKorisnickoIme != null &&
                izmena.Telefon != null && izmena.Uloga.ToString() != null && izmena.Pol.ToString() != null)
            {
                Vozac v = new Vozac();
                Korisnik k = new Korisnik();
                if (izmena.KorisnickoIme != izmena.StaroKorisnickoIme)
                {
                    if (izmena.Uloga == ULOGA.Vozac && !Podaci.GetVozace().ContainsKey(izmena.KorisnickoIme))
                    {
                        v.Blokiran = false;
                        v.Email = izmena.Email;
                        v.Ime = izmena.Ime;
                        v.JMBG = izmena.JMBG;
                        v.KorisnickoIme = izmena.KorisnickoIme;
                        v.Lozinka = izmena.Lozinka;
                        v.Pol = izmena.Pol;
                        v.Prezime = izmena.Prezime;
                        v.Telefon = izmena.Telefon;
                        v.Slobodan = Podaci.GetVozace()[izmena.StaroKorisnickoIme].Slobodan;
                        v.Uloga = ULOGA.Vozac;
                        v.VoznjeIDs = Podaci.GetVozace()[izmena.StaroKorisnickoIme].VoznjeIDs;
                        Podaci.IzmeniVozaca(izmena.StaroKorisnickoIme, v);
                    }
                    else if (izmena.Uloga == ULOGA.Admin && !Podaci.GetDispecere().ContainsKey(izmena.KorisnickoIme))
                    {
                        k.Email = izmena.Email;
                        k.Ime = izmena.Ime;
                        k.JMBG = izmena.JMBG;
                        k.KorisnickoIme = izmena.KorisnickoIme;
                        k.Lozinka = izmena.Lozinka;
                        k.Pol = izmena.Pol;
                        k.Prezime = izmena.Prezime;
                        k.Telefon = izmena.Telefon;
                        k.Uloga = ULOGA.Admin;
                        k.VoznjeIDs = Podaci.GetDispecere()[izmena.StaroKorisnickoIme].VoznjeIDs;
                        Podaci.IzmeniDispecera(izmena.StaroKorisnickoIme, k);
                    }
                    else if (izmena.Uloga == ULOGA.Musterija && !Podaci.GetKorisnike().ContainsKey(izmena.KorisnickoIme))
                    {
                        k.Email = izmena.Email;
                        k.Ime = izmena.Ime;
                        k.JMBG = izmena.JMBG;
                        k.KorisnickoIme = izmena.KorisnickoIme;
                        k.Lozinka = izmena.Lozinka;
                        k.Pol = izmena.Pol;
                        k.Prezime = izmena.Prezime;
                        k.Telefon = izmena.Telefon;
                        k.Uloga = ULOGA.Musterija;
                        k.VoznjeIDs = Podaci.GetKorisnike()[izmena.StaroKorisnickoIme].VoznjeIDs;
                        Podaci.IzmeniKorisnika(izmena.StaroKorisnickoIme, k);
                    }
                    else
                        return Ok("Korisnicko ime vec postoji!");

                }
                else
                {
                    if (izmena.Uloga == ULOGA.Vozac)
                    {
                        v.Blokiran = false;
                        v.Email = izmena.Email;
                        v.Ime = izmena.Ime;
                        v.JMBG = izmena.JMBG;
                        v.KorisnickoIme = izmena.KorisnickoIme;
                        v.Lozinka = izmena.Lozinka;
                        v.Pol = izmena.Pol;
                        v.Prezime = izmena.Prezime;
                        v.Telefon = izmena.Telefon;
                        v.Slobodan = Podaci.GetVozace()[izmena.StaroKorisnickoIme].Slobodan;
                        v.Uloga = ULOGA.Vozac;
                        v.VoznjeIDs = Podaci.GetVozace()[izmena.StaroKorisnickoIme].VoznjeIDs;
                        Podaci.IzmeniVozaca(izmena.StaroKorisnickoIme, v);
                    }
                    else if (izmena.Uloga == ULOGA.Admin)
                    {
                        k.Email = izmena.Email;
                        k.Ime = izmena.Ime;
                        k.JMBG = izmena.JMBG;
                        k.KorisnickoIme = izmena.KorisnickoIme;
                        k.Lozinka = izmena.Lozinka;
                        k.Pol = izmena.Pol;
                        k.Prezime = izmena.Prezime;
                        k.Telefon = izmena.Telefon;
                        k.Uloga = ULOGA.Admin;
                        k.VoznjeIDs = Podaci.GetDispecere()[izmena.StaroKorisnickoIme].VoznjeIDs;
                        Podaci.IzmeniDispecera(izmena.StaroKorisnickoIme, k);
                    }
                    else if (izmena.Uloga == ULOGA.Musterija)
                    {
                        k.Email = izmena.Email;
                        k.Ime = izmena.Ime;
                        k.JMBG = izmena.JMBG;
                        k.KorisnickoIme = izmena.KorisnickoIme;
                        k.Lozinka = izmena.Lozinka;
                        k.Pol = izmena.Pol;
                        k.Prezime = izmena.Prezime;
                        k.Telefon = izmena.Telefon;
                        k.Uloga = ULOGA.Musterija;
                        k.VoznjeIDs = Podaci.GetKorisnike()[izmena.StaroKorisnickoIme].VoznjeIDs;
                        Podaci.IzmeniKorisnika(izmena.StaroKorisnickoIme, k);
                    }
                }
                return Ok();
            }
            else
                return Ok("null");
        }

        [HttpGet, Route("api/Korisnik/GetAutomobil")]
        public IHttpActionResult GetAutomobil([FromUri]string user, [FromUri]string uloga)
        {
            Automobil a = null;
            a = Podaci.GetVozace()[user].Automobil;
            return Ok(a);
        }
    }
}
