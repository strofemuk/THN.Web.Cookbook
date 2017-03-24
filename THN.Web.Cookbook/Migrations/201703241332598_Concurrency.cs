namespace THN.Web.Cookbook.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Concurrency : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Recipes", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Recipes", "RowVersion");
        }
    }
}
