using Projekat.Models;
using Projekat.Models.Common;
using System.Web.Http;

namespace Projekat.Controllers
{
    public class KorisnikController : ApiController
    {
        [Route("api/Korisnik/Login")]
        public IHttpActionResult Login(LogIn korisnik)
        {
            IKorisnik k = new Korisnik();
            if(!Podaci.GetKorisnike().ContainsKey(korisnik.KorisnickoIme))
            {
                return Ok("Ne postoji korisnik sa ovim Korisnickim imenom!");
            }
            else if (Podaci.GetKorisnike().TryGetValue(korisnik.KorisnickoIme, out k))
            {
                if (k.Lozinka == korisnik.Lozinka)
                {
                    if (k.Uloga == ULOGA.Admin)
                    {
                        return Ok("Admin");
                    }
                    else
                    {
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
        [Route("api/Korisnik/Admin")]
        public IHttpActionResult Admin(string username)
        {
            IKorisnik k = new Korisnik();
            if(Podaci.GetKorisnike().TryGetValue(username, out k))
            {
                if(k.Uloga == ULOGA.Admin)
                    return Ok(ULOGA.Admin.ToString());
            }
            return Ok("NO");
        }
    }
}
