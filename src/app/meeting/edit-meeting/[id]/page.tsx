'use client';

import { meetingKeys } from '@/hooks/queries/useMeetingQueries';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MeetingDetail } from 'service/api/meeting';
import { getMeetingDetail } from 'service/api/meeting';
import { CreateMeetingPayload } from 'types/meetingForm';

import MeetingForm from '../../_features/form/MeetingForm';

export default function EditPage({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();
  const meetingId = Number(params.id);
  const [initialData, setInitialData] = useState<
    Partial<CreateMeetingPayload> & { imageUrl: string }
  >({
    imageUrl: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cachedData: MeetingDetail | undefined = queryClient.getQueryData(
      meetingKeys.detailInfo(meetingId),
    );

    if (cachedData) {
      // MeetingDetail 타입에서 CreateMeetingPayload 형식으로 변환
      const formattedData: Partial<CreateMeetingPayload> & {
        imageUrl: string;
      } = {
        meetingTitle: cachedData.title,
        categoryTitle: cachedData.categoryTitle,
        content: cachedData.content,
        location: cachedData.location,
        maxMember: cachedData.maxMember,
        startDate: cachedData.startdate,
        isPublic: cachedData.isPublic,
        requireApproval: cachedData.requireApproval,
        skillArray: cachedData.meetingSkillArray || [],
        imageName: '',
        imageEncodedBase64: '',
        imageUrl: cachedData.thumbnail,
      };

      setInitialData(formattedData);
      setIsLoading(false);
    } else {
      const fetchData = async () => {
        try {
          const response = await getMeetingDetail(meetingId);

          const formattedData: Partial<CreateMeetingPayload> & {
            imageUrl: string;
          } = {
            meetingTitle: response.title,
            categoryTitle: response.categoryTitle,
            content: response.content,
            location: response.location,
            maxMember: response.maxMember,
            startDate: response.startdate,
            isPublic: response.isPublic,
            requireApproval: response.requireApproval,
            skillArray: response.meetingSkillArray || [],
            imageName: '',
            imageEncodedBase64: '',
            imageUrl: response.thumbnail,
          };

          setInitialData(formattedData);
        } catch (error) {
          console.error('모임 데이터 가져오기 실패:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
      setIsLoading(false);
    }
  }, [queryClient, meetingId]);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        로딩 중...
      </div>
    );
  }

  return (
    <MeetingForm
      mode="edit"
      initialData={initialData}
      meetingId={Number(params.id)}
    />
  );
}
