import { atom, selector } from 'recoil';
import { FeedType } from '../pages/home/post'; 

export const feedsState = atom<FeedType[]>({
    key: 'feedsState',
    default: [
        
    ]
});


export const addFeed = selector({
    key: 'addFeed',
    get: ({ get }) => {
        return get(feedsState);
    },
    set: ({ set }, newFeed) => {
        set(feedsState, (prevFeeds: FeedType[]) => [...prevFeeds, newFeed]);
    },
});

export const deleteFeedById = selector({
    key: 'deleteFeedById',
    get: ({ get }) => get(feedsState),
    set: ({ set }, updatedFeeds) => set(feedsState, updatedFeeds),
});

export const updateFeedsState = selector({
    key: 'updateFeedsState',
    get: ({ get }) => {
      return get(feedsState);
    },
    set: ({ set }, newData) => {
      set(feedsState, newData);
    },
  });