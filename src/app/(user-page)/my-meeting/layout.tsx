import MeetingTypeTab from '../components/MeetingTypeTab';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MeetingTypeTab />
      {children}
    </div>
  );
}
