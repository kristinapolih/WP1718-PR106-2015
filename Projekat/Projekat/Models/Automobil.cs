using Projekat.Models.Common;

namespace Projekat.Models
{
    public class Automobil : IAutomobil
    {
        #region Fields
        private IVozac vozac;
        private string godisteAutomobila;
        private string brojRegistarskeOznake;
        private string brojTaksiVozila;
        private TIP_AUTOMOBILA tipAutomobila;
        #endregion

        #region Props
        public IVozac Vozac
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
        }

        public Automobil(IVozac vozac)
        {
            this.Vozac = vozac;
            BrojTaksiVozila = GetNewNumberOfTaxi();
        }

        public string GetNewNumberOfTaxi()
        {
            return (Common.Random.GetLetter() + Common.Random.GetLetter() + Common.Random.GetNumber() + Common.Random.GetNumber() + Common.Random.GetNumber()).ToString();
        }
    }
}