import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const PasswordRef = useRef<HTMLInputElement>(null);
  const mutation = useMutation({
    mutationFn: register,
    onSuccess() {
      console.log("Login Sucessfully");

      //redirect to home page
      navigate("/dashboard/home");
    },
  });
  const handleRegister = () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;

    const password = PasswordRef.current?.value;
    console.log(name, email, password);
    if (!name || !email || !password) {
      return alert("Please fillup the form");
    }
    mutation.mutate({ name, email, password });
  };
  // {

  //   useRef : https://chatgpt.com/c/5fca922b-f165-4576-b614-c78706fa0cf8#:~:text=Common%20Use%20Cases,or%20other%20variables.

  // }
  return (
    <section className="flex justify-center items-center h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
            {mutation.isPending&&<div className="text-cyan-600 text-sm">Loading ...</div>}
            {mutation.isError&&<div className="text-red-500 text-sm">{mutation.error.message}</div>}

          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Name</Label>
              <Input ref={nameRef} id="first-name" placeholder="Max" required />
            </div>

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
              <Input ref={PasswordRef} id="password" type="password" />
            </div>
            <Button
              className="w-full"
              onClick={handleRegister}
              disabled={mutation.isPending}
            >
              {mutation.isPending && <LoaderCircle className="animate-spin" />}
              <span className="ml-2 ">Sign in</span>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
