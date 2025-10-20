import { Heading, Box, Flex, Button } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <>
      <Flex
        justify="space-between"
        h="20"
        w="100%"
        bg="#FFFFFF"
        align="center"
        padding="16px"
        border={{
          base: "none", // no full border on small screens
          lg: "0.8px solid #E5E7EB", // full border on large screens
        }}
        borderBottom={{
          base: "0.8px solid #E5E7EB", // only bottom border on small screens
        }}
      >
        <Heading size="xl">FlipResell-Tracker</Heading>
        <Button borderRadius={12}>+ Add Item</Button>
      </Flex>
    </>
  );
};

export default NavBar;
