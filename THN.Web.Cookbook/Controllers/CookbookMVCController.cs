using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using THN.Web.Cookbook.Models;

namespace THN.Web.Cookbook.Controllers
{
    public class CookbookMVCController : Controller
    {
        private ICookbookContext db = new CookbookContext();

        public CookbookMVCController() { }

        public CookbookMVCController(ICookbookContext context)
        {
            db = context;
        }

        // GET: CookbookMVC
        public ActionResult Index(string sortOrder, string currentFilter, string searchString)
        {
            ViewBag.CurrentSort = sortOrder;
            ViewBag.TitleSortParm = String.IsNullOrEmpty(sortOrder) ? "title_desc" : "";
            ViewBag.CategorySortParm = sortOrder == "category" ? "categorgy_desc" : "category";

            ViewBag.CurrentFilter = searchString;

            var recipes = from r in db.Recipes select r;

            if (!String.IsNullOrEmpty(searchString))
            {
                recipes = recipes.Where(r => r.Title.Contains(searchString) || r.Category.ToString().Contains(searchString));
            }

            switch (sortOrder)
            {
                case "title_desc":
                    recipes = recipes.OrderByDescending(r => r.Title);
                    break;
                case "category":
                    recipes = recipes.OrderBy(r => r.Category.ToString());
                    break;
                case "category_desc":
                    recipes = recipes.OrderByDescending(r => r.Category.ToString());
                    break;
                default:
                    recipes = recipes.OrderBy(r => r.Title);
                    break;
            }

            return View("Index",recipes);
        }

        // GET: CookbookMVC/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Recipe recipe = db.Recipes.Find(id);
            recipe.Notes = db.RecipeNotes.Where(n => n.RecipeFk == id).ToList();
            if (recipe == null)
            {
                return HttpNotFound();
            }
            return View(recipe);
        }

        // GET: CookbookMVC/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CookbookMVC/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "RecipeId,Source,Instructions,RowVersion,Title,Category")] Recipe recipe)
        {
            if (ModelState.IsValid)
            {
                db.Recipes.Add(recipe);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View("Create",recipe);
        }

        // GET: CookbookMVC/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Recipe recipe = db.Recipes.Find(id);
            if (recipe == null)
            {
                return HttpNotFound();
            }
            return View(recipe);
        }

        // POST: CookbookMVC/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "RecipeId,Source,Instructions,RowVersion,Title,Category")] Recipe recipe)
        {
            if (ModelState.IsValid)
            {
                //db.Entry(recipe).State = EntityState.Modified;
                db.SetModified(typeof(Recipe));
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(recipe);
        }

        // GET: CookbookMVC/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Recipe recipe = db.Recipes.Find(id);
            if (recipe == null)
            {
                return HttpNotFound();
            }
            return View(recipe);
        }

        // POST: CookbookMVC/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Recipe recipe = db.Recipes.Find(id);
            db.Recipes.Remove(recipe);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
