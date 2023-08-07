// import logo from './logo.svg'
import "@blocknote/core/style.css";
import { useEffect, useState } from "react";
import Editor from "./Editor";
import { slice } from "lodash";

const isOffscreen = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return (
    (rect.x + rect.width) < 0
    || (rect.y + rect.height) < 0
    || (rect.x > window.innerWidth || rect.y > window.innerHeight)
  );
};

function findFirstTrueIndex(arr: any[], predicate: (value: any) => boolean) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    // Only call the predicate function when we need the value
    let midValue = predicate(arr[mid]);

    if (midValue === false) {
      left = mid + 1;
    } else {
      if (mid === 0 || predicate(arr[mid - 1]) === false) {
        return mid;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;  // Return -1 if no true value is found
}

function Slide({ content, slideNumber, deck }: { content: any[], slideNumber: number, deck: Reveal.Api | null }) {
  const [splitIndex, setSplitIndex] = useState(-1);

  useEffect(() => {
    const dynamicSlides = () => {
      const blocks = document.querySelectorAll(`#slide${slideNumber} .ProseMirror > [data-node-type=blockGroup] > [data-node-type=block-outer]`)
      const arr = Array.from(blocks);

      const i = findFirstTrueIndex(arr, isOffscreen);

      setSplitIndex(i)
    }

    setTimeout(dynamicSlides, 1000);

    window.addEventListener('resize', dynamicSlides);
    return () => {
      window.removeEventListener('resize', dynamicSlides);
    }
  }, []);

  useEffect(() => {
    // resync
    if (splitIndex !== -1 && deck) {
      deck?.sync();
    }
  }, [deck, splitIndex]);


  if (splitIndex === -1) {
    return <section id={"slide" + slideNumber}>
      <Editor editable={false} initialContent={content} />
    </section>
  }

  return <>
    <section id={"slide" + slideNumber}>
      <Editor editable={false} initialContent={slice(content, 0, splitIndex - 1)} />
    </section>
    <Slide deck={deck} slideNumber={slideNumber + 1} content={slice(content, splitIndex - 1)} />
  </>
}

export default Slide;
