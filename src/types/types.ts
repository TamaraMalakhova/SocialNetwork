export type PostType = {
  id: number
  message: string
  numberOfLikes:  number
}

export type ProfileContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string 
}

export type ProfilePhotosType = {
  small: string | null
  large: string | null
}

export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ProfileContactsType
  photos: ProfilePhotosType
  aboutMe: string
}

export type UserType = {
  id: number
  name: string
  status: string
  photos: ProfilePhotosType
  followed: boolean
}

export type FriendType = {
  id: number
  name: string
  avatar: string
}