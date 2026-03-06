import {
  Paper,
  Title,
  Text,
  Button,
  Stack,
  ThemeIcon,
  Flex,
} from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();

  return (
    <Flex mih='90vh' align='center' justify='center'>
      <Paper shadow='md' radius='md' p='xl' withBorder>
        <Stack align='center'>
          <ThemeIcon size={80} radius='xl' color='green' variant='light'>
            <IconCircleCheck size={50} />
          </ThemeIcon>
          <Title order={2}>Payment Successful 🎉</Title>
          <Text> Thank you for your order.</Text>
          <Text>Your payment was completed successfully.</Text>
          <Text>
            Your order details and delivery information have been sent to your
            email.
          </Text>

          <Button mt='md' onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </Stack>
      </Paper>
    </Flex>
  );
}
