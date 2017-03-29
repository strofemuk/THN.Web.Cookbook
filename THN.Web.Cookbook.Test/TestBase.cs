using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace THN.Web.Cookbook.Test
{
    public abstract class TestBase
    {
        protected Models.ICookbookContext AddTestData(Models.ICookbookContext context)
        {
            context.Recipes.Add(new Models.Recipe { RecipeId = 1, Title = "Test Recipe #1" });
            context.Recipes.Add(new Models.Recipe { RecipeId = 2, Title = "Test Recipe #2" });

            context.RecipeNotes.Add(new Models.RecipeNote { RecipeNoteId = 1, RecipeFk = 1, Text = "Test note." });

            return context;
        }
    }
}
