using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace THN.Web.Cookbook.Models
{
    public class RecipeListViewModel
    {
        public int RecipeId { get; set; }
        public string Title { get; set; }
        public CategoryEnum Category { get; set; }
        public string LastNote { get; set; }
        public NoteTypeEnum NoteType { get; set; }
    }
}