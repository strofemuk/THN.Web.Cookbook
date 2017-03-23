using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace THN.Web.Cookbook.Models
{
    public class CookbookContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public CookbookContext() : base("name=CookbookContext")
        {
        }

        public System.Data.Entity.DbSet<THN.Web.Cookbook.Models.Recipe> Recipes { get; set; }

        public System.Data.Entity.DbSet<THN.Web.Cookbook.Models.RecipeNote> RecipeNotes { get; set; }
    
    }
}
