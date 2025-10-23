import { Box, Heading, Text } from "@chakra-ui/react";

const RevenueAllTime = () => {
  return (
    <Box
      textAlign="left"
      className="page--container"
      bg= "var(--white-color)"
      maxW={{ base: "calc(100% - 32px)", lg: "full" }}
      p="4"
      color="var(--green-color)"
      border="var(--border-color)"
      borderRadius="var(--border-radius)"
      mt="4"
    >
      <Text mb="1" color="var(--secondary-color)" fontSize="xs">
        Revenue (All time)
      </Text>
      <Heading size="2xl">€12,530</Heading>
    </Box>
  );
};

export default RevenueAllTime;
