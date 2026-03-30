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
import { useEffect, useRef, useState } from 'react';
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

  const shipping = 0;
  const total = subtotal + shipping;

  const [orderNumber] = useState(
    () =>
      `#ORD-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 900000
      )}`
  );

  const [orderDate] = useState(() => new Date().toLocaleDateString('en-GB'));

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main
      className='pb-0 min-h-screen py-10 px-4'
      aria-labelledby='success-title'
    >
      <Flex align='center' justify='center'>
        <Paper
          shadow='xl'
          radius='lg'
          p='xl'
          withBorder
          w={{ base: '100%', sm: 600 }}
          role='region'
          aria-labelledby='success-title'
        >
          <Stack gap='lg'>
            <Stack align='center' gap='xs'>
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
                order={3}
                ta='center'
                id='success-title'
                tabIndex={-1}
                ref={headingRef}
              >
                Payment Successful 🎉
              </Title>

              <Text ta='center' size='sm' c='dimmed' role='status'>
                Your order has been placed and is being processed.
              </Text>
            </Stack>

            <Box
              className='bg-gray-100 p-4 rounded-lg'
              role='group'
              aria-label='Order information'
            >
              <Group justify='space-between'>
                <Text size='sm'>
                  <strong>Order ID:</strong> {orderNumber}
                </Text>
                <Text size='sm'>
                  <strong>Date:</strong> {orderDate}
                </Text>
              </Group>
            </Box>

            {items.length > 0 && (
              <Box aria-labelledby='order-summary-title'>
                <Title order={3} size='md' mb='sm' id='order-summary-title'>
                  Order Summary
                </Title>

                <Divider my='sm' />

                <ul role='list' className='space-y-3'>
                  {items.map((item) => (
                    <li key={item.id}>
                      <div className='flex items-center justify-between bg-white border rounded-lg p-3 shadow-sm'>
                        <div className='flex items-center gap-3'>
                          <Image
                            src={item.image}
                            alt={`Product image of ${item.title}`}
                            w={50}
                            h={50}
                            radius='md'
                            fit='cover'
                          />
                          <div>
                            <Text size='sm' fw={600}>
                              {item.title}
                            </Text>
                            <Text size='xs' c='dimmed'>
                              {item.price.toLocaleString('nb-NO', {
                                style: 'currency',
                                currency: 'NOK',
                              })}{' '}
                              × {item.quantity}
                            </Text>
                          </div>
                        </div>

                        <div className='text-right'>
                          <Badge
                            variant='light'
                            color='gray'
                            aria-label={`Quantity: ${item.quantity}`}
                          >
                            x{item.quantity}
                          </Badge>

                          <Text size='sm' fw={600} mt={4}>
                            {(item.price * item.quantity).toLocaleString(
                              'nb-NO',
                              {
                                style: 'currency',
                                currency: 'NOK',
                              }
                            )}
                          </Text>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <Divider my='md' />

                <Stack gap={4}>
                  <Group justify='space-between'>
                    <Text size='sm' c='dimmed'>
                      Subtotal
                    </Text>
                    <Text size='sm'>
                      {subtotal.toLocaleString('nb-NO', {
                        style: 'currency',
                        currency: 'NOK',
                      })}
                    </Text>
                  </Group>

                  <Group justify='space-between'>
                    <Text size='sm' c='dimmed'>
                      Shipping
                    </Text>
                    <Text size='sm' c='green'>
                      Free
                    </Text>
                  </Group>

                  <Divider />

                  <Group justify='space-between'>
                    <Text fw={700}>Total</Text>
                    <Text fw={700} size='lg'>
                      {total.toLocaleString('nb-NO', {
                        style: 'currency',
                        currency: 'NOK',
                      })}
                    </Text>
                  </Group>
                </Stack>
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
