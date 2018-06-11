namespace Projekat.Models.Common
{
    public static class Random
    {
        static System.Random random = new System.Random();

        public static char GetLetter()
        {
            int num = random.Next(0, 26); 
            char let = (char)('A' + num);
            return let;
        }

        public static char GetNumber()
        {
            int num = random.Next(0, 10); 
            char let = (char)num;
            return let;
        }
    }
}