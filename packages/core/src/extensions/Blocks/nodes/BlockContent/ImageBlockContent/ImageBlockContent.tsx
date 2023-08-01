import { NodeView } from "@tiptap/core";
import { createTipTapBlock } from "../../../api/block";
import styles from "../../Block.module.css";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react"
import { Popover, Tabs, Button, Input, Center, Box, Text } from "@mantine/core";
import { useState } from "react";

const Image = (props: any) => {
  const [value, setValue] = useState("");

  const embedImage = () => {
    props.updateAttributes({
      src: value
    })
  }

  const imagePlaceholder = (
    <Box color="rgba(55, 53, 47, 0.65)" bg="rgb(242, 241, 238)" p={20} w="100%">
      <Text>Add an Image</Text>
    </Box>
  )

  return (
    <NodeViewWrapper>
      <div contentEditable={false}>
        <Popover opened disabled={Boolean(props.node.attrs.src)} width={400} shadow="md">
          <Popover.Target>
            {props.node.attrs.src ?
              <div className={styles.imageWrapper}>
                <img src={props.node.attrs.src} />
              </div>
              : imagePlaceholder
            }
          </Popover.Target>
          <Popover.Dropdown>
            <Tabs defaultValue="upload">
              <Tabs.List>
                <Tabs.Tab value="upload">Upload</Tabs.Tab>
                <Tabs.Tab value="embed">Embed Link</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="upload" pt="xs">
                <Button variant="outline" w="100%">Upload Image
                  <input type="file" hidden />
                </Button>
              </Tabs.Panel>

              <Tabs.Panel value="embed" pt="xs">
                <Input value={value} onChange={e => setValue(e.target.value)} placeholder="Paste the image link..." />
                <Center my={3} onClick={embedImage}>
                  <Button mt={3}>Embed Image </Button>
                </Center>
              </Tabs.Panel>

            </Tabs>
          </Popover.Dropdown>
        </Popover>
      </div>
    </NodeViewWrapper>
  )
}

export const ImageBlockContent = createTipTapBlock<"image">({
  name: "image",
  content: "inline*",

  addAttributes() {
    return {
      src: {
        default: "",
        parseHTML: (element) => element.getAttribute("src"),
        renderHTML: (attributes) => {
          return {
            src: attributes.src,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      {
        class: styles.imageWrapper,
        "data-content-type": this.name,
      },
      ["img", HTMLAttributes, 0],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Image)
  },
});
