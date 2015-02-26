using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security;
using System.Web.Http;
using Microsoft.SharePoint.Client;
using Newtonsoft.Json.Linq;

namespace ASPC.TakeDown
{
    public class TakeDownController : ApiController
    {
        // GET api/<controller>
        public string Get()
        {
            var webUri = new Uri("http://aker-dev-tarjei.cloudapp.net/");
            const string userName = "tarjeieo@puzzlepart.com";
            const string password = "StrongestM4n";
            var securePassword = new SecureString();
            foreach (var c in password)
            {
                securePassword.AppendChar(c);
            }
            var credentials = new NetworkCredential(userName, securePassword);

            var res = GetList(webUri, credentials, "Contacts");
            return res.ToString();
        }


        public static JToken GetList(Uri webUri, ICredentials credentials, string listTitle)
        {
            try
            {
                using (var client = new WebClient())
                {
                    client.Headers.Add("X-FORMS_BASED_AUTH_ACCEPTED", "f");
                    client.Credentials = credentials;
                    client.Headers.Add(HttpRequestHeader.ContentType, "application/json;odata=verbose");
                    client.Headers.Add(HttpRequestHeader.Accept, "application/json;odata=verbose");
                    //http://aker-dev-tarjei.cloudapp.net/_api/search/query?querytext='*'
                    var endpointUri = new Uri(webUri, "/_api/search/query?querytext='*'&refinementfilters='count(test%2cfrom%3d2)'");
                    var result = client.DownloadString(endpointUri);
                    var t = JToken.Parse(result);
                    return t["d"];
                }
            }
            catch (Exception)
            {
                return "Booyah!";
            }
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}