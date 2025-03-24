import { UserProfile } from 'type-clyde/user/profile';

export type MemberStatus = 'APPROVED' | 'REJECTED' | 'PENDING' | 'EXPEL';

export interface Member {
  userId: number;
  profilePic: string;
  name: string;
  memberStatus: MemberStatus;
}

export interface MemberProfile extends UserProfile {
  memberResponse: {
    memberId: number;
    message: string;
  };
}

export interface UserData {
  id: number;
  name: string;
  status: MemberStatus;
  introduction: string;
  profilePic: string;
}
