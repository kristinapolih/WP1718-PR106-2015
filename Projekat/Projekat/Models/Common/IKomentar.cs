using System;

namespace Projekat.Models.Common
{
    public interface IKomentar
    {
        string Opis { get; set; }
        DateTime DatumObjave { get; set; }
        IKorisnik Korisnik { get; set; }
        IVoznja Voznja { get; set; }
        int Ocena { get; set; }//0-5
    }
}
