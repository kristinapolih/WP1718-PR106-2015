using Projekat.Models;
using Projekat.Models.Common;
using System.Web.Http;

namespace Projekat.Controllers
{
    public class MusterijaController : ApiController
    {
        [Route("api/Musterija/Registracija")]
        public IHttpActionResult NovaMusterija(Korisnik korisnik)
        {
            if(Podaci.GetKorisnike()[korisnik.KorisnickoIme] != null)
            {
                return Conflict();
            }
            Podaci.GetKorisnike().Add(korisnik.KorisnickoIme, korisnik);
            return Ok();
        }
    }
}