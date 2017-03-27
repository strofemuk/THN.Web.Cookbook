using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace THN.Web.Cookbook.Models
{


    public class Recipe : RecipeListViewModel
    {
        public string Source { get; set; }

        public string Instructions { get; set; }

        public virtual ICollection<RecipeNote> Notes { get; set; }

        [HiddenInput(DisplayValue=false)]
        [Timestamp]
        public byte[] RowVersion { get; set; }
    }


}
