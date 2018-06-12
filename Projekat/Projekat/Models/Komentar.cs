using System;

namespace Projekat.Models.Common
{
    public class Komentar : IKomentar
    {
        #region Fields
        private string opis;
        private DateTime datumObjave;
        private IKorisnik korisnik;
        private IVoznja voznja;
        private int ocena;
        #endregion

        #region Props
        public string Opis
        {
            get { return opis; }
            set { opis = value; }
        }
        public DateTime DatumObjave
        {
            get { return datumObjave; }
            set { datumObjave = value; }
        }
        public IKorisnik Korisnik
        {
            get { return korisnik; }
            set { korisnik = value; }
        }
        public IVoznja Voznja
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

        public Komentar (IKorisnik korisnik, IVoznja voznja)
        {
            this.Voznja = voznja;
            this.Korisnik = korisnik;
        }
    }
}