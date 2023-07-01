import type { Coin } from './Coin';
import type { UserProfile } from './UserProfile';

export interface User {
  id: any;
  username: string;
  password: string;
  profile: UserProfile;
  data: Coin[];
}
