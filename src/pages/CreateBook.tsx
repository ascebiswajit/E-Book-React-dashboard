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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

const CreateBook = () => {
  return (
    <div>
      <div className="flex  items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-4">
          <Button variant={"outline"}>
            <span className="ml-2">Cancel</span>
          </Button>
          <Button>
            <Save size={20} />
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
          <form action="">
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Title</Label>
                <Input id="name" type="text" className="w-full" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Genre</Label>
                <Input id="name" type="text" className="w-full" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" className="min-h-32" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="coverImage">CoverImage</Label>
                <Input id="coverImage" type="file" className="w-full" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="bookFile">Book PDF</Label>
                <Input id="bookFile" type="file" className="w-full" />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBook;
