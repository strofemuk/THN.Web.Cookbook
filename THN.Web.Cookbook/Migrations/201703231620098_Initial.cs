namespace THN.Web.Cookbook.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RecipeNotes",
                c => new
                    {
                        NoteId = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        Text = c.String(),
                        NoteOnly = c.Boolean(nullable: false),
                        DoAgain = c.Boolean(nullable: false),
                        RecipeFk = c.Int(nullable: false),
                        Recipe_RecipeId = c.Int(),
                    })
                .PrimaryKey(t => t.NoteId)
                .ForeignKey("dbo.Recipes", t => t.Recipe_RecipeId)
                .Index(t => t.Recipe_RecipeId);
            
            CreateTable(
                "dbo.Recipes",
                c => new
                    {
                        RecipeId = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        Source = c.String(),
                        Category = c.Int(nullable: false),
                        Instructions = c.String(),
                    })
                .PrimaryKey(t => t.RecipeId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RecipeNotes", "Recipe_RecipeId", "dbo.Recipes");
            DropIndex("dbo.RecipeNotes", new[] { "Recipe_RecipeId" });
            DropTable("dbo.Recipes");
            DropTable("dbo.RecipeNotes");
        }
    }
}
