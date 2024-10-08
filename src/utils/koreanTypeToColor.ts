import { TYPE_BY_COLOR } from '@/lib/constant';
const koreanTypeToColor = (koreanType: string) => {
  const foundType = Object.values(TYPE_BY_COLOR).find(type => type.ko === koreanType);
  return foundType ? foundType.color : null;
};
export default koreanTypeToColor;
