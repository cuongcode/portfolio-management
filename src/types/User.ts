import type { UserProfile } from './UserProfile';

export interface User {
  username: string;
  password: string;
  profile: UserProfile;
}
