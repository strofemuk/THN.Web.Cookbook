using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace THN.Web.Cookbook.Models
{
    public enum CategoryEnum
    {
        Bread,
        [Display(Name = "Main Course")]
        Main_Course,
        Desert,
        [Display(Name = "Side Dish")]
        Side_Dish,
        Wine,
        Misc
    }

    public class Recipe : RecipeListViewModel
    {
        public string Source { get; set; }

        public string Instructions { get; set; }

        public virtual ICollection<RecipeNote> Notes { get; set; }

        [Timestamp]
        public byte[] RowVersion { get; set; }
    }


}
