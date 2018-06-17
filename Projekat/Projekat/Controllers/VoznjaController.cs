using Projekat.Models;
using Projekat.Models.Common;
using System;
using System.Web.Http;

namespace Projekat.Controllers
{
    public class VoznjaController : ApiController
    {
        [HttpPost, Route("api/Voznja/poruciVoznju")]
        public IHttpActionResult poruciVoznju(AdrILok adresaILokacija)
        {
            Voznja v = new Voznja();
            if (Podaci.GetKorisnike().ContainsKey(adresaILokacija.KorisnickoIme))
            {
                v.Musterija = Podaci.GetKorisnike()[adresaILokacija.KorisnickoIme];
            }
            else if(Podaci.GetDispecere().ContainsKey(adresaILokacija.KorisnickoIme))
            {
                v.Dispecer = Podaci.GetDispecere()[adresaILokacija.KorisnickoIme];
                v.Vozac = Podaci.GetVozace()[(Podaci.GetSlobodneVozace()[0])];
                Podaci.GetSlobodneVozace().Remove(v.Vozac.KorisnickoIme);
            }
            v.DatumIVremePorudzbine = DateTime.Now;
            v.ID = ++Podaci.cnt;
            if (adresaILokacija.TipAutomobila == TIP_AUTOMOBILA.Kombi.ToString())
                v.TipAutomobila = TIP_AUTOMOBILA.Kombi;
            else
                v.TipAutomobila = TIP_AUTOMOBILA.Putnicki;
            v.LokacijaOdredista = new Lokacija();
            v.LokacijaOdredista.Adresa = new Adresa();
            v.LokacijaOdredista.Adresa.UlicaIBroj = adresaILokacija.UlicaiBroj;
            v.LokacijaOdredista.Adresa.MestoIPostanskiFah = adresaILokacija.MestoiPostanski;
            v.LokacijaOdredista.GeoCoordinate = new System.Device.Location.GeoCoordinate();
            v.LokacijaOdredista.GeoCoordinate.Longitude = adresaILokacija.xlong;
            v.LokacijaOdredista.GeoCoordinate.Latitude = adresaILokacija.ylatit;
            v.StatusVoznje = STATUS_VOZNJE.Kreirana;
            Podaci.GetSlobodneVoznje().Add(v.ID);
            Podaci.GetSveVoznje().Add(v.ID, v);

            return Ok();
        }
    }
}
