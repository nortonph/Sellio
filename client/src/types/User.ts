import { Item } from './Item';

export interface User {
  _id : string,
  email : string,
  profilePicUrl : string,
  contactInfo : string,
  password : string,
  isAdmin: boolean,
  items : Item[]

}