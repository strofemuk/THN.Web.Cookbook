namespace THN.Web.Cookbook.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddNoteTypeEnum : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RecipeNotes", "NoteType", c => c.Int(nullable: false));
            DropColumn("dbo.RecipeNotes", "NoteOnly");
            DropColumn("dbo.RecipeNotes", "DoAgain");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RecipeNotes", "DoAgain", c => c.Boolean(nullable: false));
            AddColumn("dbo.RecipeNotes", "NoteOnly", c => c.Boolean(nullable: false));
            DropColumn("dbo.RecipeNotes", "NoteType");
        }
    }
}
