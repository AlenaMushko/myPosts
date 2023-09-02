'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { AppBar, Button, ImageListItem, Link, Toolbar, Typography } from '@mui/material';
import { ThemeContext, ThemeSwitcher } from '@/themes';
import { Box } from '@mui/system';
import { AppRoutes } from '@/routing/appRoutes';
import { useUser } from '@/hooks';
import supabase from '@/config/superbaseClients';

export const Header: React.FC = () => {
  const { data: user, refetch } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const handleLogout = async () => {
    window.sessionStorage.removeItem('userId');
    await supabase.auth.signOut();
    router.push('/login');
    refetch();
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <ImageListItem>
          <img
            src="/assets/logo.png"
            alt="Logo"
            loading="lazy"
            style={{ width: '40px', height: '40px' }}
          />
        </ImageListItem>
        {user ? (
          <>
            <Link underline="none" href={AppRoutes.AUTHOR}>
              <Typography
                variant="body2"
                sx={{
                  borderRadius: '8px',
                  padding: '8px',
                  border: pathname === AppRoutes.AUTHOR ? '1px solid #f5f5f5' : '',
                }}
              >
                Author
              </Typography>
            </Link>
            <Link underline="none" href={AppRoutes.GENERAL}>
              <Typography
                variant="body2"
                sx={{
                  borderRadius: '8px',
                  padding: '8px',
                  border: pathname === AppRoutes.GENERAL ? '1px solid #f5f5f5' : '',
                }}
              >
                General
              </Typography>
            </Link>
          </>
        ) : (
          <>
            <Link underline="none" href={AppRoutes.LOGIN}>
              <Typography
                variant="body2"
                sx={{
                  borderRadius: '8px',
                  padding: '8px',
                  border: pathname === AppRoutes.LOGIN ? '1px solid #f5f5f5' : '',
                }}
              >
                Login
              </Typography>
            </Link>
            <Link underline="none" href={AppRoutes.SIGNUP}>
              <Typography
                variant="body2"
                sx={{
                  borderRadius: '8px',
                  padding: '8px',
                  border: pathname === AppRoutes.SIGNUP ? '1px solid #f5f5f5' : '',
                }}
              >
                Signup
              </Typography>
            </Link>
          </>
        )}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {user && (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'baseline' }}>
              <Typography sx={{ color: theme.palette.info.main }}>{user.name}</Typography>

              <Button
                onClick={handleLogout}
                size="small"
                sx={{
                  color: theme.palette.text.disabled,
                  background: 'white',
                  transition: 'backgroundColor 0.5s ease',
                  '&:hover': {
                    backgroundColor: theme.palette.text.secondary,
                  },
                }}
              >
                Logout
              </Button>
            </Box>
          )}
          <ThemeSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
