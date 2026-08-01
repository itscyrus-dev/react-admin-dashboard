import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.string({
    required_error: "Please select a role.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }),
  notifications: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export function FormDemoPage() {
  const { hasPermission } = useAuthStore();
  const [canAccess, setCanAccess] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const allowed = await hasPermission("/dashboard/forms", "GET");
      setCanAccess(allowed);
    };
    checkAccess();
  }, [hasPermission]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      notifications: false,
    },
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    form.reset();
  };

  if (canAccess === null) {
    return <Skeleton className="h-[34rem] w-full" aria-label="Loading form demo" />;
  }

  if (!canAccess) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-muted-foreground">You don't have permission to view this page</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Form Demo</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          This is a demonstration of shadcn/ui form components with validation.
        </p>
      </div>
      <Separator />
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="admin-card-shadow">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-lg leading-7 tracking-normal">Profile Settings</CardTitle>
            <CardDescription className="text-xs">Update your profile information</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        We'll never share your email with anyone else.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="moderator">Moderator</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select your role in the organization.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Input placeholder="Tell us about yourself" {...field} />
                      </FormControl>
                      <FormDescription>
                        Brief description for your profile.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner data-icon="inline-start" aria-label="Saving changes" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="admin-card-shadow">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-lg leading-7 tracking-normal">Form Features</CardTitle>
            <CardDescription className="text-xs">What this demo includes</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 px-4 pb-4 pt-2">
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium">Validation</h4>
              <p className="text-sm text-muted-foreground">
                Built-in form validation using Zod schema with helpful error messages.
              </p>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium">Accessibility</h4>
              <p className="text-sm text-muted-foreground">
                Fully accessible form controls with proper labels and descriptions.
              </p>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium">Type Safety</h4>
              <p className="text-sm text-muted-foreground">
                TypeScript support with full type inference for form values.
              </p>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium">Permission Control</h4>
              <p className="text-sm text-muted-foreground">
                This page is protected by Casbin RBAC. Only users with proper permissions can access it.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
