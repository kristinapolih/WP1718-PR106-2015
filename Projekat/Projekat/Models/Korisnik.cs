using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Projekat.Models
{
    public enum POL
    {
        M,
        Z
    }

    public enum ULOGA
    {
        Musterija,
        Admin,
        Vozac
    }

    public enum VOZNJA
    {
        Musterija,
        Admin,
        Vozac
    }

    public class Korisnik
    {
        private string korisnickoIme;
        private string loznka;
        private string ime;
        private string prezime;
        private POL pol;
        private string jMBG;
        private string telefon;
        private string email;
        private ULOGA uloga;
        private VOZNJA voznja;
    }
}