/// <reference path="Models.ts" />
var CookbookTs;
(function (CookbookTs) {
    var Services;
    (function (Services) {
        var RecipeService = (function () {
            function RecipeService($http, $q) {
                this.createRecipe = function (recipe) {
                    var self = this;
                    var deferred = self.q.defer();
                    if (recipe.category < 0 || recipe.category > 5)
                        recipe.category = 5;
                    self.http.post('/api/Recipes/', recipe)
                        .then(function (result) {
                        deferred.resolve();
                    }, function (error) {
                        if (error.data.modelState) {
                            deferred.reject("The server caught a validation error.");
                        }
                        if (error.data.message) {
                            deferred.reject(error.data.message);
                        }
                        else {
                            deferred.reject(error.statusText);
                        }
                    });
                    return deferred.promise;
                };
                this.readRecipes = function (fetchFromService) {
                    var self = this;
                    if (fetchFromService) {
                        return getRecipesFromService();
                    }
                    else {
                        if (self.recipeListCache !== undefined) {
                            return self.recipeListCache;
                        }
                        else {
                            return getRecipesFromService();
                        }
                    }
                    function getRecipesFromService() {
                        var deferred = self.q.defer();
                        self.http.get('/api/recipes/')
                            .then(function (result) {
                            self.recipeListCache = new Array();
                            for (var _i = 0, _a = result.data; _i < _a.length; _i++) {
                                var item = _a[_i];
                                var listItem = {
                                    title: '',
                                    recipeId: 0,
                                    category: -1,
                                    categoryText: ''
                                };
                                listItem.title = item.title;
                                listItem.recipeId = item.recipeId;
                                listItem.category = item.category;
                                listItem.categoryText = CookbookTs.CatagoryHelper.GetString(item.category);
                                self.recipeListCache.push(listItem);
                            }
                            deferred.resolve(self.recipeListCache);
                        }, function (error) {
                            if (error.data.message) {
                                deferred.reject(error.data.message);
                            }
                            else {
                                deferred.reject(error.statusText);
                            }
                        });
                        return deferred.promise;
                    }
                };
                this.readRecipe = function (id) {
                    var self = this;
                    var deferred = self.q.defer();
                    self.http.get('/api/Recipes/' + id)
                        .then(function (result) {
                        deferred.resolve(result.data);
                    }, function (error) {
                        if (error.data.message) {
                            deferred.reject(error.data.message);
                        }
                        else {
                            deferred.reject(error.statusText);
                        }
                    });
                    return deferred.promise;
                };
                this.updateRecipe = function (recipe) {
                    var self = this;
                    if (recipe.category < 0 || recipe.category > 5)
                        recipe.category = 5;
                    var deferred = self.q.defer();
                    //return this.http.put('/api/Recipes/' + recipe.recipeId, recipe);
                    self.http.put('/api/Recipes/' + recipe.recipeId, recipe)
                        .then(function () {
                        deferred.resolve();
                    }, function (error) {
                        if (error.data.message) {
                            deferred.reject(error.data.message);
                        }
                        else {
                            deferred.reject(error.statusText);
                        }
                    });
                    return deferred.promise;
                };
                this.deleteRecipe = function (condemnedId) {
                    var self = this;
                    var deferred = self.q.defer();
                    self.http.delete('/api/Recipes/' + condemnedId)
                        .then(function () {
                        deferred.resolve();
                    }, function (error) {
                        if (error.data.message) {
                            deferred.reject(error.data.message);
                        }
                        else {
                            deferred.reject(error.statusText);
                        }
                    });
                    return deferred.promise;
                };
                this.addNote = function (note) {
                    var self = this;
                    var deferred = self.q.defer();
                    self.http.post('/api/RecipeNotes/', note)
                        .then(function () {
                        deferred.resolve();
                    }, function (error) {
                        if (error.data.message) {
                            deferred.reject(error.data.message);
                        }
                        else {
                            deferred.reject(error.statusText);
                        }
                    });
                    return deferred.promise;
                };
                this.getNotes = function (id) {
                    var self = this;
                    var deferred = self.q.defer();
                    self.http.get('/api/RecipeNotes/' + id)
                        .then(function (result) {
                        deferred.resolve(result.data);
                    }, function (error) {
                        if (error.data.message) {
                            deferred.reject(error.data.message);
                        }
                        else {
                            deferred.reject(error.statusText);
                        }
                    });
                    return deferred.promise;
                };
                this.http = $http;
                this.q = $q;
            }
            RecipeService.$inject = ["$http"];
            return RecipeService;
        }());
        Services.RecipeService = RecipeService;
    })(Services = CookbookTs.Services || (CookbookTs.Services = {}));
})(CookbookTs || (CookbookTs = {}));
//# sourceMappingURL=Services.js.map