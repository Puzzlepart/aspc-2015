using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Morse_Office_WebAPI.Controllers
{
    public class TextController : ApiController
    {
        public IHttpActionResult GetText()
        {
            string text = Repo.Buffer;
            Repo.Buffer = string.Empty;
            return Ok(text);
        }
    }
}
