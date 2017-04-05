/// <reference path="Models.ts" />
/// <reference path="Services.ts" />
/// <reference path="Controllers.ts" />

/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/angularjs/angular-route.d.ts" />

module CookbookTs {
    export class Routes {

        static $inject = ["$routeProvider"];

        static configureRoutes($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when("/Home/CookbookTs", { controller: "CookbookTs.Controllers.RecipeController", templateUrl: "/Views/Home/CookbookTs.cshtml", controllerAs: "recipeController" });
            $routeProvider
                .otherwise({ redirectTo: "/Home/CookbookTs" });
        }
    }

    export class Config {
        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when("/list", { templateUrl: "/Scripts/CookbookTs/views/RecipeList.html", controller: "CookbookTs.Controllers.ListController" })
                .when("/add", { templateUrl: "/Scripts/CookbookTs/views/AddRecipe.html", controller: "AddRecipeController" })
                .when("/edit/:id", { templateUrl: "/Scripts/CookbookTs/views/EditRecipe.html", controller: "EditRecipeController" })
                .otherwise({ redirectTo: '/list' });
        }
    }
    Config.$inject = ['$routeProvider'];

    export class CatagoryHelper {
        static categories = [
            { label: 'Choose a category', value: -1 },
            { label: 'Bread', value: 0 },
            { label: 'Main Course', value: 1 },
            { label: 'Desert', value: 2 },
            { label: 'Side Dish', value: 3 },
            { label: 'Wine', value: 4 },
            { label: 'Misc.', value: 5 }
        ];

        static GetString = function (categoryNumber: number): string {
            return this.categories[categoryNumber].label;
        }
    }


    var app = angular.module('CookbookTs', ['ngRoute']);
    app.config(Config);
    app.service("CookbookTs.Services.RecipeService", ["$http", "$q", Services.RecipeService]);
    app.controller("CookbookTs.Controllers.ListController", ["$scope", "CookbookTs.Services.RecipeService", Controllers.ListController]);
}
