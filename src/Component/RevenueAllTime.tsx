import { Box, Heading, Text } from "@chakra-ui/react";

export interface RevenueAllTimeProps {
  amount: number;
}

const fmtAmount = (n?: number) =>
  typeof n === "number" && !Number.isNaN(n) ? `£${n.toFixed(2)}` : "—";

const RevenueAllTime = ({ amount }: RevenueAllTimeProps) => {
  return (
    <Box
      textAlign="left"
      className="page--container"
      bg="var(--white-color)"
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
      <Heading size="2xl">{fmtAmount(amount)}</Heading>
    </Box>
  );
};

export default RevenueAllTime;

