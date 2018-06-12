using System;

namespace Projekat.Models.Common
{
    public interface IVoznja
    {
        DateTime DatumIVremePorudzbine { get; set; }
        ILokacija LokacijaPolazista { get; set; }
        TIP_AUTOMOBILA TipAutomobila { get; set; }
        IMusterija Musterija { get; set; }
        ILokacija LokacijaOdredista { get; set; }
        IDispecer Dispecer { get; set; }
        IVozac Vozac { get; set; }
        double Iznos { get; set; }
        IKomentar Komentar { get; set; }
        STATUS_VOZNJE StatusVoznje { get; set; }
    }
}
