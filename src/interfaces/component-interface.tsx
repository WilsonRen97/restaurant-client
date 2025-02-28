import { CurrentUser } from "./user-interface";

export interface ComponentInterface {
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
}
