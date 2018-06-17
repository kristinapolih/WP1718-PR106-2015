using Projekat.Models.Common;
using System.Collections.Generic;
using System.IO;
using System.Windows.Forms;
using System.Xml.Serialization;

namespace Projekat.Models
{
    public static class Podaci
    {
        #region Fileds
        private static Dictionary<string, Korisnik> dispeceri;
        private static Dictionary<string, Korisnik> korisnici;
        private static Dictionary<string, Vozac> vozaci;
        private static List<string> ulogovani;
        private static List<int> slobodneVoznje;
        private static Dictionary<int, Voznja> sveVoznje;
        private static List<string> slobodniVozaci;

        private static object syncLockKorisnici = new object();
        private static object syncLockAdmins = new object();
        private static object syncLockVozaci = new object();
        private static object syncLockUlogovani = new object();
        private static object syncSlobodneVoznje = new object();
        private static object syncSveVoznje = new object();
        private static object syncSlobodniVozaci = new object();

        private static string path = Application.StartupPath + @"\App_Data\";
        public static int cnt;
        #endregion

        #region Singletons
        public static Dictionary<string, Korisnik> GetKorisnike ()
        {
            if(korisnici == null)
            {
                lock(syncLockKorisnici)
                {
                    if(korisnici == null)
                    {
                        korisnici = new Dictionary<string, Korisnik>();
                    }
                }
            }
            return korisnici;
        }

        public static Dictionary<string, Korisnik> GetDispecere()
        {
            if (dispeceri == null)
            {
                lock (syncLockAdmins)
                {
                    if (dispeceri == null)
                    {
                        dispeceri = new Dictionary<string, Korisnik>();
                    }
                }
            }
            return dispeceri;
        }

        public static Dictionary<string, Vozac> GetVozace()
        {
            if (vozaci == null)
            {
                lock (syncLockVozaci)
                {
                    if (vozaci == null)
                    {
                        vozaci = new Dictionary<string, Vozac>();
                    }
                }
            }
            return vozaci;
        }

        public static Dictionary<int, Voznja> GetSveVoznje()
        {
            if (sveVoznje == null)
            {
                lock (syncSveVoznje)
                {
                    if (sveVoznje == null)
                    {
                        sveVoznje = new Dictionary<int, Voznja>();
                    }
                }
            }
            return sveVoznje;
        }

        public static List<string> GetUlogovane()
        {
            if (ulogovani == null)
            {
                lock (syncLockUlogovani)
                {
                    if (ulogovani == null)
                    {
                        ulogovani = new List<string>();
                    }
                }
            }
            return ulogovani;
        }

        public static List<int> GetSlobodneVoznje()
        {
            if (slobodneVoznje == null)
            {
                lock (syncSlobodneVoznje)
                {
                    if (slobodneVoznje == null)
                    {
                        slobodneVoznje = new List<int>();
                    }
                }
            }
            return slobodneVoznje;
        }

        public static List<string> GetSlobodneVozace()
        {
            if (slobodniVozaci == null)
            {
                lock (syncSlobodniVozaci)
                {
                    if (slobodniVozaci == null)
                    {
                        slobodniVozaci = new List<string>();
                    }
                }
            }
            return slobodniVozaci;
        }
        #endregion

        public static void IzmeniKorisnika(string username, Korisnik korisnik)
        {
            Korisnik menjamo = new Korisnik();

            lock (new object())
            {
                GetKorisnike().TryGetValue(username, out menjamo);
                GetKorisnike().Remove(username);
            }

            if (korisnik.Email != null)
                menjamo.Email = korisnik.Email;
            if (korisnik.Ime != null)
                menjamo.Ime = korisnik.Ime;
            if (korisnik.JMBG != null)
                menjamo.JMBG = korisnik.JMBG;
            if (korisnik.KorisnickoIme != null)
                menjamo.KorisnickoIme = korisnik.KorisnickoIme;
            if (korisnik.Lozinka != null)
                menjamo.Lozinka = korisnik.Lozinka;
            if (korisnik.Pol.ToString() != "")
                menjamo.Pol = korisnik.Pol;
            if (korisnik.Prezime != null)
                menjamo.Prezime = korisnik.Prezime;
            if (korisnik.Telefon != null)
                menjamo.Telefon = korisnik.Telefon;
            if (menjamo.VoznjeIDs.Count < korisnik.VoznjeIDs.Count)
                menjamo.VoznjeIDs = korisnik.VoznjeIDs;

            lock (new object())
            {
                DodajKorisnik(menjamo);
            }
        }

        public static void IzmeniVozaca(string username, Vozac vozac)
        {
            Vozac menjamo = new Vozac();

            lock (new object())
            {
                GetVozace().TryGetValue(username, out menjamo);
                GetVozace().Remove(username);
            }

            if (vozac.Email != null)
                menjamo.Email = vozac.Email;
            if (vozac.Ime != null)
                menjamo.Ime = vozac.Ime;
            if (vozac.JMBG != null)
                menjamo.JMBG = vozac.JMBG;
            if (vozac.KorisnickoIme != null)
                menjamo.KorisnickoIme = vozac.KorisnickoIme;
            if (vozac.Lozinka != null)
                menjamo.Lozinka = vozac.Lozinka;
            if (vozac.Pol.ToString() != "")
                menjamo.Pol = vozac.Pol;
            if (vozac.Prezime != null)
                menjamo.Prezime = vozac.Prezime;
            if (vozac.Telefon != null)
                menjamo.Telefon = vozac.Telefon;
            if (menjamo.VoznjeIDs.Count < vozac.VoznjeIDs.Count)
                menjamo.VoznjeIDs = vozac.VoznjeIDs;
            if (vozac.Lokacija != null)
                menjamo.Lokacija = vozac.Lokacija;
            if (vozac.Automobil != null)
                menjamo.Automobil = vozac.Automobil;

            lock (new object())
            {
                DodajVozac(menjamo);
            }
        }

