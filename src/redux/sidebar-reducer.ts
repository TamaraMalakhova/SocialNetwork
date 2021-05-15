type FriendType = {
    id: number
    name: string
    avatar: string
}

let initialState = {
    friends: [
        { id: 1, name: 'Ivan', avatar: 'https://i.pinimg.com/originals/0c/a9/e2/0ca9e28dcb12dc698cfd2beda6d6fa64.jpg' },
        { id: 2, name: 'Dasha', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSiK3oUwxo5Ke0RFVLixzpNsD5_YsiFA4zH8qCBvTEpNlbdVjFD&usqp=CAU' },
        { id: 3, name: 'Masha', avatar: 'https://trikky.ru/wp-content/blogs.dir/1/files/2018/10/20/IMG_2741.png' },
        { id: 4, name: 'Luda', avatar: 'https://klike.net/uploads/posts/2019-03/1551511784_4.jpg' },
        { id: 5, name: 'Aleksey', avatar: 'https://sun9-20.userapi.com/c631925/v631925003/1aa08/aFe1PkzOKOM.jpg?ava=1' },
        { id: 6, name: 'Mikhail', avatar: 'https://trikky.ru/wp-content/blogs.dir/1/files/2019/07/17/images-1.jpg' },
        { id: 7, name: 'Ksenia', avatar: 'https://i.pinimg.com/236x/2d/0e/41/2d0e419c310033945063c6c9884b2725.jpg' },
    ] as Array<FriendType>
};

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state;
}

export default sidebarReducer;