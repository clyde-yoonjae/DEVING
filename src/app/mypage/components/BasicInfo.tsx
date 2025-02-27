import { Button } from '@/components/ui/Button';

import { IBasicInfoType } from '../../../service/api/mypage';

// props 타입 정의
interface BasicInfoProps {
  data: IBasicInfoType;
  onEditClick: () => void;
}

const BasicInfo = ({ data, onEditClick }: BasicInfoProps) => {
  return (
    <div className="mb-6 w-full rounded-[16px] border border-Cgray300 p-[32px]">
      <div className="flex flex-col gap-[16px]">
        <div>
          <span className="mb-1 block text-Cgray700">사용자 이름</span>
          <p className="typo-body1">{data?.name || '-'}</p>
        </div>
        <div>
          <span className="mb-1 block text-Cgray700">자기소개</span>
          <p className="typo-body1">{data?.intro || '-'}</p>
        </div>
        <div>
          <span className="mb-1 block text-Cgray700">포지션</span>
          <p className="typo-body1">
            {data?.position === 'frontend'
              ? '프론트엔드'
              : data?.position === 'backend'
                ? '백엔드'
                : data?.position === 'designer'
                  ? '디자이너'
                  : '해당없음'}
          </p>
        </div>
        <div>
          <span className="mb-1 block text-Cgray700">성별</span>
          <p className="typo-body1">{data?.gender || '-'}</p>
        </div>
        <div>
          <span className="mb-1 block text-Cgray700">연령대</span>
          <p className="typo-body1">{data?.age || '-'}</p>
        </div>
        <div>
          <span className="mb-1 block text-Cgray700">지역</span>
          <p className="typo-body1">
            {data?.location === 'seoul'
              ? '서울'
              : data?.location === 'gyeonggi'
                ? '경기'
                : data?.location || '-'}
          </p>
        </div>
        <Button onClick={onEditClick} variant="outline">
          수정
        </Button>
      </div>
    </div>
  );
};

export default BasicInfo;
