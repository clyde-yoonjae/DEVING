import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/Dropdown';

const Dropdown = ({
  trigger,
  items,
  size,
  sideOffset,
  className,
}: {
  trigger: React.ReactNode;
  items: { label: string; value?: string; onSelect?: () => void }[];
  size?: 's' | 'l';
  sideOffset?: number;
  className?: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className={className} sideOffset={sideOffset}>
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            size={size}
            onSelect={item.onSelect}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default Dropdown;
