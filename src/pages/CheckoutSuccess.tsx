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
import { useEffect, useRef } from 'react';
import type { CartItem } from '../store/cartStore';
import type { JSX } from 'react';

export default function CheckoutSuccessPage(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const items: CartItem[] = location.state?.items || [];

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main className='bg-gray-50' aria-labelledby='success-title'>
      <Flex mih='100vh' align='center' justify='center' px='sm'>
        <Paper
          shadow='xl'
          radius='md'
          p='xl'
          withBorder
          w={{ base: '100%', sm: 500 }}
          role='region'
          aria-labelledby='success-title'
        >
          <Stack align='center' gap='lg'>
            <ThemeIcon
              size={80}
              radius='xl'
              color='green'
              variant='light'
              aria-hidden='true'
            >
              <IconCircleCheck size={50} />
            </ThemeIcon>

            <Title
              order={2}
              ta='center'
              id='success-title'
              tabIndex={-1}
              ref={headingRef}
            >
              Payment Successful
            </Title>

            <Text ta='center' size='sm' c='dimmed' role='status'>
              Thank you for your purchase! Your order is confirmed and will be
              processed shortly.
            </Text>

            {items.length > 0 && (
              <Box w='100%' aria-labelledby='order-summary-title'>
                <Title order={3} size='md' mb='sm' id='order-summary-title'>
                  Order Summary
                </Title>

                <Divider my='sm' />

                <ul role='list'>
                  <Stack gap='sm'>
                    {items.map((item) => (
                      <li key={item.id}>
                        <Group
                          justify='space-between'
                          gap='sm'
                          align='center'
                          style={{ padding: '4px 0' }}
                        >
                          <Group gap='sm' align='center'>
                            <Image
                              src={item.image}
                              alt={`Product image of ${item.title}`}
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
                            aria-label={`Quantity: ${item.quantity}`}
                          >
                            x{item.quantity}
                          </Badge>

                          <Text size='sm' fw={500}>
                            {(item.price * item.quantity).toLocaleString(
                              'nb-NO',
                              {
                                style: 'currency',
                                currency: 'NOK',
                              }
                            )}
                          </Text>
                        </Group>
                      </li>
                    ))}
                  </Stack>
                </ul>

                <Divider my='sm' />

                <Group
                  justify='center'
                  mt='md'
                  role='group'
                  aria-label='Order total'
                >
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
              aria-label='Continue shopping and return to homepage'
            >
              Continue Shopping
            </Button>
          </Stack>
        </Paper>
      </Flex>
    </main>
  );
}
