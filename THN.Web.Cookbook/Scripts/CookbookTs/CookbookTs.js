/// <reference path="Models.ts" />
/// <reference path="Services.ts" />
/// <reference path="Controllers.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />
var CookbookTs;
(function (CookbookTs) {
    var Routes = (function () {
        function Routes() {
        }
        Routes.configureRoutes = function ($routeProvider) {
            $routeProvider
                .when("/Home/CookbookTs", { controller: "CookbookTs.Controllers.RecipeController", templateUrl: "/Views/Home/CookbookTs.cshtml", controllerAs: "recipeController" });
            $routeProvider
                .otherwise({ redirectTo: "/Home/CookbookTs" });
        };
        Routes.$inject = ["$routeProvider"];
        return Routes;
    }());
    CookbookTs.Routes = Routes;
    var Config = (function () {
        function Config($routeProvider) {
            $routeProvider
                .when("/list", { templateUrl: "/Scripts/CookbookTs/views/RecipeList.html", controller: "CookbookTs.Controllers.ListController" })
                .when("/add", { templateUrl: "/Scripts/CookbookTs/views/AddRecipe.html", controller: "AddRecipeController" })
                .when("/edit/:id", { templateUrl: "/Scripts/CookbookTs/views/EditRecipe.html", controller: "EditRecipeController" })
                .otherwise({ redirectTo: '/list' });
        }
        return Config;
    }());
    CookbookTs.Config = Config;
    Config.$inject = ['$routeProvider'];
    var CatagoryHelper = (function () {
        function CatagoryHelper() {
        }
        CatagoryHelper.categories = [
            { label: 'Choose a category', value: -1 },
            { label: 'Bread', value: 0 },
            { label: 'Main Course', value: 1 },
            { label: 'Desert', value: 2 },
            { label: 'Side Dish', value: 3 },
            { label: 'Wine', value: 4 },
            { label: 'Misc.', value: 5 }
        ];
        CatagoryHelper.GetString = function (categoryNumber) {
            return this.categories[categoryNumber + 1].label;
        };
        return CatagoryHelper;
    }());
    CookbookTs.CatagoryHelper = CatagoryHelper;
    var app = angular.module('CookbookTs', ['ngRoute']);
    app.config(Config);
    app.service("CookbookTs.Services.RecipeService", ["$http", "$q", CookbookTs.Services.RecipeService]);
    app.controller("CookbookTs.Controllers.ListController", ["$scope", "CookbookTs.Services.RecipeService", CookbookTs.Controllers.ListController]);
})(CookbookTs || (CookbookTs = {}));
//# sourceMappingURL=CookbookTs.js.map