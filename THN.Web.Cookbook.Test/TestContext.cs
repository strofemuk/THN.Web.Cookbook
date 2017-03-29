using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THN.Web.Cookbook.Models;

namespace THN.Web.Cookbook.Test
{
    class TestContext : ICookbookContext
    {
        public TestContext()
        {
            Recipes = new TestRecipeDbSet();
            RecipeNotes = new TestNotesDbSet();       
        }

        public DbSet<Recipe> Recipes { get; set; }

        public DbSet<RecipeNote> RecipeNotes { get; set; }

        public int SaveChanges() { return 0; }

        public void SetModified(object entity) { }

        public void Dispose() { }
    }
}
