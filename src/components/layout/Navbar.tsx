import { useState, useEffect, type JSX } from 'react';
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
  TextInput,
} from '@mantine/core';
import { IconSearch, IconUser, IconShoppingBag } from '@tabler/icons-react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useCartStore } from '../../store/cartStore';
import ShoppingCart from './ShoppingCart';
import { useDebounce } from '../../hooks/useDebounce';
import { useRef } from 'react';

export default function Navbar(): JSX.Element {
  const [opened, setOpened] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchFromUrl = searchParams.get('search') || '';
  const [search, setSearch] = useState(searchFromUrl);
  const debouncedSearch = useDebounce(search, 400);

  const totalItems = useCartStore((state) => state.totalItems());

  const toggleDrawer = () => setOpened((o) => !o);

  const firstRender = useRef(true);

  useEffect(() => {
    const trimmed = debouncedSearch.trim();

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (
      window.location.pathname.startsWith('/products/') &&
      window.location.pathname !== '/products'
    ) {
      return;
    }

    if (trimmed) {
      navigate(`/products?search=${trimmed}`);
    } else {
      navigate('/products');
    }
  }, [debouncedSearch, navigate]);

  useEffect(() => {
    setSearch(searchFromUrl);
  }, [searchFromUrl]);

  const navLinks = (
    <>
      <NavLink
        to='/'
        className={({ isActive }) =>
          `text-black no-underline ${isActive ? 'font-bold' : 'font-normal'}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to='/products'
        className={({ isActive }) =>
          `text-black no-underline ${isActive ? 'font-bold' : 'font-normal'}`
        }
      >
        Products
      </NavLink>

      <NavLink
        to='/about'
        className={({ isActive }) =>
          `text-black no-underline ${isActive ? 'font-bold' : 'font-normal'}`
        }
      >
        About
      </NavLink>

      <NavLink
        to='/contact'
        className={({ isActive }) =>
          `text-black no-underline ${isActive ? 'font-bold' : 'font-normal'}`
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
        style={{ backgroundColor: 'white', borderBottom: '1px solid #eee' }}
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
            hiddenFrom='md'
            size='sm'
          />

          <Box w={200} component={NavLink} to='/' visibleFrom='md'>
            <Image src={logo} alt='Site Logo' />
          </Box>

          <Group visibleFrom='sm' gap='xl'>
            {navLinks}
          </Group>

          <Group gap='md'>
            <TextInput
              placeholder='Search products...'
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
              leftSection={<IconSearch size={16} />}
              size='sm'
              radius='md'
              visibleFrom='sm'
            />

            <ActionIcon variant='subtle' color='dark'>
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
                onClick={() => setCartOpened(true)}
              >
                <IconShoppingBag size={22} />
              </ActionIcon>
            </Indicator>
          </Group>
        </Container>
      </AppShell.Header>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding='md'
        size='75%'
      >
        <Box component={NavLink} to='/' hiddenFrom='md'>
          <Image src={logo} alt='Site Logo' w={200} pb={40} />
        </Box>

        <TextInput
          placeholder='Search products...'
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          size='sm'
          radius='md'
          mb='lg'
        />

        <Stack gap='lg'>{navLinks}</Stack>
      </Drawer>

      <ShoppingCart opened={cartOpened} onClose={() => setCartOpened(false)} />
    </>
  );
}
