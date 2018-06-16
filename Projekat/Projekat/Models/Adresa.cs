using Projekat.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projekat.Models
{
    public class Adresa 
    {
        #region Fields
        private string ulicaIBroj;
        private string mestoIPostanskiFah;
        #endregion

        #region Props
        public string UlicaIBroj
        {
            get { return ulicaIBroj; }
            set { ulicaIBroj = value; }
        }
        public string MestoIPostanskiFah
        {
            get { return mestoIPostanskiFah; }
            set { mestoIPostanskiFah = value; }
        }
        #endregion

        public Adresa() { }
    }
}