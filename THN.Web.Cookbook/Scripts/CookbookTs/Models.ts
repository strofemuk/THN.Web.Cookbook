module CookbookTs.Models {
    export class RecipeListItem {
        recipeId: number;
        title: string;
        category: string;
    }

    export class RecipeNote {
        noteType: number;
        text: string;
        date: string;
        recipeFk: number;
    }

    export class Recipe extends RecipeListItem {
        rowVersion: string;
        source: string;
        instructions: string;
        notes: Array<RecipeNote>;
    }

    export interface RecipeListScope extends ng.IScope {
        recipes: Array<RecipeListItem>;
    }

    export interface RecipeScope extends ng.IScope {
        addMode: boolean;
        editMode: boolean;
        printMode: boolean;
        showNotes: boolean;

        searchTitle: '';
        sortType: string;
        sortAsc: boolean;


        dialog: HTMLElement;
        error: string;

        currentRecipe: Recipe;
        currentNote: RecipeNote;

        categories: Object;
    }
} 