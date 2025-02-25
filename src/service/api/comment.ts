import { basicAPI } from '@/lib/axios/basicApi';

export interface ICommentsCount {
  fives: number;
  fours: number;
  threes: number;
  twos: number;
  ones: number;
}

export interface Comment {
  commentId: number;
  score: number;
  content: string;
  createdAt: string;
  meetingId: number;
  userName: string;
  profilePic: string;
}

export interface Comments {
  content: Comment[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  nextCursor: null | number;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

const getCommentsCount = async (meetingId: number): Promise<ICommentsCount> => {
  const res = await basicAPI.get(`/api/v1/comments/count/${meetingId}`);
  return res.data.data;
};

const getCommentsMeeting = async (meetingId: number): Promise<Comments> => {
  const res = await basicAPI.get(
    `/api/v1/comments/${meetingId}?lastCommentId=0&size=3`,
  );
  console.log('api 댓글: ', res.data.data);
  return res.data.data;
};

export { getCommentsCount, getCommentsMeeting };
