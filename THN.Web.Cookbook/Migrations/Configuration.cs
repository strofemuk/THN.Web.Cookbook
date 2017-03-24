namespace THN.Web.Cookbook.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using THN.Web.Cookbook.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<THN.Web.Cookbook.Models.CookbookContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(THN.Web.Cookbook.Models.CookbookContext context)
        {
            context.Recipes.AddOrUpdate(r => (int)r.RecipeId,
                new Recipe
                    {
                        RecipeId = 1,
                        Title = "Yummy Chicken",
                        Source = "Imagination",
                        Category = CategoryEnum.Main_Course,
                        Instructions = "Rub chicken with olive oil and dipping spices.  Bake at 350 for 20 minutes.  Yum."
                    },
                    new Recipe
                    {
                        RecipeId = 1,
                        Title = "Green Bean Casserole",
                        Source = "Internet",
                        Category = CategoryEnum.Side_Dish,
                        Instructions = "1 can of green beans. 1 can of cream of mushroom soup."
                    }
                );

            context.SaveChanges();

            context.RecipeNotes.AddOrUpdate( rn => rn.RecipeNoteId,
                new RecipeNote 
                    { 
                        RecipeNoteId=1,
                        RecipeFk=1,
                        Date=DateTime.Now,
                        Text="Very tasty.",
                        NoteOnly = false,
                        DoAgain = true
                    }
                );

            context.SaveChanges();
        }
    }
}
