using Projekat.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projekat.Models
{
    public class Adresa : IAdresa
    {
        #region Fields
        private string ulica;
        private int broj;
        private string mesto;
        private int postanskiFah;
        #endregion

        #region Props
        public string Ulica
        {
            get { return ulica; }
            set { ulica = value; }
        }
        public int Broj
        {
            get { return broj; }
            set { broj = value; }
        }
        public string Mesto
        {
            get { return mesto; }
            set { mesto = value; }
        }
        public int PostanskiFah
        {
            get { return postanskiFah; }
            set { postanskiFah = value; }
        }
        #endregion

        public Adresa() { }
    }
}