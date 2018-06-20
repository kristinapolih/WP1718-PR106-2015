using System;

namespace Projekat.Models
{
    public class Komentar
    {
        #region Fields
        private string opis;
        private string datumObjave;
        private string korisnik;
        private int voznja;
        private int ocena;
        #endregion

        #region Props
        public string Opis
        {
            get { return opis; }
            set { opis = value; }
        }
        public string DatumObjave
        {
            get { return datumObjave; }
            set { datumObjave = value; }
        }
        public string Korisnik
        {
            get { return korisnik; }
            set { korisnik = value; }
        }
        public int Voznja
        {
            get { return voznja; }
            set { voznja = value; }
        }
        public int Ocena
        {
            get { return ocena; }
            set { ocena = value; }
        }
        #endregion

        public Komentar() { }
    }
}