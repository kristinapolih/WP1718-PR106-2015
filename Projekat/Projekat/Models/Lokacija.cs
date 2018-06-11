using Projekat.Models.Common;
using System;
using System.Collections.Generic;
using System.Device.Location;
using System.Linq;
using System.Web;

namespace Projekat.Models
{
    public class Lokacija : ILokacija
    {
        #region Fields
        private GeoCoordinate geoCoordinate;
        private IAdresa adresa;
        #endregion

        #region Props
        public GeoCoordinate GeoCoordinate
        {
            get { return geoCoordinate; }
            set { geoCoordinate = value; }
        }
        public IAdresa Adresa
        {
            get { return adresa; }
            set { adresa = value; }
        }
        #endregion

        public Lokacija ()
        {
            GeoCoordinate = new GeoCoordinate();
            Adresa = new Adresa();
        }
    }
}