'use client';

import { signUpRequest } from '@/api/auth/requests';
import { TextField } from '@/components/form';
import { Button } from '@/components/ui/button';
import { FormWrapper } from '@/components/ui/form';
import { HStack, VStack } from '@/components/utilities';
import { onMutateError } from '@/libs/common';
import { ROUTER } from '@/libs/router';
import { useUserStore } from '@/stores/UserStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { type SignUpSchema, signUpSchema } from './libs/validators';

const LoginPage = () => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const { mutate: loginCredential, isLoading } = useMutation(signUpRequest);

  const handleSubmit: SubmitHandler<SignUpSchema> = async (formData) => {
    loginCredential(formData, {
      onSuccess: () => {
        router.replace(ROUTER.SIGN_IN);
        toast.success('Sign up successfully!');
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
        <h1 className="mb-4 text-center font-semibold text-2xl md:text-3xl">User Sign Up</h1>

        <FormWrapper form={form} onSubmit={handleSubmit}>
          <VStack spacing={16}>
            <TextField required fullWidth control={form.control} name="username" label="Username" placeholder="Enter your username" />
            <TextField required fullWidth control={form.control} name="email" label="Email" placeholder="Enter your email" />
            <TextField
              required
              fullWidth
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
          </VStack>

          <HStack pos="center" className="mt-2">
            <Button type="submit" className="mt-8 mb-2 w-full rounded-full px-10" loading={isLoading}>
              Sign Up
            </Button>
          </HStack>
        </FormWrapper>

        <div className="text-right text-sm">
          You have an account?{' '}
          <Link href={ROUTER.SIGN_IN} className="font-semibold text-primary-500 hover:text-primary-600">
            Sign In
          </Link>
        </div>
      </VStack>
    </VStack>
  );
};

export default LoginPage;
