using Projekat.Models;
using Projekat.Models.Common;
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
                                Podaci.GetUlogovane().Add(v.KorisnickoIme);
                                return Ok(v);
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
    }
}
