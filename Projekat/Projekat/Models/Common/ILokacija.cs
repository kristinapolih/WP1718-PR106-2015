using System.Device.Location;

namespace Projekat.Models.Common
{
    public interface ILokacija
    {
        GeoCoordinate GeoCoordinate { get; set; }
        IAdresa Adresa { get; set; }
    }
}
