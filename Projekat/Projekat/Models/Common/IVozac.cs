namespace Projekat.Models.Common
{
    public interface IVozac : IKorisnik
    {
        Lokacija Lokacija { get; set; }
        Automobil Automobil { get; set; }
    }
}