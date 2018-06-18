namespace Projekat.Models
{
    public class Lokacija 
    {
        #region Fields
        private Koordinate geoCoordinate;
        private Adresa adresa;
        #endregion

        #region Props
        public Koordinate GeoCoordinate
        {
            get { return geoCoordinate; }
            set { geoCoordinate = value; }
        }
        public Adresa Adresa
        {
            get { return adresa; }
            set { adresa = value; }
        }
        #endregion

        public Lokacija ()
        {
        }
    }
}