        public static void IzmeniDispecera(string username, Korisnik dispecer)
        {
            Korisnik menjamo = new Korisnik();

            lock (new object())
            {
                GetDispecere().TryGetValue(username, out menjamo);
                GetDispecere().Remove(username);
            }

            if (dispecer.Email != null)
                menjamo.Email = dispecer.Email;
            if (dispecer.Ime != null)
                menjamo.Ime = dispecer.Ime;
            if (dispecer.JMBG != null)
                menjamo.JMBG = dispecer.JMBG;
            if (dispecer.KorisnickoIme != null)
                menjamo.KorisnickoIme = dispecer.KorisnickoIme;
            if (dispecer.Lozinka != null)
                menjamo.Lozinka = dispecer.Lozinka;
            if (dispecer.Pol.ToString() != "")
                menjamo.Pol = dispecer.Pol;
            if (dispecer.Prezime != null)
                menjamo.Prezime = dispecer.Prezime;
            if (dispecer.Telefon != null)
                menjamo.Telefon = dispecer.Telefon;
            if (menjamo.VoznjeIDs.Count < dispecer.VoznjeIDs.Count)
                menjamo.VoznjeIDs = dispecer.VoznjeIDs;

            lock (new object())
            {
                DodajDispecer(menjamo);
            }
        }


        public static List<Korisnik> CitajKorisnik()
        {
            XmlSerializer serializer = new XmlSerializer(typeof(List<Korisnik>));
            lock (new object())
            {
                using (TextReader reader = new StreamReader(path + @"Musterije.xml"))
                {
                    return (List<Korisnik>)(serializer.Deserialize(reader));
                }
            }
        }

        public static List<Korisnik> CitajDispecer()
        {
            XmlSerializer serializer = new XmlSerializer(typeof(List<Korisnik>));
            lock (new object())
            {
                using (TextReader reader = new StreamReader(path + @"Dispeceri.xml"))
                {
                    return (List<Korisnik>)(serializer.Deserialize(reader));
                }
            }
        }

        public static List<Vozac> CitajVozac()
        {
            XmlSerializer serializer = new XmlSerializer(typeof(List<Vozac>));
            lock (new object())
            {
                using (TextReader reader = new StreamReader(path + @"Vozaci.xml"))
                {
                    return (List<Vozac>)(serializer.Deserialize(reader));
                }
            }
        }


        public static void DodajKorisnik(Korisnik korisnik)
        {
            GetKorisnike().Add(korisnik.KorisnickoIme, korisnik);

            List<Korisnik> korisnici = new List<Korisnik>();//CitajKorisnik();
            korisnici.Add((Korisnik)korisnik);
            
            XmlSerializer serializer = new XmlSerializer(typeof(List<Korisnik>));
            lock (new object())
            {
                using (TextWriter writer = new StreamWriter(path + @"Musterije.xml"))
                {
                    serializer.Serialize(writer, korisnici);
                }
            }
        }

        public static void DodajDispecer(Korisnik dispecer)
        {
            GetDispecere().Add(dispecer.KorisnickoIme, dispecer);

            List<Korisnik> dispeceri = CitajDispecer();
            dispeceri.Add((Korisnik)dispecer);
            
            XmlSerializer serializer = new XmlSerializer(typeof(List<Korisnik>));
            lock (new object())
            {
                using (TextWriter writer = new StreamWriter(path + @"Dispeceri.xml"))
                {
                    serializer.Serialize(writer, dispeceri);
                }
            }
        }

        public static void DodajVozac(Vozac vozac)
        {
            GetVozace().Add(vozac.KorisnickoIme, vozac);

            List<Vozac> vozaci = new List<Vozac>();//CitajVozac();
            vozaci.Add((Vozac)vozac);
            
            XmlSerializer serializer = new XmlSerializer(typeof(List<Vozac>));
            lock (new object())
            {
                using (TextWriter writer = new StreamWriter(path + @"Vozaci.xml"))
                {
                    serializer.Serialize(writer, vozaci);
                }
            }
        }


        public static void CitajSve()
        {
            cnt = 0;
            lock (new object())
            {
                var k = CitajKorisnik();
                foreach(Korisnik kor in k)
                {
                    GetKorisnike().Add(kor.KorisnickoIme, kor);
                }
                
                var d = CitajDispecer();
                foreach (Korisnik kor in d)
                {
                    GetDispecere().Add(kor.KorisnickoIme, kor);
                }
                
                var v = CitajVozac();
                foreach (Vozac voz in v)
                {
                    GetVozace().Add(voz.KorisnickoIme, voz);
                }
            }
        }
    }
}