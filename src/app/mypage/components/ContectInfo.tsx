import { Button } from '@/components/ui/Button';

import { IContactInfoType } from '../../../service/api/mypage';

interface ContactInfoProps {
  data: IContactInfoType;
  onEditClick: () => void;
}

const ContactInfo = ({ data, onEditClick }: ContactInfoProps) => {
  return (
    <div className="mb-6 w-full rounded-[16px] border border-Cgray300 p-[32px]">
      <div className="flex flex-col gap-[16px]">
        <div>
          <span className="mb-1 block text-Cgray700">전화번호</span>
          <p className="typo-body1">{data?.phone || '-'}</p>
        </div>
        <div>
          <span className="mb-1 block text-Cgray700">카카오톡 ID</span>
          <p className="typo-body1">{data?.kakaotalkId || '-'}</p>
        </div>
        <div>
          <span className="mb-1 block text-Cgray700">깃허브</span>
          <p className="typo-body1">{data?.github || '-'}</p>
        </div>
        <div>
          <span className="mb-1 block text-Cgray700">블로그</span>
          <p className="typo-body1">{data?.blog || '-'}</p>
        </div>
        <Button onClick={onEditClick} variant="outline">
          수정
        </Button>
      </div>
    </div>
  );
};

export default ContactInfo;
