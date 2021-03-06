﻿using System;
using System.ComponentModel.DataAnnotations;

namespace THN.Web.Cookbook.Models
{
    public class RecipeNote
    {
        public int RecipeNoteId { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        [Required(AllowEmptyStrings =false,ErrorMessage="The note's text is required.")]
        public string Text { get; set; }

        public NoteTypeEnum NoteType { get; set; }

        public int RecipeFk { get; set; }
    }
}
