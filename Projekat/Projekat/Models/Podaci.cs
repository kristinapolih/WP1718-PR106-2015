using Projekat.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projekat.Models
{
    public static class Podaci
    {
        private static Dictionary<string, IKorisnik> korisnici;

        private static object syncLock = new object();

        public static Dictionary<string, IKorisnik> GetKorisnike ()
        {
            if(korisnici == null)
            {
                lock(syncLock)
                {
                    if(korisnici == null)
                    {
                        korisnici = new Dictionary<string, IKorisnik>();
                    }
                }
            }
            return korisnici;
        }
    }
}