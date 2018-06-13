using Projekat.Models;
using Projekat.Models.Common;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Script.Serialization;

namespace Projekat.Controllers
{
    public class MusterijaController : ApiController
    {
        [HttpPost, Route("api/Musterija/Registracija")]
        public IHttpActionResult NovaMusterija(Korisnik korisnik)
        {
            if(Podaci.GetKorisnike().ContainsKey(korisnik.KorisnickoIme))
            {
                return Ok("Korisnicko ime vec postoji");
            }
            Podaci.GetKorisnike().Add(korisnik.KorisnickoIme, korisnik);
            return Ok();
        }
    }
}