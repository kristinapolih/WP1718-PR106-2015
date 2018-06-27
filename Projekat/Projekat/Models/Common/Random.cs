using System.Linq;

namespace Projekat.Models.Common
{
    public static class Random
    { 
        static System.Random random = new System.Random();

        public static string GetLetter(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public static string GetNumber()
        {
            int length = 3;
            const string chars = "0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
            /*
            random = new System.Random();
            int num = random.Next(0, 10); 
            char let = (char)num;
            return let;*/
        }
    }
}