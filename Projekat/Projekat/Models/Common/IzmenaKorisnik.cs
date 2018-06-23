using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projekat.Models.Common
{
    public class IzmenaKorisnik
    {
        #region Fileds
        private string staroKorisnickoIme;
        private string korisnickoIme;
        private string lozinka;
        private string ime;
        private string prezime;
        private POL pol;
        private string jMBG;
        private string telefon;
        private string email;
        private ULOGA uloga;
        #endregion

        #region Props
        public string StaroKorisnickoIme
        {
            get { return staroKorisnickoIme; }
            set { staroKorisnickoIme = value; }
        }
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
        #endregion

        public IzmenaKorisnik() { }
    }
}