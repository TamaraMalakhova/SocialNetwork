import { ResultCodesEnum, ResponseType } from '../api/api';
import { userAPI } from './../api/users-api';
import { actions, follow } from "./users-reducer"

jest.mock('./../api/users-api')

const userAPIMock = userAPI as jest.Mocked<typeof userAPI>

const result: ResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {}
}

userAPIMock.follow.mockReturnValue(Promise.resolve(result))
userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
  userAPIMock.follow.mockClear()
  userAPIMock.unfollow.mockClear()
})

test('success follow thunk', async () => {
  const thunk = follow(1)

  //@ts-ignore
  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowAC(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})

test('success unfollow thunk', async () => {
  const thunk = follow(1)

  //@ts-ignore
  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowAC(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})