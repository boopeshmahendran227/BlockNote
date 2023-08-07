// import logo from './logo.svg'
import "@blocknote/core/style.css";
import { Box, Button, Flex } from "@mantine/core";
import Reveal from "reveal.js";
import { useEffect, useState } from "react";
import Editor from "./Editor";
import { chunk } from "lodash";
import Slide from "./Slide";

const initialContent = [{ "id": "e1519f64-e2bd-4232-bb87-fed69b3e4cfb", "type": "heading", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left", "level": "1" }, "content": [{ "type": "text", "text": "This is a heading", "styles": {} }], "children": [] }, { "id": "47a1b6c8-e5e1-4946-af4d-c2bfa94bcc99", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [{ "type": "text", "text": "Orange text", "styles": { "textColor": "orange" } }], "children": [] }, { "id": "d2eb8649-d5a9-4e97-93e8-51cc3bd42ae0", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "74e65845-f370-47bc-9dbc-591ac54ec3ba", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [{ "type": "text", "text": "Lorem ", "styles": {} }, { "type": "text", "text": "ipsum", "styles": { "bold": true } }, { "type": "text", "text": " dolor sit amet, consectetur adipiscing elit. In dignissim ullamcorper magna, eu pulvinar enim gravida sit amet. Donec sed augue vel massa aliquam vulputate. Nulla et nunc arcu. Aliquam in orci dictum, sagittis turpis congue, bibendum mauris. Vivamus interdum laoreet eros ut lacinia. Integer imperdiet odio enim, et maximus dolor ", "styles": {} }, { "type": "text", "text": "mattis", "styles": { "underline": true } }, { "type": "text", "text": " sit amet. Ut ligula erat, egestas rhoncus leo a, sagittis ultrices orci. Vestibulum vulputate posuere ornare. Nulla scelerisque finibus enim, vitae aliquam lectus suscipit nec. In ", "styles": {} }, { "type": "text", "text": "volutpat", "styles": { "strike": true } }, { "type": "text", "text": " maximus tortor at suscipit.", "styles": {} }], "children": [] }, { "id": "82c6036e-844a-413a-98c3-2e0dd283b7f7", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "f139e242-c08d-4e85-8aaa-f089e1d9f02b", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [{ "type": "text", "text": "Text with background color.", "styles": { "backgroundColor": "red" } }], "children": [] }, { "id": "11d1823a-f088-4820-971a-022c28949307", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "ffb1e4da-14e3-4462-8ea9-e677692d327c", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [{ "type": "link", "href": "https://skill-lync.com", "content": [{ "type": "text", "text": "skill-lync", "styles": {} }] }], "children": [] }, { "id": "a6a357f0-32e2-4a0e-8053-4d1c5217aadb", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "2d5953d1-9b64-4f24-98f4-ddc17a5bb0ec", "type": "numberedListItem", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [{ "type": "text", "text": "one", "styles": {} }], "children": [] }, { "id": "2bdea1bf-78ab-458c-8d45-dd99112b5833", "type": "numberedListItem", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [{ "type": "text", "text": "two", "styles": {} }], "children": [] }, { "id": "2ddfc98a-a9c9-4807-b4f5-7eb249f467ad", "type": "numberedListItem", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [{ "type": "text", "text": "three", "styles": {} }], "children": [] }, { "id": "916b163d-ccfd-4265-8b00-f2bab7d99d95", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "9fb5630b-30c4-4692-964d-b7d9d79dd33d", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "4bf88eac-0295-46d0-a1d5-e7bbc3ccd66c", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "36193270-1740-49be-9e61-fdd9dcc2ce1b", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] }, { "id": "a2e99632-f224-4027-8b31-414cd05738d9", "type": "paragraph", "props": { "textColor": "default", "backgroundColor": "default", "textAlignment": "left" }, "content": [], "children": [] },
{ id: 'f5604433-2922-48ec-b9fa-f77d90a5a331', type: 'image', props: { layout: "full", src: "https://media.istockphoto.com/id/1470130937/photo/young-plants-growing-in-a-crack-on-a-concrete-footpath-conquering-adversity-concept.webp?b=1&s=170667a&w=0&k=20&c=IRaA17rmaWOJkmjU_KD29jZo4E6ZtG0niRpIXQN17fc=" }, content: Array(0), children: Array(0) }
];

const getContent = () => {
  const content = localStorage.getItem('content');
  if (content) {
    return JSON.parse(content);
  }
  return initialContent;
}

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

function App() {
  const urlParam = new URLSearchParams(window.location.search);
  const isPreview = Boolean(urlParam.get('preview'))
  const isPptPreview = Boolean(urlParam.get('ppt'))
  const [deck, setDeck] = useState<Reveal.Api | null>(null);

  useEffect(() => {
    if (!isPptPreview) {
      return;
    }
    let deck = new Reveal({
      plugins: []
    })
    deck.initialize({
      center: true
    });
    setDeck(deck);
  }, [isPptPreview]);

  if (isPptPreview) {
    return <div className="reveal">
      <div className="slides">
        <Slide deck={deck} slideNumber={1} content={getContent()} />
      </div>
    </div>
  }

  return <Box
    style={{
      margin: isPreview ? 0 : `0 calc((100% - 731px) / 2)`
    }}
  >
    <Flex justify="right" gap={8}>
      {!isPreview && (
        <Button onClick={() => window.open("/?preview=1")}>Open Preview</Button>
      )}
      {!isPptPreview && (
        <Button variant="outline" onClick={() => window.open("/?ppt=1")}>Open PPT Preview</Button>
      )}
    </Flex>
    <Editor editable={!isPreview && !isPptPreview} initialContent={getContent()} />
  </Box>
}

export default App;
