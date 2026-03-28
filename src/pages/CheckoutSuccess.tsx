import { useLocation, useNavigate } from 'react-router-dom';
import {
  Paper,
  Title,
  Text,
  Button,
  Stack,
  ThemeIcon,
  Flex,
  Group,
  Image,
  Divider,
  Box,
  Badge,
} from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import type { CartItem } from '../store/cartStore';
import type { JSX } from 'react';

export default function CheckoutSuccessPage(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const items: CartItem[] = location.state?.items || [];

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Flex mih='100vh' align='center' justify='center' px='sm' bg='gray.0'>
      <Paper
        shadow='xl'
        radius='md'
        p='xl'
        withBorder
        w={{ base: '100%', sm: 500 }}
      >
        <Stack align='center' gap='lg'>
          <ThemeIcon size={80} radius='xl' color='green' variant='light'>
            <IconCircleCheck size={50} />
          </ThemeIcon>

          <Title order={2} ta='center'>
            Payment Successful 🎉
          </Title>
          <Text ta='center' size='sm' color='dimmed'>
            Thank you for your purchase! Your order is confirmed and will be
            processed shortly.
          </Text>

          {items.length > 0 && (
            <Box w='100%'>
              <Title order={4} size='md' mb='sm'>
                Order Summary
              </Title>
              <Divider my='sm' />

              <Stack gap='sm'>
                {items.map((item) => (
                  <Group
                    key={item.id}
                    justify='space-between'
                    gap='sm'
                    align='center'
                    style={{ padding: '4px 0' }}
                  >
                    <Group gap='sm' align='center'>
                      <Image
                        src={item.image}
                        alt={item.title}
                        w={40}
                        h={40}
                        radius='sm'
                        fit='cover'
                      />
                      <Text size='sm' fw={500} lineClamp={1}>
                        {item.title}
                      </Text>
                    </Group>
                    <Badge
                      color='gray.5'
                      variant='outline'
                      radius='sm'
                      size='sm'
                    >
                      x{item.quantity}
                    </Badge>
                    <Text size='sm' fw={500}>
                      {(item.price * item.quantity).toLocaleString('nb-NO', {
                        style: 'currency',
                        currency: 'NOK',
                      })}
                    </Text>
                  </Group>
                ))}
              </Stack>

              <Divider my='sm' />

              <Group justify='center' mt='md'>
                <Text fw={700}>Total</Text>
                <Text fw={700} size='lg'>
                  {subtotal.toLocaleString('nb-NO', {
                    style: 'currency',
                    currency: 'NOK',
                  })}
                </Text>
              </Group>
            </Box>
          )}

          <Button
            mt='lg'
            fullWidth
            size='md'
            radius='md'
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </Stack>
      </Paper>
    </Flex>
  );
}
