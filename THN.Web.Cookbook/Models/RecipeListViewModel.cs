using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace THN.Web.Cookbook.Models
{
    public class RecipeListViewModel
    {
        public int RecipeId { get; set; }

        [Required]
        public string Title { get; set; }

        public CategoryEnum Category { get; set; }
    }
}