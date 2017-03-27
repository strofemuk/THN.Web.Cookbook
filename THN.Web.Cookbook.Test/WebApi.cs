using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using THN.Web.Cookbook;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;

namespace THN.Web.Cookbook.Test
{
    [TestClass]
    public class WebApi
    {
        [TestClass]
        public class Recipes : MocContext
        {
    
            
            [TestMethod]
            public void GetAll()
            {
                var controller = new Controllers.RecipesController(mocContext.Object);
                var result = controller.GetRecipes();

                Assert.IsNotNull(result);
                Assert.AreEqual(2, result.Count());

            }

            [TestMethod]
            public void Get()
            {
                var controller = new Controllers.RecipesController(mocContext.Object);
                var result = controller.GetRecipe(1);

                Assert.IsNotNull(result);
            }

            [TestMethod]
            public void Post()
            {
                Assert.Fail();
            }

            [TestMethod]
            public void Put()
            {
                Assert.Fail();
            }

            [TestMethod]
            public void Delete()
            {
                Assert.Fail();
            }

        }
    }
}
