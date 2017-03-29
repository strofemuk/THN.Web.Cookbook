using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace THN.Web.Cookbook.Test
{
    [TestClass]
    public class MVC : TestBase
    {
        [TestMethod]
        public void Index_ExpectIndexViewWithData()
        {
            //Arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);

            //Act
            ViewResult result =(ViewResult)controller.Index(null, null, null);
            IEnumerable<Models.Recipe> model = result.ViewData.Model as IEnumerable<Models.Recipe>;

            //assert
            Assert.IsNotNull(result);
            Assert.IsNotNull(model);
            Assert.AreEqual("Index", result.ViewName);
            Assert.AreEqual(2, model.Count());
        }

        #region Create testing

        [TestMethod]
        public void Create_ExpectCreateViewIfModelStateIsNotValid()
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
        public void Create_ExpectIndexViewIfModelStateIsValid()
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
            ActionResult result = controller.Create(testRecipe);

            //assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(RedirectToRouteResult));
            RedirectToRouteResult routeResult = result as RedirectToRouteResult;
            Assert.AreEqual(routeResult.RouteValues["action"], "Index");
        }

        #endregion

        #region Edit Testing

        [TestMethod]
        public void Edit_Get_ExpectEditView()
        {
            //Arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);

            //act
            ViewResult result = controller.Edit(1) as ViewResult;

            //assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Edit", result.ViewName);
        }

        [TestMethod]
        public void Edit_Get_ExpectRecipe()
        {
            //Arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);

            //act
            ViewResult result = controller.Edit(1) as ViewResult;
            Models.Recipe foundRecipe = result.Model as Models.Recipe;

            //assert
            //Test Recipe #1
            Assert.IsNotNull(result);
            Assert.AreEqual("Test Recipe #1", foundRecipe.Title);
        }

        [TestMethod]
        public void Edit_Get_ExpectBadRequestOnIdNull()
        {
            //arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);
            int? id = null;

            //act
            HttpStatusCodeResult result = controller.Edit(id) as HttpStatusCodeResult;

            //assert
            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.BadRequest, result.StatusCode);
        }

        [TestMethod]
        public void Edit_Get_ExpectNotFound()
        {
            //arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);
            int? id = 999999;

            //act
            HttpNotFoundResult result = controller.Edit(id) as HttpNotFoundResult;

            //assert
            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.NotFound, result.StatusCode);
        }

        [TestMethod]
        public void Edit_Post_ExpectRecipeChanged()
        {
            //arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);
            Models.Recipe editedRecipe;


            //act
            ViewResult result = controller.Edit(1) as ViewResult;
            editedRecipe = result.Model as Models.Recipe;
            editedRecipe.Title = "Edited";
            controller.Edit(editedRecipe);
            IEnumerable<Models.Recipe> recipes = context.Recipes;

            //assert
            Assert.IsTrue(recipes.Contains(editedRecipe));
        }

        [TestMethod]
        public void Edit_Post_ExpectEditViewIfModelStateIsNotValid()
        {
            //arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);
            controller.ModelState.AddModelError("", "mock error message");
            Models.Recipe badRecipe = new Models.Recipe
            {
                RecipeId = 55,
                Title = "Bad"
            };

            //act
            ViewResult result = controller.Edit(badRecipe) as ViewResult;

            //assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Edit", result.ViewName);
        }

        [TestMethod]
        public void Edit_Post_ExpectIndexViewIfModelStateIsValid()
        {
            //arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);
            Models.Recipe badRecipe = new Models.Recipe
            {
                RecipeId = 1,
                Title = "Good"
            };

            //act
            ActionResult result = controller.Edit(badRecipe);

            //assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(RedirectToRouteResult));
            RedirectToRouteResult routeResult = result as RedirectToRouteResult;
            Assert.AreEqual(routeResult.RouteValues["action"], "Index");
        }

        #endregion

        #region Delete testing

        [TestMethod]
        public void Delete_Get_ExpectNotFound()
        {
            //arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);
            int? id = 999999;

            //act
            HttpNotFoundResult result = controller.Delete(id) as HttpNotFoundResult;

            //assert
            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.NotFound, result.StatusCode);
        }

        [TestMethod]
        public void Delete_Get_ExpectBadRequestWhenIdNull()
        {
            //arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);
            int? id = null;

            //act
            HttpStatusCodeResult result = controller.Delete(id) as HttpStatusCodeResult;

            //assert
            Assert.IsNotNull(result);
            Assert.AreEqual((int)HttpStatusCode.BadRequest, result.StatusCode);
        }

        [TestMethod]
        public void Delete_Get_ExpectDeleteView()
        {
            //arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);

            //act
            ViewResult result = controller.Delete(1) as ViewResult;

            //assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Delete", result.ViewName);
        }

        [TestMethod]
        public void Delete_Post_ExpectRedirectToIndex()
        {
            //arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);

            //act
            ActionResult result = controller.DeleteConfirmed(1);

            //assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(RedirectToRouteResult));
            RedirectToRouteResult routeResult = result as RedirectToRouteResult;
            Assert.AreEqual(routeResult.RouteValues["action"], "Index");
        }

        [TestMethod]
        public void Delete_Post_ExpectRecipeRemoved()
        {
            //arrange
            Models.ICookbookContext context = AddTestData(new TestContext());
            Controllers.CookbookMVCController controller = new Controllers.CookbookMVCController(context);
            IEnumerable<Models.Recipe> recipes = context.Recipes;
            Models.Recipe condemnedRecipe = recipes.Where(r => r.RecipeId == 1).FirstOrDefault();

            //act
            controller.DeleteConfirmed(condemnedRecipe.RecipeId);

            //assert
            Assert.IsTrue(!recipes.Contains(condemnedRecipe));
        }

        #endregion 

        #region Validation Testing
        [TestMethod]
        public void Validation_ExpectTitleRequired()
        {
            //arrange
            Models.Recipe testRecipe = new Models.Recipe
            {
                RecipeId = 55,
                Title=""
            };

            ValidationContext validatoinContext = new ValidationContext(testRecipe, null, null);
            List<ValidationResult> validationResults = new List<ValidationResult>();

            bool result = Validator.TryValidateObject(testRecipe, validatoinContext, validationResults, true);


            Assert.IsFalse(result);
            Assert.AreEqual(validationResults[0].ErrorMessage, "Title is required.");

        }

        [TestMethod]
        public void Validation_ExpectNoteTextRequired()
        {
            //arrange
            Models.RecipeNote testNote = new Models.RecipeNote
            {
                RecipeNoteId = 55,
                Text = ""
            };


            ValidationContext validatoinContext = new ValidationContext(testNote, null, null);
            List<ValidationResult> validationResults = new List<ValidationResult>();

            bool result = Validator.TryValidateObject(testNote, validatoinContext, validationResults, true);


            Assert.IsFalse(result);
            Assert.AreEqual(validationResults[0].ErrorMessage, "The note's text is required.");
        }
        #endregion 
    }
}
