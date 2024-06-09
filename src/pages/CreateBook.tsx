import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook } from "@/http/api";
import { Link, Navigate, useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  genre: z.string().min(2, {
    message: "Genre must be at lease 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Genre must be at lease 2 characters.",
  }),
  coverImage: z.instanceof(FileList).refine((file) => {
    return file.length === 1;
  }, "Cover Image Required"),
  file: z.instanceof(FileList).refine((file) => {
    return file.length === 1;
  }, "Book Pdf Required"),
});
const CreateBook = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      genre: "",
      description: "",
    },
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      console.log("Book Created Sucessfully ");

      // add the middle wire
      navigate("/dashboard/books");
      //redirect to home page
    },
  });

  const coverImageRef = form.register("coverImage");
  const fileRef = form.register("file");
  function onSubmit(value: z.infer<typeof formSchema>) {
    const formdata = new FormData();

    formdata.append("title", value.title);
    formdata.append("genre", value.genre);

    formdata.append("description", value.description);

    formdata.append("coverImage", value.coverImage[0]);

    formdata.append("file", value.file[0]);
    mutation.mutate(formdata);
  }
  Input;
  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <div className="flex  items-center justify-between">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/books">
                      Books
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Create</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="flex items-center gap-4">
                <Link to={"/dashboard/books"}>
                  <Button variant={"outline"}>
                    <span className="ml-2">Cancel</span>
                  </Button>
                </Link>

                <Button type="submit" disabled={mutation.isPending}>
                  <Save size={20} />
                  {mutation.isPending && (
                    <LoaderCircle className="animate-spin" />
                  )}

                  <span className="ml-2">Submit</span>
                </Button>
              </div>
            </div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Create a New Book</CardTitle>
                <CardDescription>
                  Create Books according to your View.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input type="text" className="w-full" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genre</FormLabel>
                        <FormControl>
                          <Input type="text" className="w-full" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-32" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={() => (
                      <FormItem>
                        <FormLabel>CoverImage</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            className="w-full"
                            {...coverImageRef}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="file"
                    render={() => (
                      <FormItem>
                        <FormLabel>Book PDF</FormLabel>
                        <FormControl>
                          <Input type="file" className="w-full" {...fileRef} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreateBook;
