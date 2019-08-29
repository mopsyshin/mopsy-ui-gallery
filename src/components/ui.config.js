import SmoothSearch from './ui/smooth-search/SmoothSearch';
import Dropdown from './ui/dropdown/Dropdown';
import Calendar from './ui/calendar/Calendar';
import SimpleTab from './ui/simple-tab/SimpleTab';
import InfiniteScrollView from './ui/infinite-scroll-view/InfiniteScrollView';
import GorgeousPost from './ui/gorgeous-post/GorgeousPost';
import ScrollBanner from './ui/scroll-banner/ScrollBanner';
import ToggleInput from './ui/toggle-input/ToggleInput';
import FloatingMenu from './ui/floating-menu/FloatingMenu';

export default {
  smoothSearch: {
    name: 'Smooth Search',
    path: 'smooth-search',
    comp: SmoothSearch,
  },
  dropdown: {
    name: 'Dropdown',
    path: 'dropdown',
    comp: Dropdown,
  },
  calendar: {
    name: 'Calendar',
    path: 'calendar',
    comp: Calendar,
  },
  simpleTab: {
    name: 'Simple Tab',
    path: 'simple-tab',
    comp: SimpleTab,
  },
  infiniteScrollView: {
    name: 'Infinite Scroll View',
    path: 'infinite-scroll-view',
    comp: InfiniteScrollView,
  },
  gorgeousPost: {
    name: 'Gorgeous Post',
    path: 'gorgeous-post',
    comp: GorgeousPost,
  },
  scrollBanner: {
    name: 'Scroll Banner',
    path: 'scroll-banner',
    comp: ScrollBanner,
  },
  toggleInput: {
    name: 'Toggle Input',
    path: 'toggle-input',
    comp: ToggleInput,
  },
  floatingMenu: {
    name: 'Floating Menu',
    path: 'floating-menu',
    comp: FloatingMenu,
  }
}