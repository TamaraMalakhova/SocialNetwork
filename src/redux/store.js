import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {

    _state: {

        profilePage: {
            posts: [
                { id: 1, message: 'Hi everyone! It\'s my first post.', numberOfLikes: 8 },
                { id: 2, message: "How are you?", numberOfLikes: 15 },
                { id: 3, message: "What do you think about last events?", numberOfLikes: 21 },
                { id: 4, message: "What do you think about last events?", numberOfLikes: 3 },
                { id: 5, message: "Hi friends. Mail me.", numberOfLikes: 60 }
            ],
            newPostText: '',
        },

        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Ivan', avatar: 'https://i.pinimg.com/originals/0c/a9/e2/0ca9e28dcb12dc698cfd2beda6d6fa64.jpg' },
                { id: 2, name: 'Dasha', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSiK3oUwxo5Ke0RFVLixzpNsD5_YsiFA4zH8qCBvTEpNlbdVjFD&usqp=CAU' },
                { id: 3, name: 'Masha', avatar: 'https://trikky.ru/wp-content/blogs.dir/1/files/2018/10/20/IMG_2741.png' },
                { id: 4, name: 'Luda', avatar: 'https://klike.net/uploads/posts/2019-03/1551511784_4.jpg' },
                { id: 5, name: 'Aleksey', avatar: 'https://sun9-20.userapi.com/c631925/v631925003/1aa08/aFe1PkzOKOM.jpg?ava=1' },
                { id: 6, name: 'Mikhail', avatar: 'https://trikky.ru/wp-content/blogs.dir/1/files/2019/07/17/images-1.jpg' },
                { id: 7, name: 'Ksenia', avatar: 'https://i.pinimg.com/236x/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg' },
            ],
            messages: [
                { id: 1, message: "Hello!", from: "me" },
                { id: 2, message: "Hi! How are you?", from: "Ivan" },
                { id: 3, message: "I'm fine, thanks.", from: "me" },
            ],
            newMessageText: '',
        },

        sidebar: {
            friends: [
                { id: 1, name: 'Ivan', avatar: 'https://i.pinimg.com/originals/0c/a9/e2/0ca9e28dcb12dc698cfd2beda6d6fa64.jpg' },
                { id: 2, name: 'Dasha', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSiK3oUwxo5Ke0RFVLixzpNsD5_YsiFA4zH8qCBvTEpNlbdVjFD&usqp=CAU' },
                { id: 3, name: 'Masha', avatar: 'https://trikky.ru/wp-content/blogs.dir/1/files/2018/10/20/IMG_2741.png' },
                { id: 4, name: 'Luda', avatar: 'https://klike.net/uploads/posts/2019-03/1551511784_4.jpg' },
                { id: 5, name: 'Aleksey', avatar: 'https://sun9-20.userapi.com/c631925/v631925003/1aa08/aFe1PkzOKOM.jpg?ava=1' },
                { id: 6, name: 'Mikhail', avatar: 'https://trikky.ru/wp-content/blogs.dir/1/files/2019/07/17/images-1.jpg' },
                { id: 7, name: 'Ksenia', avatar: 'https://i.pinimg.com/236x/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg' },
            ]
        },
    },

    _callSubscriber() {
        console.log('State was changed');
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }

}

export default store;
