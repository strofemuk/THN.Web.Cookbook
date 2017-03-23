﻿using System;
using System.ComponentModel.DataAnnotations;

namespace THN.Web.Cookbook.Models
{
    public class RecipeNote
    {
        public int RecipeNoteId { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; }

        public string Text { get; set; }

        public bool NoteOnly { get; set; }

        public bool DoAgain { get; set; }

        public int RecipeFk { get; set; }
    }
}