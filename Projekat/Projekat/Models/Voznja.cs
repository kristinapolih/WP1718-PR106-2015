using Projekat.Models.Common;
using System;

namespace Projekat.Models
{
    public class Voznja : IVoznja
    {
        #region Fields
        private DateTime datumIVremePorudzbine;
        private ILokacija lokacijaPolazista;
        private TIP_AUTOMOBILA tipAutomobila;
        private IMusterija musterija;
        private ILokacija lokacijaOdredista;
        private IDispecer dispecer;
        private IVozac vozac;
        private double iznos;
        private IKomentar komentar;
        private STATUS_VOZNJE statusVoznje;
        #endregion

        #region Props
        public DateTime DatumIVremePorudzbine
        {
            get { return datumIVremePorudzbine; }
            set { datumIVremePorudzbine = value; }
        }
        public ILokacija LokacijaPolazista
        {
            get { return lokacijaPolazista; }
            set { lokacijaPolazista = value; }
        }
        public TIP_AUTOMOBILA TipAutomobila
        {
            get { return tipAutomobila; }
            set { tipAutomobila = value; }
        }
        public IMusterija Musterija
        {
            get { return musterija; }
            set { musterija = value; }
        }
        public ILokacija LokacijaOdredista
            {
            get { return lokacijaOdredista; }
            set { lokacijaOdredista = value; }
        }
        public IDispecer Dispecer
        {
            get { return dispecer; }
            set { dispecer = value; }
        }
        public IVozac Vozac
        {
            get { return vozac; }
            set { vozac = value; }
        }
        public double Iznos
        {
            get { return iznos; }
            set { iznos = value; }
        }
        public IKomentar Komentar
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