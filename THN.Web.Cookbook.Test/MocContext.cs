using Moq;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace THN.Web.Cookbook.Test
{
    public abstract class MocContext
    {
        public Mock<Models.CookbookContext> mocContext { get; private set; }

        public MocContext()
        {
            var mocRecipeData = new List<Models.Recipe>()
                {
                    new Models.Recipe
                    {
                        RecipeId = 1,
                        Title = "Test Recipe #1"
                    },
                    new Models.Recipe
                    {
                        RecipeId = 2,
                        Title = "Test Recipe #2"
                    }
                }.AsQueryable();

            var mocNoteData = new List<Models.RecipeNote>()
                {
                    new Models.RecipeNote
                    {
                        RecipeNoteId=1,
                        RecipeFk = 1,
                        Text = "This is a recipe note."
                    }
                }.AsQueryable();

            var mocRecipeSet = new Mock<IDbSet<Models.Recipe>>();
            mocRecipeSet.Setup(m => m.Provider).Returns(mocRecipeData.Provider);
            mocRecipeSet.Setup(m => m.Expression).Returns(mocRecipeData.Expression);
            mocRecipeSet.Setup(m => m.ElementType).Returns(mocRecipeData.ElementType);
            mocRecipeSet.Setup(m => m.GetEnumerator()).Returns(mocRecipeData.GetEnumerator());

            var mocNoteSet = new Mock<IDbSet<Models.RecipeNote>>();
            mocNoteSet.Setup(m => m.Provider).Returns(mocNoteData.Provider);
            mocNoteSet.Setup(m => m.Expression).Returns(mocNoteData.Expression);
            mocNoteSet.Setup(m => m.ElementType).Returns(mocNoteData.ElementType);
            mocNoteSet.Setup(m => m.GetEnumerator()).Returns(mocNoteData.GetEnumerator());


            mocContext = new Mock<Models.CookbookContext>();
            mocContext
                .Setup(x => x.Recipes)
                .Returns(mocRecipeSet.Object);

            mocContext
                .Setup(x => x.RecipeNotes)
                .Returns(mocNoteSet.Object);

        }
    }
}
