import { BookOpen, Code, CodeXml, Palette } from 'lucide-react';

export const MEETING_TYPES = [
  {
    id: 'mogakco',
    label: '모각코',
    icon: <Code className="h-5 w-5" />,
    href: '/meeting/mogakco',
  },
  {
    id: 'study',
    label: '스터디',
    icon: <BookOpen className="h-5 w-5" />,
    href: '/meeting/study',
  },
  {
    id: 'side-project',
    label: '사이드 프로젝트',
    icon: <CodeXml className="h-5 w-5" />,
    href: '/meeting/side-project',
  },
  {
    id: 'hobby',
    label: '취미',
    icon: <Palette className="h-5 w-5" />,
    href: '/meeting/hobby',
  },
];
