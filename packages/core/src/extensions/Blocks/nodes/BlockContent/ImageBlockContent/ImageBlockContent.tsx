import { NodeView } from "@tiptap/core";
import { createTipTapBlock } from "../../../api/block";
import styles from "../../Block.module.css";
import { NodeViewWrapper, ReactNodeViewRenderer, NodeViewContent } from "@tiptap/react"
import { Popover, Tabs, Button, ActionIcon, Input, Center, Box, Text, Flex } from "@mantine/core";
import { useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import { MdOutlineWidthNormal, MdOutlineWidthWide, MdOutlineWidthFull } from "react-icons/md";

const Image = (props: any) => {
  const [value, setValue] = useState("");
  const [modalOpen, setModalOpen] = useState(true);

  const embedImage = () => {
    props.updateAttributes({
      src: value
    })
  }

  const changeLayout = (layout: string) => {
    props.updateAttributes({
      layout
    })
  }

  const ref = useClickOutside(() => setModalOpen(false));

  const imagePlaceholder = (
    <Box onClick={() => setModalOpen(o => !o)} color="rgba(55, 53, 47, 0.65)" bg="rgb(242, 241, 238)" p={20} w="100%">
      <Text>Add an Image</Text>
    </Box>
  )
  const getMaxWidth = () => {
    const layout = props.node.attrs.layout;
    if (layout === 'normal') {
      return '300px'
    }
    if (layout === 'wide') {
      return '500px'
    }
    return '100%';
  }

  const getChild = () => {
    if (props.node.attrs.src) {
      return <div className="imageWrapper" style={{ maxWidth: getMaxWidth() }}>
        <Popover disabled={!props.editor.options.editable} withArrow width={150} shadow="sm">
          <Popover.Target>
            <img style={{}} src={props.node.attrs.src} />
          </Popover.Target>
          <Popover.Dropdown bg="#262625" color='white'>
            <Flex justify="space-around" align="center">
              <ActionIcon variant="transparent" onClick={() => changeLayout("normal")}>
                <MdOutlineWidthNormal color="white" size={30} />
              </ActionIcon>
              <ActionIcon variant="transparent" onClick={() => changeLayout("wide")}>
                <MdOutlineWidthWide color="white" size={30} />
              </ActionIcon>
              <ActionIcon variant="transparent" onClick={() => changeLayout("full")}>
                <MdOutlineWidthFull color="white" size={30} />
              </ActionIcon>
            </Flex>
          </Popover.Dropdown>
        </Popover>
        <NodeViewContent className={styles.caption} >
        </NodeViewContent>
      </div>
    }
    return (
      <div contentEditable={false}>
        <Popover opened={modalOpen} width={400} shadow="md">
          <Popover.Target>
            {imagePlaceholder}
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
    )
  }

  return (
    <NodeViewWrapper>
      <div ref={ref}>
        {getChild()}
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
      layout: {
        default: "normal",
        parseHTML: (element) => element.getAttribute("data-layout"),
        renderHTML: (attributes) => {
          return {
            src: attributes.layout,
          };
        },
      }
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
