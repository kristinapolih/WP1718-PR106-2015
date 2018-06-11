namespace Projekat.Models.Common
{
    public interface IAdresa
    {
        string Ulica { get; set; }
        int Broj { get; set; }
        string Mesto { get; set; }
        int PostanskiFah { get; set; }
    }
}
