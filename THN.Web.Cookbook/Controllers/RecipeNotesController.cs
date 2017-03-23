using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using THN.Web.Cookbook.Models;

namespace THN.Web.Cookbook.Controllers
{
    public class RecipeNotesController : ApiController
    {
        private CookbookContext db = new CookbookContext();

        // GET: api/RecipeNotes
        public IQueryable<RecipeNote> GetRecipeNotes()
        {
            return db.RecipeNotes;
        }

        // GET: api/RecipeNotes/5
        [ResponseType(typeof(RecipeNote))]
        public IHttpActionResult GetRecipeNote(int id)
        {
            RecipeNote recipeNote = db.RecipeNotes.Find(id);
            if (recipeNote == null)
            {
                return NotFound();
            }

            return Ok(recipeNote);
        }

        // PUT: api/RecipeNotes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRecipeNote(int id, RecipeNote recipeNote)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != recipeNote.NoteId)
            {
                return BadRequest();
            }

            db.Entry(recipeNote).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipeNoteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/RecipeNotes
        [ResponseType(typeof(RecipeNote))]
        public IHttpActionResult PostRecipeNote(RecipeNote recipeNote)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RecipeNotes.Add(recipeNote);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = recipeNote.NoteId }, recipeNote);
        }

        // DELETE: api/RecipeNotes/5
        [ResponseType(typeof(RecipeNote))]
        public IHttpActionResult DeleteRecipeNote(int id)
        {
            RecipeNote recipeNote = db.RecipeNotes.Find(id);
            if (recipeNote == null)
            {
                return NotFound();
            }

            db.RecipeNotes.Remove(recipeNote);
            db.SaveChanges();

            return Ok(recipeNote);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RecipeNoteExists(int id)
        {
            return db.RecipeNotes.Count(e => e.NoteId == id) > 0;
        }
    }
}