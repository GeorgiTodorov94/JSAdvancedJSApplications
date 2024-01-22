async function attachEvents() {
    const baseURI = "http://localhost:3030/jsonstore/blog/";
    const postsEndPoint = 'posts/';
    const commentsEndPoint = 'comments/';

    document.getElementById('btnLoadPosts').addEventListener('click', createOptions);
    document.getElementById('btnViewPost').addEventListener('click', loadPostData);
    const selectBtnRef = document.getElementById('posts');
    const titleRef = document.getElementById("post-title");
    const titleDescription = document.getElementById('post-body');
    const postCommentsRef = document.getElementById('post-comments')

    async function createOptions() {
        selectBtnRef.innerHTML = '';
        const posts = await getAllPosts();

        Object.entries(posts).forEach(el => {
            const optionEl = generateDomElements('option', el[1].title, el[1].id);
            selectBtnRef.appendChild(optionEl);
        })
    }



    async function loadPostData(e) {
        const postId = selectBtnRef.value;
        const post = await getPostId(postId);
        titleRef.textContent = post.title;
        titleDescription.textContent = post.body
        loadComments(postId);

    }

    async function loadComments(postId) {
        postCommentsRef.innerHTML = '';
        const comments = await getAllComments(postId)
        const currentComments = Object.values(comments).filter(x => x.postId === postId);
        currentComments.forEach(comment => {
            const li = generateDomElements('li', comment.text);
            postCommentsRef.appendChild(li);
        })
    }

    async function getAllComments(id) {
        const response = await fetch(baseURI + commentsEndPoint);
        const data = await response.json();
        return data;

    }

    async function getPostId(id) {
        const response = await fetch(baseURI + postsEndPoint + id);
        const data = await response.json();

        return data;
    }

    async function getAllPosts() {
        const response = await fetch(baseURI + postsEndPoint)
        const data = await response.json()
        return data;
    }


    function generateDomElements(type, content, id, classes, style) {
        const el = document.createElement(type);
        if (type === 'input' && type === 'textarea') {
            el.value = content;
        } else if (type === 'option') {
            el.value = id;
            el.textContent = content
        } else {
            el.textContent = content;
        }
        return el;
    }
}
attachEvents();