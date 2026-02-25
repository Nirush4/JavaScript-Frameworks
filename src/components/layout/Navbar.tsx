import { useState } from 'react';
import {
  AppShell,
  Container,
  Group,
  Burger,
  Drawer,
  Stack,
  Text,
  ActionIcon,
  rem,
} from '@mantine/core';
import { IconSearch, IconUser, IconShoppingBag } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [opened, setOpened] = useState(false);

  const navLinks = (
    <>
      <Text
        component={Link}
        to='/women'
        fw={500}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        Women
      </Text>
      <Text
        component={Link}
        to='/men'
        fw={500}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        Men
      </Text>
      <Text
        component={Link}
        to='/new'
        fw={500}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        New
      </Text>
      <Text
        component={Link}
        to='/sale'
        fw={500}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        Sale
      </Text>
    </>
  );

  return (
    <>
      <AppShell.Header
        style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #eee',
        }}
      >
        <Container
          size='lg'
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            hiddenFrom='sm'
            size='sm'
          />

          {/* Logo */}
          <Text
            component={Link}
            to='/'
            fw={700}
            size='xl'
            style={{
              textDecoration: 'none',
              color: 'black',
              letterSpacing: rem(2),
            }}
          >
            MODERN
          </Text>

          {/* Desktop Nav */}
          <Group visibleFrom='sm' gap='xl'>
            {navLinks}
          </Group>

          {/* Right Icons */}
          <Group gap='md'>
            <ActionIcon variant='subtle' color='dark'>
              <IconSearch size={20} />
            </ActionIcon>
            <ActionIcon variant='subtle' color='dark'>
              <IconUser size={20} />
            </ActionIcon>
            <ActionIcon variant='subtle' color='dark'>
              <IconShoppingBag size={20} />
            </ActionIcon>
          </Group>
        </Container>
      </AppShell.Header>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={() => setOpened(!opened)}
        title='Menu'
        padding='md'
        size='75%'
      >
        <Stack gap='lg'>{navLinks}</Stack>
      </Drawer>
    </>
  );
}
