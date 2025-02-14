import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/Dropdown';

const menus = ['마이페이지', '로그아웃'];

export default function Home() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>Large</DropdownMenuTrigger>
        <DropdownMenuContent>
          {menus.map((menu) => (
            <DropdownMenuItem key={menu}>{menu}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="h-20"></div>
      <DropdownMenu>
        <DropdownMenuTrigger>Small</DropdownMenuTrigger>
        <DropdownMenuContent>
          {menus.map((menu) => (
            <DropdownMenuItem key={menu} size="s">
              {menu}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
