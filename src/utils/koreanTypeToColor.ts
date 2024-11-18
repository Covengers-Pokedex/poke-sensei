import { TYPE_BY_COLOR } from '@/constants/mappingTypeColor';
const koreanTypeToColor = (koreanType: string, language: 'ko' | 'en') => {
  const foundType = Object.values(TYPE_BY_COLOR).find(type => type[language] === koreanType);
  return foundType ? foundType.color : null;
};
export default koreanTypeToColor;
