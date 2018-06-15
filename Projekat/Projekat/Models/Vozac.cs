﻿using Projekat.Models.Common;
using System.Collections.Generic;

namespace Projekat.Models
{
    public class Vozac : IVozac
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
        private ILokacija lokacija;
        private IAutomobil automobil;
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
        public ILokacija Lokacija
        {
            get { return lokacija; }
            set { lokacija = value; }
        }
        public IAutomobil Automobil
        {
            get { return automobil; }
            set { automobil = value; }
        }
        #endregion

        public Vozac()
        {
            voznjeIDs = new List<int>();
        }

        public Vozac(ILokacija lokacija, IAutomobil automobil)
        {
            this.Automobil = automobil;
            this.Lokacija = lokacija;
            voznjeIDs = new List<int>();
        }
    }
}