using Projekat.Models.Common;
using System.Collections.Generic;

namespace Projekat.Models
{
    public class Korisnik : IKorisnik
    {
        #region Fileds
        private string korisnickoIme;
        private string lozinka;
        private string ime;
        private string prezime;
        private POL pol;
        private string jMBG;
        private string telefon;
        private string email;
        private ULOGA uloga;
        private bool blokiran;
        private List<int> voznjeIDs;
        #endregion

        #region Props
        public string KorisnickoIme
        {
            get { return korisnickoIme; }
            set { korisnickoIme = value; }
        }
        public string Lozinka
        {
            get { return lozinka; }
            set { lozinka = value; }
        }
        public string Ime
        {
            get { return ime; }
            set { ime = value; }
        }
        public string Prezime
        {
            get { return prezime; }
            set { prezime = value; }
        }
        public POL Pol
        {
            get { return pol; }
            set { pol = value; }
        }
        public string JMBG
        {
            get { return jMBG; }
            set { jMBG = value; }
        }
        public string Telefon
        {
            get { return telefon; }
            set { telefon = value; }
        }
        public string Email
        {
            get { return email; }
            set { email = value; }
        }
        public ULOGA Uloga
        {
            get { return uloga; }
            set { uloga = value; }
        }
        public bool Blokiran
        {
            get { return blokiran; }
            set { blokiran = value; }
        }
        public List<int> VoznjeIDs
        {
            get { return voznjeIDs; }
            set { voznjeIDs = value; }
        }
        #endregion

        public Korisnik()
        {
            this.Blokiran = false;
            voznjeIDs = new List<int>();
        }
    }
}