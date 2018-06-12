using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projekat.Models.Common
{
    public class LogIn
    {
        #region Fileds
        private string korisnickoIme;
        private string lozinka;
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
        #endregion

        public LogIn() { }

        public LogIn(string korisnickoIme, string lozinka)
        {
            this.KorisnickoIme = korisnickoIme;
            this.Lozinka = lozinka;
        }
    }
}