import { Heading, Flex, Button } from "@chakra-ui/react";

export interface NavBarProps {
  onAddClick: () => void;
}

const NavBar = ({ onAddClick }: NavBarProps) => {
  return (
    <>
      <Flex
        justify="space-between"
        h="20"
        w="100%"
        bg= "var(--white-color)"
        align="center"
        padding="16px"
        border={{
          base: "none", // no full border on small screens
          lg: "var(--border-color)", // full border on large screens
        }}
        borderBottom={{
          base: "var(--border-color)", // only bottom border on small screens
        }}
      >
        <Heading size="xl">FlipResell-Tracker</Heading>
        <Button  borderRadius="var(--border-radius)" onClick={onAddClick}>+ Add Item</Button>
      </Flex>
    </>
  );
};

export default NavBar;
