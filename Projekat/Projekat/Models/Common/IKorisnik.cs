using System.Collections.Generic;

namespace Projekat.Models.Common
{
    public interface IKorisnik
    {
        string KorisnickoIme { get; set; }
        string Lozinka { get; set; }
        string Ime { get; set; }
        string Prezime { get; set; }
        POL Pol { get; set; }
        string JMBG { get; set; }
        string Telefon { get; set; }
        string Email { get; set; }
        ULOGA Uloga { get; set; }
        List<int> VoznjeIDs { get; }
    }
}
