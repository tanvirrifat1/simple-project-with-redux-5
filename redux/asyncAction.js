const fetch = require("node-fetch")
const { createStore, applyMiddleware } = require("redux")
const middleWare = require("redux-thunk")

const initialState = {
    loading: false,
    posts: [],
    error: ''
}

const fetPostsRequested = () => {
    return {
        type: 'posts/requested'
    }
}
const fetPostsSucceeded = (posts) => {
    return {
        type: 'posts/succeeded',
        payload: posts
    }
}
const fetPostsFailed = (error) => {
    return {
        type: 'posts/failed',
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'posts/requested':
            return {
                ...state,
                loading: true,
                error: ''
            }
        case 'posts/succeeded':
            return {
                ...state,
                loading: false,
                error: '',
                posts: action.payload
            }
        case 'posts/failed':
            return {
                ...state,
                loading: false,
                error: action.payload,
                posts: []
            }

        default:
            return state;
    }
}

const fetchPosts = () => {
    return async (dispatch) => {
        dispatch(fetPostsRequested())
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
            const posts = await res.json()

            dispatch(fetPostsSucceeded(posts))
        } catch (err) {
            dispatch(fetPostsFailed(err))
        }

    }
}

const store = createStore(reducer, applyMiddleware(middleWare.default))

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(fetchPosts())