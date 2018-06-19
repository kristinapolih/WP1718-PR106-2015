using Projekat.Models.Common;
using System.Collections.Generic;

namespace Projekat.Models
{
    public class Vozac 
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
        private List<int> voznjeIDs;
        private Lokacija lokacija;
        private Automobil automobil;
        private bool blokiran;
        private bool sloboddan;
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
        public List<int> VoznjeIDs
        {
            get { return voznjeIDs; }
            set { voznjeIDs = value; }
        }
        public Lokacija Lokacija
        {
            get { return lokacija; }
            set { lokacija = value; }
        }
        public Automobil Automobil
        {
            get { return automobil; }
            set { automobil = value; }
        }
        public bool Blokiran
        {
            get { return blokiran; }
            set { blokiran = value; }
        }
        public bool Slobodan
        {
            get { return sloboddan; }
            set { sloboddan = value; }
        }
        #endregion

        public Vozac()
        {
            blokiran = false;
            sloboddan = true;
            voznjeIDs = new List<int>();
        }
    }
}