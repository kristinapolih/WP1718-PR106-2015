namespace Projekat.Models
{
    public class Koordinate
    {
        #region Fileds
        private double longitude;
        private double latitude;
        #endregion

        #region Props
        public double Longitude
        {
            get { return longitude; }
            set { longitude = value; }
        }
        public double Latitude
        {
            get { return latitude; }
            set { latitude = value; }
        }
        #endregion

        public Koordinate() { }
    }
}