interface MyComment {
  commentId: number;
  score: number;
  content: string;
  createdAt: string;
  meetingId: number;
  meetingTitle: string;
  thumbnail: string;
  location: string;
  memberCount: number;
  maxMember: number;
}

export type { MyComment };
