using System;
using System.Linq;
using System.Text;

namespace hw1
{
    public class MyClass
    {
        public MyClass()
        {
        }

        public static void Main(string[] args)
        {
            var people = new List<Person>()
            {
                new Person(1,"Bill", "Smith", 41),
                new Person(2,"Sarah", "Jones", 22),
                new Person(3,"Stacy","Baker", 21),
                new Person(4,"Vivianne","Dexter", 19 ),
                new Person(5,"Bob","Smith", 49 ),
                new Person(6,"Brett","Baker", 51 ),
                new Person(7,"Mark","Parker", 19),
                new Person(8,"Alice","Thompson", 18),
                new Person(9,"Evelyn","Thompson", 58 ),
                new Person(10,"Mort","Martin", 58),
                new Person(11,"Eugene","deLauter", 84 ),
                new Person(12,"Gail","Dawson", 19 ),
            };



            var OldestAge = GetOldestAge(people);
            var YoungestAge = GetYoungestAge(people);
            var MaxDiff = OldestAge - YoungestAge;
            Console.WriteLine(MaxDiff);

            Console.ReadLine("Program has finished!");
        }

        private int GetOldestAge(List<Person> people)
		{
            return people.OrderByDescending(x => x.Age).First();
        }

        private int GetYoungestAge(List<Person> people)
		{
            return people.OrderBy(x => x.Age).First();
		}
    }
}
