export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <div className="flex gap-[24px]">
        <h3 className="typo-button1 border-b-2 border-main p-4 text-[17px] font-bold text-main">
          나의 모임
        </h3>
        <h3 className="typo-button1 border-b-2 border-main p-4 text-[17px] font-bold text-main">
          찜한 모임
        </h3>
        <h3 className="typo-button1 border-b-2 border-main p-4 text-[17px] font-bold text-main">
          나의 리뷰
        </h3>
      </div> */}
      {children}
    </div>
  );
}
