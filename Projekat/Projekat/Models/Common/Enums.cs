namespace Projekat.Models.Common
{
    public enum POL
    {
        M,
        Z
    }

    public enum ULOGA
    {
        Admin,
        Vozac,
        Musterija
    }

    public enum TIP_AUTOMOBILA
    {
        Putnicki,
        Kombi
    }

    public enum STATUS_VOZNJE
    {
        Kreirana,
        Formirana,
        Obradjena,
        Prihvacena,
        Otkazana,
        Neuspesna,
        Uspesna
    }

    public enum PRETRAGA
    {
        Status,
        OdDatum,
        DoDatum,
        OdOcena,
        DoOcena,
        OdCena,
        DoCena
    }

    public static class StatusHelper
    {
        public static STATUS_VOZNJE GetStatus(int s)
        {
            if (s == 0)
                return STATUS_VOZNJE.Kreirana;
            else if (s == 1)
                return STATUS_VOZNJE.Formirana;
            else if (s == 2)
                return STATUS_VOZNJE.Obradjena;
            else if (s == 3)
                return STATUS_VOZNJE.Prihvacena;
            else if (s == 4)
                return STATUS_VOZNJE.Otkazana;
            else if (s == 5)
                return STATUS_VOZNJE.Neuspesna;
            else if (s == 6)
                return STATUS_VOZNJE.Uspesna;
            else
                return STATUS_VOZNJE.Kreirana;
        }
    }
}
