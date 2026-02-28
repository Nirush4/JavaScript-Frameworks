import { useState } from 'react';
import {
  AppShell,
  Container,
  Group,
  Burger,
  Drawer,
  Image,
  Stack,
  ActionIcon,
  Box,
  Indicator,
} from '@mantine/core';
import { IconSearch, IconUser, IconShoppingBag } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useCartStore } from '../../store/cartStore';
import ShoppingCart from './ShoppingCart';

export default function Navbar() {
  const [opened, setOpened] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);

  const totalItems = useCartStore((state) => state.totalItems());

  const toggleDrawer = () => setOpened((o) => !o);

  const navLinks = (
    <>
      <NavLink
        to='/'
        className={({ isActive }) =>
          `text-black no-underline ${
            isActive ? 'text-black font-bold text-lg' : ''
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to='/products'
        className={({ isActive }) =>
          `text-black no-underline ${
            isActive ? 'text-black font-bold text-lg' : ''
          }`
        }
      >
        Products
      </NavLink>
      <NavLink
        to='/about'
        className={({ isActive }) =>
          `text-black no-underline ${
            isActive ? 'text-black  font-bold text-lg' : ''
          }`
        }
      >
        About
      </NavLink>
      <NavLink
        to='/contact'
        className={({ isActive }) =>
          `text-black no-underline ${
            isActive ? 'text-black  font-bold text-lg' : ''
          }`
        }
      >
        Contact
      </NavLink>
    </>
  );

  return (
    <>
      <AppShell.Header
        component='header'
        style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #eee',
        }}
      >
        <Container
          size='xl'
          h='100%'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Burger
            opened={opened}
            onClick={toggleDrawer}
            hiddenFrom='sm'
            size='sm'
            aria-label='Toggle navigation menu'
            aria-expanded={opened}
            aria-controls='mobile-navigation'
          />

          <Box w={200} component={NavLink} to='/' visibleFrom='sm'>
            <Image src={logo} alt='Site Logo' />
          </Box>

          <Group
            component='nav'
            aria-label='Main navigation'
            visibleFrom='sm'
            gap='xl'
          >
            {navLinks}
          </Group>

          <Group gap='md'>
            <ActionIcon variant='subtle' color='dark' aria-label='Search'>
              <IconSearch size={20} />
            </ActionIcon>

            <ActionIcon variant='subtle' color='dark' aria-label='User account'>
              <IconUser size={20} />
            </ActionIcon>

            <Indicator
              label={totalItems > 20 ? '20+' : totalItems}
              size={18}
              disabled={totalItems === 0}
              color='red'
              offset={6}
              withBorder
            >
              <ActionIcon
                variant='subtle'
                color='dark'
                aria-label='Open shopping cart'
                onClick={() => setCartOpened(true)}
              >
                <IconShoppingBag size={22} />
              </ActionIcon>
            </Indicator>
          </Group>
        </Container>
      </AppShell.Header>

      <Drawer
        id='mobile-navigation'
        opened={opened}
        onClose={() => setOpened(false)}
        padding='md'
        size='75%'
        aria-label='Mobile navigation'
      >
        <Box component={NavLink} to='/' hiddenFrom='sm'>
          <Image src={logo} alt='Site Logo' w={200} pb={40} />
        </Box>

        <Stack component='nav' aria-label='Mobile navigation links' gap='lg'>
          {navLinks}
        </Stack>
      </Drawer>

      {/* Shopping Cart Drawer */}
      <ShoppingCart opened={cartOpened} onClose={() => setCartOpened(false)} />
    </>
  );
}
