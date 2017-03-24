using System;
using System.ComponentModel.DataAnnotations;

namespace THN.Web.Cookbook.Models
{
    public enum NoteTypeEnum
    {
        NoteOnly=0,
        DoAgain=1,
        NotDoAgain=2
    }

    public class RecipeNote
    {
        public int RecipeNoteId { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        public string Text { get; set; }

        public NoteTypeEnum NoteType { get; set; }

        public int RecipeFk { get; set; }
    }
}
