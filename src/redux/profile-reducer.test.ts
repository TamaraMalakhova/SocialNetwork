import profileReducer, { actions } from './profile-reducer';

let state = {
    posts: [
        { id: 1, message: 'Hi everyone! It\'s my first post.', numberOfLikes: 8 },
        { id: 2, message: "How are you?", numberOfLikes: 15 },
        { id: 3, message: "What do you think about last events?", numberOfLikes: 21 },
        { id: 4, message: "What do you think about last events?", numberOfLikes: 3 },
        { id: 5, message: "Hi friends. Mail me.", numberOfLikes: 60 }
    ],
    profile: null,
    status: ''
};

it('length of posts should be incremented', () => {
    // 1. test data
    let action = actions.addPostActionCreator('my first test of action creator');
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(5);
});

it('message of new post should be correct', () => {
    // 1. test data
    let action = actions.addPostActionCreator('my first test of action creator');
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts[5].message).toBe('my first test of action creator');
});

it('after deleting length of messages should be decremented', () => {
    // 1. test data
    let action = actions.deletePost(1);
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(4);
});

it('after deleting length of messages shouldn\'t be decremented if id is incorrect', () => {
    // 1. test data
    let action = actions.deletePost(1000);
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.posts.length).toBe(5);
});