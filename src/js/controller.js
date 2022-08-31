import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

///////////////////////////////////////
if (module.hot) {
    module.hot.accept();
}

const controlRecipes = async() => {
    try {
        const id = window.location.hash.slice(1);

        if (!id) return;
        recipeView.renderSpinner();

        // 1) Loading recipe
        await model.loadRecipe(id);

        // 2. Rendering recipe
        recipeView.render(model.state.recipe);
    } catch (err) {
        recipeView.renderError();
    }
};
const controlSearchResults = async() => {
    try {
        resultView.renderSpinner();

        // 1) Get search query
        const query = searchView.getQuery();
        if (!query) return;

        // 2) Load search results
        await model.loadSearchResults(query);

        // 3) Render results
        //resultView.render(model.state.search.results);
        resultView.render(model.getSearchResultPage(2));
    } catch (err) {
        console.log(err);
    }
};

const init = () => {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHanlderSearch(controlSearchResults);
};

init();