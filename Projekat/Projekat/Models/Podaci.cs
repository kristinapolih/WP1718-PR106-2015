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
        private static List<string> blokiraniKorisnici;
        private static List<string> blokiraniVozaci;

        private static object syncLockKorisnici = new object();
        private static object syncLockAdmins = new object();
        private static object syncLockVozaci = new object();
        private static object syncLockUlogovani = new object();
        private static object syncSlobodneVoznje = new object();
        private static object syncSveVoznje = new object();
        private static object syncSlobodniVozaci = new object();
        private static object syncBlokiraniKorisnici = new object();
        private static object syncBlokiraniVozaci= new object();

        private static string path = Application.StartupPath + @"\App_Data\";
        public static int cnt;
        public static string format;
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

        public static List<string> GetBlokiraneKorisnike()
        {
            if (blokiraniKorisnici == null)
            {
                lock (syncBlokiraniKorisnici)
                {
                    if (blokiraniKorisnici == null)
                    {
                        blokiraniKorisnici = new List<string>();
                    }
                }
            }
            return blokiraniKorisnici;
        }

        public static List<string> GetBlokiraneVozace()
        {
            if (blokiraniVozaci == null)
            {
                lock (syncBlokiraniVozaci)
                {
                    if (blokiraniVozaci == null)
                    {
                        blokiraniVozaci = new List<string>();
                    }
                }
            }
            return blokiraniVozaci;
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
            if (korisnik.Pol != menjamo.Pol)
                menjamo.Pol = korisnik.Pol;
            if (korisnik.Prezime != null)
                menjamo.Prezime = korisnik.Prezime;
            if (korisnik.Telefon != null)
                menjamo.Telefon = korisnik.Telefon;
            if (menjamo.VoznjeIDs.Count < korisnik.VoznjeIDs.Count)
                menjamo.VoznjeIDs = korisnik.VoznjeIDs;
            if (korisnik.Blokiran != menjamo.Blokiran)
                menjamo.Blokiran = korisnik.Blokiran;

            Voznja v = null;
            lock (new object())
            {
                foreach (int id in menjamo.VoznjeIDs)
                {
                    if (GetSveVoznje().ContainsKey(id))
                    {
                        v = GetSveVoznje()[id];
                        v.Musterija = menjamo;
                        IzmeniVoznju(id, v);
                    }
                }

                DodajKorisnik(menjamo, username);
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
            if (vozac.Pol != menjamo.Pol)
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
            if (vozac.Blokiran != menjamo.Blokiran)
                menjamo.Blokiran = vozac.Blokiran;
            if (vozac.Slobodan != menjamo.Slobodan)
                menjamo.Slobodan = vozac.Slobodan;

            Voznja v = null;
            lock (new object())
            {
                foreach (int id in menjamo.VoznjeIDs)
                {
                    if (GetSveVoznje().ContainsKey(id))
                    {
                        v = GetSveVoznje()[id];
                        v.Vozac = menjamo;
                        IzmeniVoznju(id, v);
                    }
                }
                GetVozace().Remove(username);
                DodajVozac(menjamo, username);
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

            Voznja v = null;
            lock (new object())
            {
                foreach (int id in menjamo.VoznjeIDs)
                {
                    if (GetSveVoznje().ContainsKey(id))
                    {
                        v = GetSveVoznje()[id];
                        v.Dispecer = menjamo;
                        IzmeniVoznju(id, v);
                    }
                }

                DodajDispecer(menjamo, username);
            }
        }

        public static void IzmeniVoznju(int id, Voznja voznja)
        {
            Voznja menjamo = new Voznja();

            lock (new object())
            {
                GetSveVoznje().TryGetValue(id, out menjamo);
                GetSveVoznje().Remove(id);
            }

            if (voznja.TipAutomobila == Common.TIP_AUTOMOBILA.Kombi)
                menjamo.TipAutomobila = Common.TIP_AUTOMOBILA.Kombi;
            else
                menjamo.TipAutomobila = Common.TIP_AUTOMOBILA.Putnicki;
            if (voznja.Dispecer != null)
                menjamo.Dispecer = voznja.Dispecer;
            if (voznja.Vozac != null)
                menjamo.Vozac = voznja.Vozac;
            if (voznja.Iznos != 0)
                menjamo.Iznos = voznja.Iznos;
            if (voznja.Komentar != null)
            {
                Komentar k = new Komentar();
                k.DatumObjave = voznja.Komentar.DatumObjave;
                k.Korisnik = voznja.Komentar.Korisnik;
                k.Ocena = voznja.Komentar.Ocena;
                k.Opis = voznja.Komentar.Opis;
                k.Voznja = voznja.Komentar.Voznja;
                menjamo.Komentar = k;
            }
            if (voznja.LokacijaOdredista != null)
            {
                Lokacija lokacija = new Lokacija();
                if (voznja.LokacijaOdredista.Adresa != null && voznja.LokacijaOdredista.GeoCoordinate != null)
                {
                    lokacija.Adresa = voznja.LokacijaOdredista.Adresa;
                    lokacija.GeoCoordinate = voznja.LokacijaOdredista.GeoCoordinate;
                    menjamo.LokacijaOdredista = lokacija;
                }
            }
            if (voznja.LokacijaPolazista != null)
            {
                Lokacija lokacija = new Lokacija();
                if (voznja.LokacijaPolazista.Adresa != null && voznja.LokacijaPolazista.GeoCoordinate != null)
                {
                    lokacija.Adresa = voznja.LokacijaPolazista.Adresa;
                    lokacija.GeoCoordinate = voznja.LokacijaPolazista.GeoCoordinate;
                    menjamo.LokacijaPolazista = lokacija;
                }
            }
            if (voznja.StatusVoznje != menjamo.StatusVoznje)
                menjamo.StatusVoznje = voznja.StatusVoznje;

            lock (new object())
            {
                DodajVoznje(menjamo);
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

        public static List<Voznja> CitajVoznje()
        {
            XmlSerializer serializer = new XmlSerializer(typeof(List<Voznja>));
            lock (new object())
            {
                using (TextReader reader = new StreamReader(path + @"Voznje.xml"))
                {
                    return (List<Voznja>)(serializer.Deserialize(reader));
                }
            }
        }


        public static void DodajKorisnik(Korisnik korisnik, string oldUsername)
        {
            GetKorisnike().Add(korisnik.KorisnickoIme, korisnik);

            List<Korisnik> korisnici = CitajKorisnik();
            Korisnik k = korisnici.Find(f => f.KorisnickoIme == korisnik.KorisnickoIme || f.KorisnickoIme == oldUsername);
            if (k == null)
                korisnici.Add(korisnik);
            else
            {
                korisnici.Remove(k);
                korisnici.Add(korisnik);
            }
            
            XmlSerializer serializer = new XmlSerializer(typeof(List<Korisnik>));
            lock (new object())
            {
                using (TextWriter writer = new StreamWriter(path + @"Musterije.xml", false))
                {
                    serializer.Serialize(writer, korisnici);
                }
            }
        }

        public static void DodajDispecer(Korisnik dispecer, string oldUsername)
        {
            GetDispecere().Add(dispecer.KorisnickoIme, dispecer);

            List<Korisnik> dispeceri = CitajDispecer();

            Korisnik k = dispeceri.Find(f => f.KorisnickoIme == dispecer.KorisnickoIme || f.KorisnickoIme == oldUsername);
            if (k == null)
                dispeceri.Add(dispecer);
            else
            {
                dispeceri.Remove(k);
                dispeceri.Add(dispecer);
            }

            XmlSerializer serializer = new XmlSerializer(typeof(List<Korisnik>));
            lock (new object())
            {
                using (TextWriter writer = new StreamWriter(path + @"Dispeceri.xml", false))
                {
                    serializer.Serialize(writer, dispeceri);
                }
            }
        }

        public static void DodajVozac(Vozac vozac, string oldUsername)
        {
            GetVozace().Add(vozac.KorisnickoIme, vozac);

            List<Vozac> vozaci = CitajVozac();

            Vozac k = vozaci.Find(f => f.KorisnickoIme == vozac.KorisnickoIme || f.KorisnickoIme == oldUsername);
            if (k == null)
                vozaci.Add(vozac);
            else
            {
                vozaci.Remove(k);
                vozaci.Add(vozac);
            }

            XmlSerializer serializer = new XmlSerializer(typeof(List<Vozac>));
            lock (new object())
            {
                using (TextWriter writer = new StreamWriter(path + @"Vozaci.xml", false))
                {
                    serializer.Serialize(writer, vozaci);
                }
            }
        }

        public static void DodajVoznje(Voznja voznja)
        {
            GetSveVoznje().Add(voznja.ID, voznja);

            List<Voznja> voznje = CitajVoznje();

            Voznja k = voznje.Find(f => f.ID == voznja.ID);
            if (k == null)
                voznje.Add(voznja);
            else
            {
                voznje.Remove(k);
                voznje.Add(voznja);
            }

            XmlSerializer serializer = new XmlSerializer(typeof(List<Voznja>));
            lock (new object())
            {
                using (TextWriter writer = new StreamWriter(path + @"Voznje.xml", false))
                {
                    serializer.Serialize(writer, voznje);
                }
            }
        }


        public static void CitajSve()
        {
            cnt = 0;
            format = "HH:mm dd/MM/yyyy";
            lock (new object())
            {
                var k = CitajKorisnik();
                foreach(Korisnik kor in k)
                {
                    if (!kor.Blokiran)
                        GetKorisnike().Add(kor.KorisnickoIme, kor);
                    else
                        GetBlokiraneKorisnike().Add(kor.KorisnickoIme);
                }
                
                var d = CitajDispecer();
                foreach (Korisnik kor in d)
                {
                    GetDispecere().Add(kor.KorisnickoIme, kor);
                }
                
                var v = CitajVozac();
                foreach (Vozac voz in v)
                {
                    if (!voz.Blokiran)
                    {
                        GetVozace().Add(voz.KorisnickoIme, voz);
                        if (voz.Slobodan)
                            GetSlobodneVozace().Add(voz.KorisnickoIme);
                    }
                    else
                        GetBlokiraneVozace().Add(voz.KorisnickoIme);
                }
                
                var voznja = CitajVoznje();
                foreach (Voznja voz in voznja)
                {
                    if(voz.StatusVoznje == Common.STATUS_VOZNJE.Kreirana || voz.StatusVoznje == Common.STATUS_VOZNJE.Formirana)
                    {
                        GetSlobodneVoznje().Add(voz.ID);
                    }
                    GetSveVoznje().Add(voz.ID, voz);
                }

                foreach (Voznja voz in voznja)
                {
                    if (voz.ID > cnt)
                        cnt = voz.ID;
                }
            }
        }
    }
}