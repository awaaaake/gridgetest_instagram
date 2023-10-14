import { atom } from 'recoil';

export const DashboardModalState = atom<boolean>({
  key: 'DashboardModalState',
  default: false, 
});

export const PostModalState = atom<boolean>({
  key: 'PostModalState',
  default: false, 
});

export const PageState = atom<number>({
  key: 'page',
  default: 0, 
});

export const DashboardModifiedState = atom<boolean>({
  key: 'DashboardModifiedState',
  default: false,
})

export const PostedState = atom<boolean>({
  key: 'PostedState',
  default: false,
})

export const ScrollingState = atom<boolean>({
  key: 'ScrollingState',
  default: true,
})
