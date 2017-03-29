using System;
using System.Data.Entity;

namespace THN.Web.Cookbook.Models
{
    public interface ICookbookContext : IDisposable
    { 
        DbSet<Recipe> Recipes { get; set; }

        DbSet<RecipeNote> RecipeNotes { get; set; }

        int SaveChanges();

        void SetModified(object entity);
    }
}