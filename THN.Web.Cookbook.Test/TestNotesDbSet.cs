using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using THN.Web.Cookbook.Models;

namespace THN.Web.Cookbook.Test
{
    class TestNotesDbSet : TestDbSet<RecipeNote>
    {
        public override RecipeNote Find(params object[] keyValues)
        {
            return this.SingleOrDefault(note => note.RecipeNoteId == (int)keyValues.Single());
        }
    }
}
