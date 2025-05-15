'use client';

import { loginRequest } from '@/api/auth/requests';
import { TextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { HStack, VStack } from '@/components/utilities';
import { onMutateError } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import { useUserStore } from '@/stores/UserStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { type AuthSchema, authSchema } from './libs/validators';

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  });

  const { mutate: loginCredential, isLoading } = useMutation(loginRequest);

  const handleSubmit: SubmitHandler<AuthSchema> = async (formData) => {
    loginCredential(formData, {
      onSuccess: ({ user, accessToken, refreshToken, accessTokenTtl, refreshTokenTtl }) => {
        setCookie('access_token', accessToken, { maxAge: accessTokenTtl * 60 });
        setCookie('refresh_token', refreshToken, {
          maxAge: refreshTokenTtl * 60,
        });
        setUser(user);
        router.replace(ROUTER.HOME);
        toast.success('You have logged in successfully!');
      },
      onError: onMutateError,
    });
  };

  return (
    <VStack justify="center" align="center" className="mx-2 h-[100vh]">
      <div className="-z-10 fixed inset-0 bg-cover bg-repeat opacity-65" style={{ backgroundImage: "url('/images/background.png')" }}>
        <div className="h-full w-full" style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}></div>
      </div>

      <HStack className="mb-3" pos="center">
        <Image width={600} height={348} src="/images/logo.png" alt="battle logo" className="h-auto w-[14rem]" />
      </HStack>
      <VStack className="w-full max-w-[450px] rounded-lg border border-grey-100 px-6 py-6 shadow-card-2 md:px-8" spacing={16}>
        <h1 className="mb-4 text-center font-semibold text-2xl md:text-3xl">User Login</h1>

        <FormWrapper form={form} onSubmit={handleSubmit}>
          <VStack spacing={24}>
            <TextField inputSize="md" required fullWidth control={form.control} name="email" label="Email" placeholder="Enter your email" />
            <TextField
              required
              fullWidth
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              inputSize="md"
            />
          </VStack>

          <HStack pos="center">
            <Button type="submit" className="mt-8 mb-2 w-full rounded-full px-10" loading={isLoading}>
              Sign in
            </Button>
          </HStack>
        </FormWrapper>
        <HStack className="my-2" spacing={8}>
          <Separator className="flex-1" />
          <span>or</span>
          <Separator className="flex-1" />
        </HStack>
        <Button onClick={() => login()} variant="outline" className="mb-2 w-full rounded-full">
          Continue with google
        </Button>

        <div className="text-right text-sm">
          Don't have an account?{' '}
          <Link href={ROUTER.SIGN_UP} className="font-semibold text-primary-500 hover:text-primary-600">
            Sign up
          </Link>
        </div>
      </VStack>
    </VStack>
  );
};

export default LoginPage;
