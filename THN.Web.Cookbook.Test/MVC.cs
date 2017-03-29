using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace THN.Web.Cookbook.Test
{
    [TestClass]
    public class MVC : TestBase
    {
        [TestMethod]
        public void Index_ExpectView()
        {
            //Arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);

            //Act
            ViewResult result =(ViewResult)controller.Index(null, null, null);

            //assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Index", result.ViewName);
        }

        [TestMethod]
        public void Index_ExpectAllRecipes()
        {
            //arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController();

            //act
            var result = controller.Index(null, null, null);
            var model = (IEnumerable<Models.Recipe>)((ViewResult)result).ViewData.Model;

            //assert
            Assert.IsNotNull(result);
            Assert.IsNotNull(model);
            Assert.AreEqual(2, model.Count());

        }

        [TestMethod]
        public void Create_ExpectViewIfModelStateIsNotValid()
        {
            //Arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);
            controller.ModelState.AddModelError("", "mock error message");
            Models.Recipe testRecipe = new Models.Recipe
            {
                RecipeId = 55,
                Title = "Test Bad"
            };

            //act
            var result = (ViewResult)controller.Create(testRecipe);

            //assert
            Assert.AreEqual("Create", result.ViewName);
        }

        [TestMethod]
        public void Create_ExpectValidRecipeAdded()
        {
            //arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);
            Models.Recipe testRecipe = new Models.Recipe
            {
                RecipeId = 55,
                Title = "Test Good"
            };

            //act
            controller.Create(testRecipe);

            //Assert
            IEnumerable<Models.Recipe> recipes = context.Recipes;
            Assert.IsTrue(recipes.Contains(testRecipe));

        }

        [TestMethod]
        public void Create_ExpectViewOnRepositoryError()
        {
            //arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);
            Models.Recipe testRecipe = new Models.Recipe
            {
                RecipeId = 55,
                Title = "Test Good"
            };

            //act
            var result = (ViewResult)controller.Create(testRecipe);

            //assert
            Assert.AreEqual("Create", result.ViewName);
            ModelState modelState = result.ViewData.ModelState[""];
            Assert.IsNotNull(modelState);
            Assert.IsTrue(modelState.Errors.Any());
            Assert.AreEqual(new Exception(), modelState.Errors[0].Exception);

        }

        [TestMethod]
        public void Create_ExpectTitleRequired()
        {
            Assert.Fail();
        }
       
    }
}
