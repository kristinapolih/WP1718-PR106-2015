using Projekat.Models;
using Projekat.Models.Common;
using System.Web.Http;

namespace Projekat.Controllers
{
    public class MusterijaController : ApiController
    {
        /*// GET: Korisnik
        public ActionResult Index()
        {
            return View();
        }*/

        public IHttpActionResult NovaMusterija(Musterija musterija)
        {
            if(Podaci.GetKorisnike()[musterija.KorisnickoIme] != null)
            {
                return Conflict();
            }
            Podaci.GetKorisnike().Add(musterija.KorisnickoIme, musterija);
            return Ok();
        }
    }
}