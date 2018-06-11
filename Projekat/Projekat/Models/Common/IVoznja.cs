
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

    }
}
