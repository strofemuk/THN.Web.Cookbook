module CookbookTs.Models {
    export class RecipeListItem {
        recipeId: number;
        title: string;
        category: number;
        categoryText: string;
    }

    export class Recipe extends RecipeListItem {
        rowVersion: string;
        source: string;
        instructions: string;
    }

    export class RecipeAndNotes extends Recipe {
        notes: Array<RecipeNote>;
    }

    export class RecipeNote {
        noteType: number;
        text: string;
        date: string;
        recipeFk: number;
    }


    export interface IRecipeListScope extends ng.IScope {
        theRecipeList: Array<RecipeListItem>;
        sortColumn: string;
        sortAsc: boolean;
        searchString: string;
    }

    export interface IScopeWithRecipe extends ng.IScope {
        recipe: Models.Recipe;
    }

    export interface IAddRecipeScope extends IScopeWithRecipe {
        categories: Array<any>;
        saveRecipe: Function;
    }

    export interface IScopeWithRecipeAndNotes {
        recipe: Models.RecipeAndNotes;
    }

    export interface IEditRecipeScope extends IScopeWithRecipeAndNotes {
        categories : Array<any>
        updateRecipe: Function;
        addNote: Function;
        newNote: Models.RecipeNote;
    }

    export interface IDeleteRecipeScope extends IScopeWithRecipe {
        deleteRecipe: Function;
    }

    export interface IRecipeRouteParams extends ng.route.IRouteParamsService {
        id: string;
    }
} 