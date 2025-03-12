export const translateCategoryNameToEng = (category: string) => {
  switch (category) {
    case '모각코':
      return 'mogakco';
    case '취미':
      return 'hobby';
    case '스터디':
      return 'study';
    case '사이드 프로젝트':
      return 'side-project';
    default:
      return 'mogakco';
  }
};
