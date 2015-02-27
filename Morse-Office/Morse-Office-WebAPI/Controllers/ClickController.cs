using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Morse_Office_WebAPI.Controllers
{
    public class ClickController : ApiController
    {
        public IHttpActionResult GetClick()
        {

            Repo.DoClick();

            return Ok(Repo.Status());
        }
    }
}
