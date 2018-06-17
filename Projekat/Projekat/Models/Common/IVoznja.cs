using System;

namespace Projekat.Models.Common
{
    public interface IVoznja
    {
        DateTime DatumIVremePorudzbine { get; set; }
        Lokacija LokacijaPolazista { get; set; }
        TIP_AUTOMOBILA TipAutomobila { get; set; }
        Korisnik Musterija { get; set; }
        Lokacija LokacijaOdredista { get; set; }
        Korisnik Dispecer { get; set; }
        Vozac Vozac { get; set; }
        double Iznos { get; set; }
        Komentar Komentar { get; set; }
        STATUS_VOZNJE StatusVoznje { get; set; }
    }
}
