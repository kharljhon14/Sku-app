'use client';

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function LoginForm() {
  // Show password state
  const [isShowPassword, setIsShowPassword] = useState(false);

  const form = useForm();

  return (
    <Card className="w-full lg:w-1/3 md:w-1/2 px-12 py-6 mx-4">
      <CardHeader>
        <CardTitle className="text-center">
          <p className="text-xl font-semibold uppercase">Agent Login</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form autoComplete="off">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Email"
                      />
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
