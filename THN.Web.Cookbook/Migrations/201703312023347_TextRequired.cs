namespace THN.Web.Cookbook.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Relations : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.RecipeNotes", "Text", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.RecipeNotes", "Text", c => c.String());
        }
    }
}
