import { Box, Heading } from "@chakra-ui/react";

const HeaderBox = () => {
  return (
    <Box
      textAlign="left"
      className="page--container"
      bg="#FFFFFF"
      maxW={{ base: "calc(100% - 32px)", lg: "full" }}
      p="4"
      color="#10B981"
      border="0.8px solid #E5E7EB"
      borderRadius={16}
      mt="4"
    >
      <Heading mb="1" color="#6B7280" size="xs">
        Revenue (30 days)
      </Heading>
      <Heading size="2xl">€8,420</Heading>
    </Box>
  );
};

export default HeaderBox;
