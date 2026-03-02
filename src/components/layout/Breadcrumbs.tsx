import { Breadcrumbs as MantineBreadcrumbs, Anchor, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  productName?: string;
}

export default function Breadcrumbs({ productName }: BreadcrumbsProps) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const routeMap: Record<string, string> = {
    '/': 'Home',
    '/products': 'Products',
    '/about': 'About',
    '/contact': 'Contact',
  };

  const crumbs: Crumb[] = [{ label: 'Home', path: '/' }];

  pathnames.forEach((segment, idx) => {
    const path = '/' + pathnames.slice(0, idx + 1).join('/');

    if (path === '/products' && productName) {
      crumbs.push({ label: productName });
    } else if (routeMap[path]) {
      crumbs.push({ label: routeMap[path], path });
    } else if (idx !== pathnames.length - 1) {
      crumbs.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        path,
      });
    }
  });

  return (
    <MantineBreadcrumbs separator='/' mb='md'>
      {crumbs.map((crumb, idx) =>
        crumb.path ? (
          <Anchor component={Link} to={crumb.path} key={idx} color='dimmed'>
            {crumb.label}
          </Anchor>
        ) : (
          <Text key={idx} w={500}>
            {crumb.label}
          </Text>
        )
      )}
    </MantineBreadcrumbs>
  );
}
