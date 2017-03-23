namespace THN.Web.Cookbook.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveKeyAttribute : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.RecipeNotes");
            DropColumn("dbo.RecipeNotes", "NoteId");

            AddColumn("dbo.RecipeNotes", "RecipeNoteId", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.RecipeNotes", "RecipeNoteId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RecipeNotes", "NoteId", c => c.Int(nullable: false, identity: true));
            DropPrimaryKey("dbo.RecipeNotes");
            DropColumn("dbo.RecipeNotes", "RecipeNoteId");
            AddPrimaryKey("dbo.RecipeNotes", "NoteId");
        }
    }
}
