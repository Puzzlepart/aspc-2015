using System;

namespace Morse_Office_WebAPI
{
    public class Repo
    {
        private static DateTime _lastClick;
        private static int _clickCount;
        private static string _buffer;


        public static string Status()
        {
            return _clickCount + ":" + _buffer;
        }

        public static string Buffer
        {
            get
            {
                if ((DateTime.UtcNow - _lastClick).TotalSeconds > 5 && _clickCount > 0)
                {
                    char character = (char)(96 + _clickCount);
                    _buffer += character;
                    _clickCount = 0;
                }
                return _buffer;
            }
            set { _buffer = value; }
        }


        public static void DoClick()
        {
            if ((DateTime.UtcNow - _lastClick).TotalSeconds > 5 && _clickCount > 0)
            {
                char character = (char)(96 + _clickCount);
                _buffer += character;
                _clickCount = 0;
            }
            _lastClick = DateTime.UtcNow;
            _clickCount++;
        }
    }
}