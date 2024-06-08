import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/http/api";
import { LoaderCircle } from "lucide-react";
import useTokenStore from "@/store";
const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess(response) {
      console.log("Login Sucessfully");
      setToken(response.data.accessToken);
      console.log(setToken,'...hddjkedj')

      //redirect to home page
      navigate("/dashboard/home");
    },
  });
  const handleLogin = () => {
    const email = emailRef.current?.value;
    const password = PasswordRef.current?.value;
    console.log(email, password);

    //mutation
    if (!email || !password) {
      return alert("Please enter email and password");
    }
    mutation.mutate({ email, password });

    //make Server call
  };
  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
            {mutation.isPending && (
              <div className="text-cyan-900 text-sm">Loading ...</div>
            )}
            {mutation.isError && (
              <div className="text-red-500 text-sm">
                {mutation.error.message}
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailRef}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input ref={PasswordRef} id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <Button
              className="w-full"
              onClick={handleLogin}
              disabled={mutation.isPending}
            >
              {mutation.isPending && <LoaderCircle className="animate-spin" />}
              <span className="ml-2 ">Sign in</span>
            </Button>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/auth/register" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default LoginPage;
