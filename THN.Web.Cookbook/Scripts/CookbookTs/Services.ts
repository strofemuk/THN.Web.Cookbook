/// <reference path="Models.ts" />

module CookbookTs.Services {
    export class RecipeService {

        private http: ng.IHttpService;
        private q: ng.IQService;

        private recipeListCache: Array<Models.RecipeListItem>;

        static $inject = ["$http"];

        constructor($http: ng.IHttpService, $q: ng.IQService) {
            this.http = $http;
            this.q = $q;
        }

        createRecipe = function (recipe: Models.Recipe): ng.IPromise<any> {
            var self = this;
            var deferred = self.q.defer();

            self.http.post('/api/Recipes/', recipe)
                .then(function (result) {
                    deferred.resolve();
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        readRecipes = function (fetchFromService?: boolean): ng.IPromise<any> {
            var self = this;

            if (fetchFromService) {
                return getRecipesFromService();
            } else {
                if (self.recipeListCache !== undefined) {
                    return self.recipeListCache;
                } else {
                    return getRecipesFromService();
                }
            }

            function getRecipesFromService(): ng.IPromise<any> {
                var deferred = self.q.defer();

                self.http.get('/api/recipes/')
                    .then(function (result: any) {
                        self.recipeListCache = new Array<Models.RecipeListItem>();
                        for (var item of result.data) {
                            var listItem: Models.RecipeListItem = {
                                title: '',
                                recipeId: 0,
                                category: -1,
                                categoryText: ''
                            };
                            listItem.title = item.title;
                            listItem.recipeId= item.recipeId;
                            listItem.category = item.category;
                            listItem.categoryText = CookbookTs.CatagoryHelper.GetString(item.category);

                            self.recipeListCache.push(listItem);
                        }
                        deferred.resolve(self.recipeListCache);
                    },
                    function (error) {
                        deferred.reject(error);
                    });
                return deferred.promise;
            }
        };

        readRecipe = function (id: string): ng.IPromise<any> {
            var self = this;

            var deferred = self.q.defer();
            self.http.get('/api/Recipes/' + id)
                .then(function (result: any) {
                    deferred.resolve(result.data);
                }, function (error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        };

        updateRecipe = function (recipe : Models.RecipeAndNotes) {
            return this.http.put('/api/Recipes/' + recipe.recipeId, recipe);
        };

        deleteRecipe = function (condemnedId) {
            return this.http.delete('/api/Recipes/' + condemnedId);
        };

        addNote = function (note) {
            return this.http.post('/api/RecipeNotes/', note);
        };

        getNotes = function (id) {
            return this.http.get('/api/RecipeNotes/' + id);
        };
    }
} 