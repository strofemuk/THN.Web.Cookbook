using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Net;
using System.Web.Http.Results;


namespace THN.Web.Cookbook.Test
{
    [TestClass]
    public class WebApi
    {
        protected Models.ICookbookContext AddTestData(Models.ICookbookContext context)
        {
            context.Recipes.Add(new Models.Recipe { RecipeId = 1, Title = "Test Recipe #1" });
            context.Recipes.Add(new Models.Recipe { RecipeId = 2, Title = "Test Recipe #2" });

            context.RecipeNotes.Add(new Models.RecipeNote { RecipeNoteId = 1, RecipeFk = 1, Text = "Test note." });

            return context;
        }

        [TestClass]
        public class Recipes : WebApi
        {
            [TestMethod]
            public void GetAll_ExpectAllRecipes()
            {
                //arrange
                Models.ICookbookContext context = base.AddTestData(new TestContext());
                Controllers.RecipesController controller = new Controllers.RecipesController(context);
                //act

                var result = controller.GetRecipes() as TestRecipeDbSet;

                Assert.IsNotNull(result);
                Assert.AreEqual(2, result.Local.Count);

            }

            [TestMethod]
            public void Get_ExpectOneRecipe()
            {
                //arrange -- done in base class
                Models.ICookbookContext context = AddTestData(new TestContext());
                Controllers.RecipesController controller = new Controllers.RecipesController(context);

                //act
                var result = controller.GetRecipe(1) as OkNegotiatedContentResult<Models.Recipe>;

                //assert
                Assert.IsNotNull(result);
                Assert.AreEqual(1, result.Content.RecipeId);
            }

            [TestMethod]
            public void Post_ExpectSameRecipe()
            {
                //arrange
                Models.Recipe newRecipe = new Models.Recipe()
                {
                    RecipeId = 33,
                    Title = "Test post"
                };
                Models.ICookbookContext context = AddTestData(new TestContext());
                Controllers.RecipesController controller = new Controllers.RecipesController(context);

                //act
                var result = controller.PostRecipe(newRecipe) as CreatedAtRouteNegotiatedContentResult<Models.Recipe>;

                //assert
                Assert.IsNotNull(result);
                Assert.AreEqual(result.RouteName, "DefaultApi");
                Assert.AreEqual(result.RouteValues["Id"], result.Content.RecipeId);
                Assert.AreEqual(result.Content.Title, newRecipe.Title);          
            }

            [TestMethod]
            public void Put_ExpectStatusCode()
            {
                //arrange
                Models.Recipe recipe = new Models.Recipe()
                {
                    RecipeId = 1,
                    Title = "Edited recipe"
                };
                int id = 1;
                Models.ICookbookContext context = AddTestData(new TestContext());
                Controllers.RecipesController controller = new Controllers.RecipesController(context);

                //act
                var result = controller.PutRecipe(id, recipe) as StatusCodeResult;

                //assert
                Assert.IsNotNull(result);
                Assert.IsInstanceOfType(result, typeof(StatusCodeResult));
                Assert.AreEqual(HttpStatusCode.NoContent, result.StatusCode);
            }

            [TestMethod]
            public void Put_ExpectFailWhenDifferentId()
            {
                //arrange
                Models.ICookbookContext context = base.AddTestData(new TestContext());
                Controllers.RecipesController controller = new Controllers.RecipesController(context);

                //act
                var result = controller.PutRecipe(999, new Models.Recipe { RecipeId = 4, Title = "BAD" });

                //assert
                Assert.IsInstanceOfType(result, typeof(BadRequestResult));
            }

            [TestMethod]
            public void Delete_ExpectOk()
            {
                //arrange
                Models.ICookbookContext context = AddTestData(new TestContext());
                Controllers.RecipesController controller = new Controllers.RecipesController(context);

                //act
                var result = controller.DeleteRecipe(1) as OkNegotiatedContentResult<Models.Recipe>;

                //assert
                Assert.IsNotNull(result);
                Assert.AreEqual(1, result.Content.RecipeId);
            }

        }


        [TestClass]
        public class RecipeNotes: WebApi
        {
            [TestMethod]
            public void GetAll_ExpcetAllNotes()
            {
                //arrange
                Models.ICookbookContext context = AddTestData(new TestContext());
                Controllers.RecipeNotesController controller = new Controllers.RecipeNotesController(context);

                //act
                var result = controller.GetRecipeNotes() as TestNotesDbSet;

                //act
                Assert.IsNotNull(result);
                Assert.AreEqual(1, result.Local.Count);
            }

            [TestMethod]
            public void Post_ExpectSameNote()
            {
                //arrange
                Models.ICookbookContext context = AddTestData(new TestContext());
                Controllers.RecipeNotesController controller = new Controllers.RecipeNotesController(context);
                Models.RecipeNote newNote = new Models.RecipeNote { RecipeNoteId = 2, RecipeFk = 1, Text = "Test post" };

                //act
                var result = controller.PostRecipeNote(newNote) as CreatedAtRouteNegotiatedContentResult<Models.RecipeNote>;

                //assert
                Assert.IsNotNull(result);
                Assert.AreEqual(result.RouteName, "DefaultApi");
                Assert.AreEqual(result.RouteValues["id"], result.Content.RecipeNoteId);
                Assert.AreEqual(result.Content.Text, newNote.Text);
            }
        }
    }
}
