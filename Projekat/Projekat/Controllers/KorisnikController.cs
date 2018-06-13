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
        
        public string get(string username)
        {
            IKorisnik k = new Korisnik();
            if(Podaci.GetKorisnike().TryGetValue(username, out k))
            {
                return (k.Uloga.ToString());
            }
            return "";
        }
    }
}
