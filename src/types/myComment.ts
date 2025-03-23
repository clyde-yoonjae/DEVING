import { Comment } from 'type-clyde/meeting/comment';

interface MyComment extends Comment {
  meetingTitle: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
  categoryTitle: string;
}

export type { MyComment };
