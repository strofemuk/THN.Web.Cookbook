using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THN.Web.Cookbook.Models;

namespace THN.Web.Cookbook.Test
{
    class TestRecipeDbSet : TestDbSet<Recipe>
    {
        public override Recipe Find(params object[] keyValues)
        {
            return this.SingleOrDefault(recipe => recipe.RecipeId == (int)keyValues.Single());
        }
    }
}
