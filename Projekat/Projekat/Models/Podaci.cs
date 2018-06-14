using Projekat.Models.Common;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Windows.Forms;

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

        public static void LoadAdmins()
        {
            string path = Application.StartupPath;
            path += @"\App_Data\";
            StreamReader streamReader = File.OpenText(path + "Dispeceri.txt");
            string admins = streamReader.ReadToEnd();
            streamReader.Close();
            streamReader.Dispose();
            string[] values = admins.Split(new char[] { ';' });
            IDispecer dispecer = new Dispecer();
            for(int i = 0; i < values.Length - 1; i++)
            {
                if(i % 9 == 0 && i != 0)
                {
                    GetKorisnike().Add(dispecer.KorisnickoIme, dispecer);
                    dispecer = new Dispecer();
                }
                switch(i % 9)
                {
                    case 0:
                        dispecer.KorisnickoIme = values[i];
                        break;
                    case 1:
                        dispecer.Lozinka = values[i];
                        break;
                    case 2:
                        dispecer.Ime = values[i];
                        break;
                    case 3:
                        dispecer.Prezime = values[i];
                        break;
                    case 4:
                        if(values[i] == POL.M.ToString())
                            dispecer.Pol = POL.M;
                        else
                            dispecer.Pol = POL.Z;
                        break;
                    case 5:
                        dispecer.JMBG = values[i];
                        break;
                    case 6:
                        dispecer.Telefon = values[i];
                        break;
                    case 7:
                        dispecer.Email = values[i];
                        break;
                    case 8:
                        dispecer.Uloga = ULOGA.Admin;
                        break;
                }
            }
        }
    }
}