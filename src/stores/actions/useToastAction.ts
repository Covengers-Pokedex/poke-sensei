import { useToastStore } from '../useToastStore';

export const useToastAction = () => {
  return useToastStore(state => state.action);
};
