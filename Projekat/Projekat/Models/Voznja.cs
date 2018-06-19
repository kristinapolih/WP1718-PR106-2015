using Projekat.Models.Common;
using System;

namespace Projekat.Models
{
    public class Voznja
    {
        #region Fields
        private int iD;
        private string datumIVremePorudzbine;
        private Lokacija lokacijaPolazista;
        private TIP_AUTOMOBILA tipAutomobila;
        private Korisnik musterija;
        private Lokacija lokacijaOdredista;
        private Korisnik dispecer;
        private Vozac vozac;
        private double iznos;
        private Komentar komentar;
        private STATUS_VOZNJE statusVoznje;
        #endregion

        #region Props
        public int ID
        {
            get { return iD; }
            set { iD = value; }
        }
        public string DatumIVremePorudzbine
        {
            get { return datumIVremePorudzbine; }
            set { datumIVremePorudzbine = value; }
        }
        public Lokacija LokacijaPolazista
        {
            get { return lokacijaPolazista; }
            set { lokacijaPolazista = value; }
        }
        public TIP_AUTOMOBILA TipAutomobila
        {
            get { return tipAutomobila; }
            set { tipAutomobila = value; }
        }
        public Korisnik Musterija
        {
            get { return musterija; }
            set { musterija = value; }
        }
        public Lokacija LokacijaOdredista
            {
            get { return lokacijaOdredista; }
            set { lokacijaOdredista = value; }
        }
        public Korisnik Dispecer
        {
            get { return dispecer; }
            set { dispecer = value; }
        }
        public Vozac Vozac
        {
            get { return vozac; }
            set { vozac = value; }
        }
        public double Iznos
        {
            get { return iznos; }
            set { iznos = value; }
        }
        public Komentar Komentar
        {
            get { return komentar; }
            set { komentar = value; }
        }
        public STATUS_VOZNJE StatusVoznje
        {
            get { return statusVoznje; }
            set { statusVoznje = value; }
        }
        #endregion

        public Voznja() { }
    }
}