import usersReducer, { actions, InitialStateType } from './users-reducer';

let state: InitialStateType 

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: 'Tamara',
        followed: false,
        photos: {
          small: null,
          large: null
        },
        status: 'Status 1'
      },
  
      {
        id: 1,
        name: 'Daria',
        followed: false,
        photos: {
          small: null,
          large: null
        },
        status: 'Status 2'
      },
  
      {
        id: 2,
        name: 'Mikhail',
        followed: true,
        photos: {
          small: null,
          large: null
        },
        status: 'Status 3'
      },
  
      {
        id: 3,
        name: 'Aleksei',
        followed: true,
        photos: {
          small: null,
          large: null
        },
        status: 'Status 4'
      },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter: {
      term: '',
      friend: null,
    },
  }
})

test('follow success', () => {

  const newState = usersReducer(state, actions.toggleFollowAC(1))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()

})

test('unfollow success', () => {

  const newState = usersReducer(state, actions.toggleFollowAC(3))

  expect(newState.users[2].followed).toBeTruthy()
  expect(newState.users[3].followed).toBeFalsy()

})