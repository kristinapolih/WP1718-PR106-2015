namespace Projekat.Models.Common
{
    public interface IVozac : IKorisnik
    {
        ILokacija Lokacija { get; set; }
        IAutomobil Automobil { get; set; }
    }
}