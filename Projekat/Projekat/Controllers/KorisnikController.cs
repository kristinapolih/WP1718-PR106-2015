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
            if(!Podaci.GetKorisnike().ContainsKey(korisnik.KorisnickoIme))
            {
                return Ok("Pogresno korisnicko ime!");
            }

            return Ok(korisnik);
        }

    }
}
