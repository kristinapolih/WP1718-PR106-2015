using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projekat.Models
{
    public class AdrILok
    {
        public string KorisnickoIme { get; set; }
        public string GodisteAutomobila { get; set; }
        public string TipAutomobila { get; set; }
        public double xlong { get; set; }
        public double ylatit { get; set; }
        public string UlicaiBroj { get; set; }
        public string MestoiPostanski { get; set; }
        public int IDVoznje { get; set; }
        public double Cena { get; set; }
        public string Status { get; set; }

        public AdrILok()
        {

        }
    }
}