import BasicEdit from './components/BasicEdit';
import BasicInfo from './components/BasicInfo';
import ContectEdit from './components/ContectEdit';
import ContectInfo from './components/ContectInfo';
import PasswordEdit from './components/PasswordEdit';
import PasswordInfo from './components/PasswordInfo';
import ProfileImage from './components/ProfileImage';

export default function MyPage() {
  return (
    <div className="flex flex-col gap-[56px] px-[24px]">
      {/*
      <BasicEdit />
      <ContectEdit />
      <PasswordEdit />
       */}
      <ProfileImage />
      <BasicInfo />
      <ContectInfo />
      <PasswordInfo />
    </div>
  );
}
