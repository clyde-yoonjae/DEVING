const Description = ({
  label,
  value,
  children,
}: {
  label: string;
  value?: string | null;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex gap-[8px]">
      <p className="typo-head4 w-[56px] text-main">{label}</p>
      <div className="flex-1">
        <p className={`typo-body1 text-Cgray700 ${children && 'hidden'}`}>
          {value}
        </p>
        {children}
      </div>
    </div>
  );
};
export default Description;
