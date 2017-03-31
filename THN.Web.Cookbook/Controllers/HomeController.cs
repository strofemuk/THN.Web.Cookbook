using System.Web.Mvc;

namespace THN.Web.Cookbook.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Cookbook()
        {
            return View();
        }
    }
}
