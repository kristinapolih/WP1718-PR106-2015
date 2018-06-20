using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projekat.Models.Common
{
    public class Pretraga
    {
        public string KIme { get; set; }
        public string FilterStatus { get; set; }
        public string OdDatum { get; set; }
        public string DoDatum { get; set; }
        public int OdOcena { get; set; }
        public int DoOcena { get; set; }
        public int OdCena { get; set; }
        public int DoCena { get; set; }

        public Pretraga() { }
    }
}