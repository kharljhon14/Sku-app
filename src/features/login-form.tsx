'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import paths from '@/routes';
import { loginSchema, LoginSchemaType } from '@/schemas/auth';

export default function LoginForm() {
  // Show password state
  const [isShowPassword, setIsShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        ...data
      });

      if (result?.error) {
        console.error('Login Failed:', result.error);
      } else if (result?.ok) {
        router.push(paths.homePath());
        router.refresh();
      }
    } catch (error) {
      console.error(' An error occured during sign in:', error);
    }
  };

  return (
    <Card className="w-full md:max-w-md sm:max-w-full p-6 mx-4">
      <CardHeader>
        <CardTitle className="text-center">
          <p className="text-xl font-semibold uppercase">Agent Login</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-1">
                        <Input
                          {...field}
                          placeholder="Email"
                        />
                        <small className="text-destructive">
                          {form.formState.errors.email?.message}
                        </small>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Password</FormLabel>
                    <FormControl>
                      <div>
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="Password"
                            type={isShowPassword ? 'text' : 'password'}
                          />
                          <Button
                            size="icon"
                            type="button"
                            variant="link"
                            className="absolute top-0 right-3"
                            onClick={() => setIsShowPassword(!isShowPassword)}
                          >
                            {isShowPassword ? <EyeOff /> : <Eye />}
                          </Button>
                        </div>
                        <small className="text-destructive">
                          {form.formState.errors.password?.message}
                        </small>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full mt-6">
              <Button
                className="w-full"
                type="submit"
              >
                Sign In
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
