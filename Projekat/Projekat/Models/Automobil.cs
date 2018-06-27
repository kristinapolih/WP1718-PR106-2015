using Projekat.Models.Common;

namespace Projekat.Models
{
    public class Automobil
    {
        #region Fields
        private Vozac vozac;
        private string godisteAutomobila;
        private string brojRegistarskeOznake;
        private string brojTaksiVozila;
        private TIP_AUTOMOBILA tipAutomobila;
        #endregion

        #region Props
        public Vozac Vozac
        {
            get { return vozac; }
            set { vozac = value; }
        }
        public string GodisteAutomobila
        {
            get { return godisteAutomobila; }
            set { godisteAutomobila = value; }
        }
        public string BrojRegistarskeOznake
        {
            get { return brojRegistarskeOznake; }
            set { brojRegistarskeOznake = value; }
        }
        public string BrojTaksiVozila
        {
            get { return brojTaksiVozila; }
            set { brojTaksiVozila = value; }
        }
        public TIP_AUTOMOBILA TipAutomobila
        {
            get { return tipAutomobila; }
            set { tipAutomobila = value; }
        }
        #endregion

        public Automobil()
        {
            BrojTaksiVozila = GetNewNumberOfTaxi();
            BrojRegistarskeOznake = GetNewRegOfTaxi();
        }

        public string GetNewNumberOfTaxi()
        {
            return (Common.Random.GetLetter(2) + Common.Random.GetNumber()).ToString();
        }

        public string GetNewRegOfTaxi()
        {
            return ("NS" + Common.Random.GetNumber() + Common.Random.GetLetter(2)).ToString();
        }
    }
}