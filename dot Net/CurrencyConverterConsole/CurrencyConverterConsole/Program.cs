using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace CurrencyConverterConsole
{
    class MainClass
    {

        // private static variables
        private const string DATA_FILE_PATH = "/Users/gigakhizanishvili/Projects/CurrencyConverterConsole/CurrencyConverterConsole/Data.txt";
        private const string BOUGHT_FILE_PATH = "/Users/gigakhizanishvili/Projects/CurrencyConverterConsole/CurrencyConverterConsole/BoughtAmounts.txt";
        private const string SOLD_FILE_PATH = "/Users/gigakhizanishvili/Projects/CurrencyConverterConsole/CurrencyConverterConsole/SoldAmounts.txt";

        public static void Main(string[] args)
        {
            Console.WriteLine("This is Currency Converter.");

            string text = System.IO.File.ReadAllText(DATA_FILE_PATH);

            // Display the file contents to the console. Variable text is a string.
            //System.Console.WriteLine("Contents of WriteText.txt = {0}", text);

            string ConvertedText = Regex.Replace(text, @"\t|\n|\r", "");

            string[] words = ConvertedText.Split(' ');

            var map = new Dictionary<string, CurrencyItem>();


            for (int i = 0; i < words.Length; i+=4)
            {
                if (i > words.Length - 4)
                    continue;
                string name = words[i];
                double Currency = Double.Parse(words[i + 1]);
                double BuyCurrency = Double.Parse(words[i + 2]);
                double SellCurrency = Double.Parse(words[i + 3]);
                CurrencyItem item = new CurrencyItem(name, Currency, BuyCurrency, SellCurrency);
                map.Add(words[i], item);
            }


            while (true)
            {
                Console.WriteLine("Functions of Converter, type ... for ...:\n");
                Console.WriteLine("ADD      -> to add new currency into DataBase");
                Console.WriteLine("CONVERT  -> to convert one currency into another");
                Console.WriteLine("SHOW     -> to show all currencies in relation of GEL, boughs, sells");
                Console.WriteLine("BUY      -> to buy currency");
                Console.WriteLine("SELL     -> to sell currency");


                string command = Console.ReadLine();
                if (command == "ADD")
                {
                    MainClass.AddNewCurrency(text, map);
                }
                else if(command == "CONVERT" || command.Length == 0)
                {
                    MainClass.ConvertCurrency(map);
                }
                else if(command == "SHOW")
                {
                    MainClass.ShowInfo();
                }
                else if(command == "BUY")
                {
                    MainClass.BuyCurrency(map);
                }
                else if(command == "SELL")
                {
                    MainClass.SellCurrency(map);
                }
                Console.WriteLine("__________________________________________________________\n");
            }
        }

        private static void ConvertCurrency(Dictionary<string, CurrencyItem> map)
        {
            Console.Write("Enter currency FROM which we should convert: ");
            string FromCurrency = Console.ReadLine();
            if (map.ContainsKey(FromCurrency))
            {
                MainClass.ConvertFrom(map, FromCurrency);
            }
            else
            {
                Console.WriteLine("This currency is not in out base");
            }
        }


        private static void AddNewCurrency(string text, Dictionary<string, CurrencyItem> map)
        {
            Console.WriteLine("Please Enter name for currency, three capital english letters:");
            string NewCurrencyName = Console.ReadLine();
            Console.WriteLine($"Enter course of {NewCurrencyName} (How much GEL is 1 {NewCurrencyName}): ");
            double k = Convert.ToDouble(Console.ReadLine());
            Console.WriteLine($"Enter course of {NewCurrencyName} to Buy: ");
            double BuyK = Convert.ToDouble(Console.ReadLine());
            Console.WriteLine($"Enter course of {NewCurrencyName} to Sell: ");
            double SellK = Convert.ToDouble(Console.ReadLine());
            CurrencyItem Item = new CurrencyItem(NewCurrencyName, k, BuyK, SellK);

            text += $"\n{Item.ToString()}";
            System.IO.File.WriteAllText(DATA_FILE_PATH, text);
            map.Add(NewCurrencyName, Item);
        }


        private static void ConvertFrom(Dictionary<string, CurrencyItem> map, string FromCurrencyName)
        {
            Console.Write("Enter currency TO which we should convert: ");
            string ToCurrencyName = Console.ReadLine();
            if (map.ContainsKey(ToCurrencyName))
            {
                CurrencyItem FromItem;
                CurrencyItem ToItem;
                map.TryGetValue(FromCurrencyName, out FromItem);
                map.TryGetValue(ToCurrencyName, out ToItem);
                Console.Write("Enter money: ");
                double amount = Convert.ToDouble(Console.ReadLine());
                double converted = amount * FromItem.Currency / ToItem.Currency;
                Console.WriteLine($"Converted amount to {ToCurrencyName} is : {converted}");
            }
            else
            {
                Console.WriteLine("This currency is not in out base");
            }
        }


        private static void BuyCurrency(Dictionary<string, CurrencyItem> map)
        {
            Console.Write("Enter name of currency which you have: ");
            string FromCurrencyName = Console.ReadLine();
            if (map.ContainsKey(FromCurrencyName))
            {
                Console.Write("Enter currency which you want to buy: ");
                string ToCurrencyName = Console.ReadLine();
                if (map.ContainsKey(ToCurrencyName))
                {
                    Console.Write("Enter amount of money which you have: ");
                    double Amount = Convert.ToDouble(Console.ReadLine());

                    CurrencyItem FromItem;
                    CurrencyItem ToItem;
                    map.TryGetValue(FromCurrencyName, out FromItem);
                    map.TryGetValue(ToCurrencyName, out ToItem);

                    double BoughtAmount = Amount * FromItem.SellCurrency / ToItem.BuyCurrency;

                    string BuyText = System.IO.File.ReadAllText(BOUGHT_FILE_PATH);
                    Console.WriteLine($"Bought {Amount} {FromCurrencyName} for {BoughtAmount} {ToCurrencyName}");
                    System.IO.File.WriteAllText(BOUGHT_FILE_PATH, BuyText + $"\n Bought {Amount} {FromCurrencyName} for {BoughtAmount} {ToCurrencyName}");
                }
                else
                {
                    Console.WriteLine("You have entered wrong Currency Name");
                }
            }
            else
            {
                Console.WriteLine("You have entered wrong Currency Name");
            }
        }


        private static void SellCurrency(Dictionary<string, CurrencyItem> map)
        {
            Console.Write("Enter name of currency which you have: ");
            string FromCurrencyName = Console.ReadLine();
            if (map.ContainsKey(FromCurrencyName))
            {
                Console.Write("Enter currency which you want to buy: ");
                string ToCurrencyName = Console.ReadLine();
                if (map.ContainsKey(ToCurrencyName))
                {
                    Console.Write("Enter amount of money which you have: ");
                    double Amount = Convert.ToDouble(Console.ReadLine());

                    CurrencyItem FromItem;
                    CurrencyItem ToItem;
                    map.TryGetValue(FromCurrencyName, out FromItem);
                    map.TryGetValue(ToCurrencyName, out ToItem);

                    double BoughtAmount = Amount * FromItem.SellCurrency / ToItem.BuyCurrency;
                    Console.WriteLine($"From {Amount} {FromCurrencyName} sold {BoughtAmount} {ToCurrencyName}");
                    string SoldText = System.IO.File.ReadAllText(SOLD_FILE_PATH);
                    System.IO.File.WriteAllText(SOLD_FILE_PATH, SoldText + $"\n From {FromCurrencyName} sold {Amount} for {BoughtAmount} {ToCurrencyName}");
                }
                else
                {
                    Console.WriteLine("You have entered wrong Currency Name");
                }
            }
            else
            {
                Console.WriteLine("You have entered wrong Currency Name");
            }
        }

        private static void ShowInfo()
        {
            Console.WriteLine("Enter INFO, BUY_INFO or SELL_INFO");
            string mode = Console.ReadLine();
            if (mode == "INFO")
            {
                Console.WriteLine(System.IO.File.ReadAllText(DATA_FILE_PATH));
            }
            else if (mode == "BUY_INFO")
            {
                Console.WriteLine(System.IO.File.ReadAllText(BOUGHT_FILE_PATH));
            }
            else if (mode == "SELL_INFO")
            {
                Console.WriteLine(System.IO.File.ReadAllText(SOLD_FILE_PATH));
            }
        }
    }

    public class CurrencyItem
    {
        public string name;
        public double Currency;
        public double BuyCurrency;
        public double SellCurrency;

        public CurrencyItem(string name, double Currency, double BuyCurrency, double SellCurrency)
        {
            this.name = name;
            this.Currency = Currency;
            this.BuyCurrency = BuyCurrency;
            this.SellCurrency = SellCurrency;
        }

        override public string ToString()
        {
            return $"{name} {Currency} {BuyCurrency} {SellCurrency} ";
        }
    }
}
