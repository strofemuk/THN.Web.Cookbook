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

            if (recipe.category < 0 || recipe.category > 5) recipe.category = 5;

            self.http.post('/api/Recipes/', recipe)
                .then(function (result) {
                    deferred.resolve();
                }, function (error) {
                    if (error.data.modelState) {
                        deferred.reject("The server caught a validation error.");
                    }
                    if (error.data.message) {
                        deferred.reject(error.data.message);
                    } else {
                        deferred.reject(error.statusText);
                    }
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
                        if (error.data.message) {
                            deferred.reject(error.data.message);
                        } else {
                            deferred.reject(error.statusText);
                        }
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
                    if (error.data.message) {
                        deferred.reject(error.data.message);
                    } else {
                        deferred.reject(error.statusText);
                    }
                });
            return deferred.promise;
        };

        updateRecipe = function (recipe: Models.RecipeAndNotes): ng.IPromise<any> {
            var self = this;

            if (recipe.category < 0 || recipe.category > 5) recipe.category = 5;

            var deferred = self.q.defer();
            //return this.http.put('/api/Recipes/' + recipe.recipeId, recipe);
            self.http.put('/api/Recipes/' + recipe.recipeId, recipe)
                .then(function () {
                    deferred.resolve();
                }, function (error) {
                    if (error.data.message) {
                        deferred.reject(error.data.message);
                    } else {
                        deferred.reject(error.statusText);
                    }
                });
            return deferred.promise;
        };

        deleteRecipe = function (condemnedId) {
            var self = this;

            var deferred = self.q.defer();
            self.http.delete('/api/Recipes/' + condemnedId)
                .then(function () {
                    deferred.resolve();
                }, function (error) {
                    if (error.data.message) {
                        deferred.reject(error.data.message);
                    } else {
                        deferred.reject(error.statusText);
                    }
                });
            return deferred.promise
        };

        addNote = function (note) {
            var self = this;

            var deferred = self.q.defer();
            self.http.post('/api/RecipeNotes/', note)
                .then(function () {
                    deferred.resolve();
                }, function (error) {
                    if (error.data.message) {
                        deferred.reject(error.data.message);
                    } else {
                        deferred.reject(error.statusText);
                    }
                });
            return deferred.promise
        };

        getNotes = function (id) {
            var self = this;

            var deferred = self.q.defer();
            self.http.get('/api/RecipeNotes/' + id)
                .then(function (result: any) {
                    deferred.resolve(result.data);
                }, function (error) {
                    if (error.data.message) {
                        deferred.reject(error.data.message);
                    } else {
                        deferred.reject(error.statusText);
                    }
                });
            return deferred.promise
            
        };
    }
} 