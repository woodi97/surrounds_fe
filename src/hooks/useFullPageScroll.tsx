import { useTouch, useWheel } from '@src/hooks/index';
import { debounce } from 'lodash-es';
import { MutableRefObject, useRef, useState } from 'react';

export default function useFullPageScroll({
  ref,
  numOfPages,
  debounceTime = 1500,
  disableInfiniteScroll = false,
}: {
  ref: MutableRefObject<HTMLDivElement>;
  numOfPages: number;
  debounceTime?: number;
  disableInfiniteScroll?: boolean;
}) {
  const [nxPage, setNxPage] = useState<number>(0);
  const nextPage = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  const debouncedTickingFalse = debounce(() => {
    ticking.current = false;
  }, debounceTime);

  const handleScroll = (deltaY: number) => {
    // prevent duplicated scroll event
    if (ticking.current) return;
    // set scroll event is on action
    ticking.current = true;

    const { scrollTop } = ref.current;
    const pageHeight = window.innerHeight;
    const currentPage = Math.floor(scrollTop / pageHeight);
    if (deltaY > 0) {
      if (!disableInfiniteScroll) {
        nextPage.current = (currentPage + 1) % numOfPages;
        setNxPage(nextPage.current);
      } else {
        nextPage.current = currentPage + 1 >= numOfPages ? currentPage : currentPage + 1;
        setNxPage(nextPage.current);
      }
      ref.current.scrollTo({
        top: nextPage.current * pageHeight,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      if (!disableInfiniteScroll) {
        nextPage.current = (currentPage - 1 + numOfPages) % numOfPages;
        setNxPage(nextPage.current);
      } else {
        nextPage.current = currentPage - 1 < 0 ? 0 : currentPage - 1;
        setNxPage(nextPage.current);
      }
      ref.current.scrollTo({
        top: nextPage.current * pageHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
    // To prevent ticking value is changed during scroll
    debouncedTickingFalse();
  };

  useWheel({
    passive: false,
    cb: (e) => {
      // prevent default scroll event
      e.preventDefault();

      const { deltaY } = e;
      handleScroll(deltaY);
    },
  });

  useTouch({
    passive: false,
    cb: (e, _, offset) => {
      // prevent default scroll event
      e.preventDefault();

      const { y } = offset;
      handleScroll(y);
    },
  });

  return {
    nextPage: nxPage,
  };
}
