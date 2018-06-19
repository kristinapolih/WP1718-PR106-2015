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
            return Ok(ret);
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
            return Ok(ret);
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
    }
}
