namespace Projekat.Models.Common
{
    public interface IAutomobil
    {
        IVozac Vozac { get; set; }
        string GodisteAutomobila { get; set; }
        string BrojRegistarskeOznake { get; set; }
        string BrojTaksiVozila { get; set; }
        TIP_AUTOMOBILA TipAutomobila { get; set; }

        string GetNewNumberOfTaxi();
    }
}
