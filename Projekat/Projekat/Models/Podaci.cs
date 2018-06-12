using Projekat.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projekat.Models
{
    public static class Podaci
    {
        private static Dictionary<string, IMusterija> korisnici;

        private static object syncLock = new object();

        public static Dictionary<string, IMusterija> GetKorisnike ()
        {
            if(korisnici == null)
            {
                lock(syncLock)
                {
                    if(korisnici == null)
                    {
                        korisnici = new Dictionary<string, IMusterija>();
                    }
                }
            }
            return korisnici;
        }
    }
}