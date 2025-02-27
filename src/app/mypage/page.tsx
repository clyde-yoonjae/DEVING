import BasicEdit from './components/BasicEdit';
import BasicInfo from './components/BasicInfo';
import ContectEdit from './components/ContectEdit';
import ContectInfo from './components/ContectInfo';
import PasswordEdit from './components/PasswordEdit';
import PasswordInfo from './components/PasswordInfo';
import ProfileEdit from './components/ProfileImageEdit';
import TechStackEdit from './components/TechStackEdit';

export default function MyPage() {
  return (
    <div className="flex flex-col gap-[56px] px-[24px]">
      <ProfileEdit />
      <BasicEdit />
      <ContectEdit />
      <TechStackEdit />
      <PasswordEdit />
      <BasicInfo />
      <ContectInfo />
      <PasswordInfo />
    </div>
  );
}
