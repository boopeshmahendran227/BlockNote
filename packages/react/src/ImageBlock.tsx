import { defaultProps } from "@blocknote/core";
import { Box, Popover, Flex, ActionIcon, Tabs, Button, Input, Center, Text } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { NodeViewContent } from "@tiptap/react";
import { useState } from "react";
import { MdOutlineWidthNormal, MdOutlineWidthWide, MdOutlineWidthFull } from "react-icons/md";
import { createReactBlockSpec } from "./ReactBlockSpec";

const Image = (props: any) => {
  const [value, setValue] = useState("");
  const [modalOpen, setModalOpen] = useState(true);

  const src = props.block.props.src;
  const layout = props.block.props.layout;

  const embedImage = () => {
    props.editor.updateBlock(props.block, {
      props: {
        src: value
      },
    });
  }

  const changeLayout = (layout: string) => {
    props.editor.updateBlock(props.block, {
      props: {
        layout
      },
    });
  }

  const ref = useClickOutside(() => setModalOpen(false));

  const imagePlaceholder = (
    <Box onClick={() => setModalOpen(o => !o)} color="rgba(55, 53, 47, 0.65)" bg="rgb(242, 241, 238)" p={20} w="100%" >
      <Text>Add an Image </Text>
    </Box>
  )
  const getMaxWidth = () => {
    if (layout === 'normal') {
      return '300px'
    }
    if (layout === 'wide') {
      return '500px'
    }
    return '100%';
  }

  const getChild = () => {
    if (src) {
      return <div className="imageWrapper" style={{ maxWidth: getMaxWidth() }}>
        <Popover disabled={!props.editor.options.editable} withArrow width={150} shadow="sm">
          <Popover.Target>
            <img src={src} />
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
        <NodeViewContent />
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
    <div ref={ref} >
      {getChild()}
    </div>
  )
}

export const ImageBlock = createReactBlockSpec({
  type: "image",
  propSchema: {
    ...defaultProps,
    src: {
      default: "",
    },
    layout: {
      default: "normal"
    }
  },
  containsInlineContent: true,
  render: (props) => {
    return <Image {...props} />
  }
})