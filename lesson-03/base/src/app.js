async function getRecipes() {
    const response = await fetch('http://localhost:3030/data/recipes');
    const recipes = await response.json();

    return Object.values(recipes);
}

async function getRecipeById(id) {
    const response = await fetch('http://localhost:3030/data/details/' + id);
    const recipe = await response.json();

    return recipe;
}

function createRecipePreview(recipe) {
    const result = e('article', { className: 'preview', onClick: toggleCard },
        e('div', { className: 'title' }, e('h2', {}, recipe.name)),
        e('div', { className: 'small' }, e('img', { src: recipe.img })),
    );

    return result;

    async function toggleCard() {
        const fullRecipe = await getRecipeById(recipe._id);

        result.replaceWith(createRecipeCard(fullRecipe));
    }
}

function createRecipeCard(recipe) {
    const result = e('article', {},
        e('h2', {}, recipe.name),
        e('div', { className: 'band' },
            e('div', { className: 'thumb' }, e('img', { src: recipe.img })),
            e('div', { className: 'ingredients' },
                e('h3', {}, 'Ingredients:'),
                e('ul', {}, recipe.ingredients.map(i => e('li', {}, i))),
            )
        ),
        e('div', { className: 'description' },
            e('h3', {}, 'Preparation:'),
            recipe.steps.map(s => e('p', {}, s))
        ),
    );

    return result;
}

window.addEventListener('load', async () => {
    const main = document.querySelector('main');

    const recipes = await getRecipes();
    const cards = recipes.map(createRecipePreview);

    main.innerHTML = '';
    cards.forEach(c => main.appendChild(c));

    const token = localStorage.getItem('token')
    const userDiv = document.getElementById('user')
    const guestDiv = document.getElementById('guest')
    if (token !== null) {
        userDiv.style.display = 'block';
        guestDiv.style.display = 'none';
    } else {
        userDiv.style.display = 'none';
        guestDiv.style.display = 'block';
    }
});

function onLogOut() {
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', async () => {
        fetch('http:/localhost:3030/users/logout', {
            method: "GET",
            headers: {
                "X-Authorization": localStorage.getItem('token')
            }

        })
            .then(res => {
                if (!res.status === 200) {
                    throw new Error('Error');
                }

                return res.json()

            })
            .then((data => {
                localStorage.removeItem('token');
                window.location.pathname = '/lesson-3/base/index.html'
            }))
            .catch(err => {
                console.log(err)
            })
    })
}

function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}