import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBlocks, IconEye, IconEyeOff } from "@tabler/icons-react";
import * as z from "zod";
import { LoginAppearanceControls } from "@/components/auth/LoginAppearanceControls";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Form, FormField } from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import {
  type AccentTheme,
  type InterfaceLocale,
  type LoginPosition,
  useUiPreferences,
} from "@/hooks/use-ui-preferences";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";

interface LoginFormValues {
  username: string;
  password: string;
}

type LoginError = "invalidCredentials" | "generic" | null;

interface LoginCopy {
  brand: string;
  welcome: string;
  description: string;
  username: string;
  usernamePlaceholder: string;
  password: string;
  passwordPlaceholder: string;
  showPassword: string;
  hidePassword: string;
  signIn: string;
  signingIn: string;
  copyright: string;
  invalidCredentials: string;
  generic: string;
  validation: {
    usernameRequired: string;
    passwordRequired: string;
  };
  appearance: {
    toolbar: string;
    position: string;
    positions: Record<LoginPosition, string>;
    language: string;
    languages: Record<InterfaceLocale, string>;
    theme: string;
    themes: Record<AccentTheme, string>;
    darkMode: string;
    lightMode: string;
  };
}

const UI_COPY: Record<InterfaceLocale, LoginCopy> = {
  "zh-CN": {
    brand: "Admin Dashboard",
    welcome: "欢迎回来",
    description: "请输入您的账户信息以开始管理项目",
    username: "用户名",
    usernamePlaceholder: "请输入用户名",
    password: "密码",
    passwordPlaceholder: "请输入密码",
    showPassword: "显示密码",
    hidePassword: "隐藏密码",
    signIn: "登录",
    signingIn: "正在登录",
    copyright: "Admin Dashboard 管理后台",
    invalidCredentials: "用户名或密码错误，请检查后重试。",
    generic: "登录时发生错误，请稍后重试。",
    validation: {
      usernameRequired: "请输入用户名",
      passwordRequired: "请输入密码",
    },
    appearance: {
      toolbar: "登录页外观设置",
      position: "登录框位置",
      positions: {
        left: "居左",
        center: "居中",
        right: "居右",
      },
      language: "语言",
      languages: {
        "zh-CN": "简体中文",
        "en-US": "English",
      },
      theme: "主题色",
      themes: {
        violet: "紫罗兰",
        blue: "海洋蓝",
        teal: "青绿色",
        orange: "暖橙色",
      },
      darkMode: "切换到深色模式",
      lightMode: "切换到浅色模式",
    },
  },
  "en-US": {
    brand: "Admin Dashboard",
    welcome: "Welcome back",
    description: "Enter your account details to start managing your project",
    username: "Username",
    usernamePlaceholder: "Enter your username",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    signIn: "Sign in",
    signingIn: "Signing in",
    copyright: "Admin Dashboard",
    invalidCredentials: "The username or password is incorrect. Please try again.",
    generic: "Something went wrong while signing in. Please try again.",
    validation: {
      usernameRequired: "Enter your username",
      passwordRequired: "Enter your password",
    },
    appearance: {
      toolbar: "Login appearance settings",
      position: "Form position",
      positions: {
        left: "Left",
        center: "Center",
        right: "Right",
      },
      language: "Language",
      languages: {
        "zh-CN": "简体中文",
        "en-US": "English",
      },
      theme: "Accent theme",
      themes: {
        violet: "Violet",
        blue: "Ocean blue",
        teal: "Teal",
        orange: "Warm orange",
      },
      darkMode: "Switch to dark mode",
      lightMode: "Switch to light mode",
    },
  },
};

const LOGIN_POSITION_CLASSES: Record<LoginPosition, string> = {
  left: "lg:justify-start",
  center: "lg:justify-center",
  right: "lg:justify-end",
};

function createLoginSchema(copy: LoginCopy["validation"]) {
  return z.object({
    username: z.string().min(1, copy.usernameRequired),
    password: z.string().min(1, copy.passwordRequired),
  });
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const { preferences, updatePreference } = useUiPreferences();
  const [loginError, setLoginError] = useState<LoginError>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const copy = UI_COPY[preferences.locale];
  const loginSchema = useMemo(() => createLoginSchema(copy.validation), [copy.validation]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "alice",
      password: "alice123",
    },
  });

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const success = await login(values);

      if (success) {
        navigate(from, { replace: true });
        return;
      }

      setLoginError("invalidCredentials");
    } catch {
      setLoginError("generic");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-background relative min-h-[100dvh] overflow-hidden bg-page">
      <header className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
            <IconBlocks aria-hidden="true" />
          </div>
          <span className="sr-only sm:not-sr-only sm:text-base sm:font-semibold">
            {copy.brand}
          </span>
        </div>

        <LoginAppearanceControls
          preferences={preferences}
          copy={copy.appearance}
          onPreferenceChange={updatePreference}
        />
      </header>

      <main
        className={cn(
          "flex min-h-[100dvh] w-full items-center justify-center px-4 pb-6 pt-24 sm:px-8 sm:pb-8 sm:pt-24 lg:px-12",
          LOGIN_POSITION_CLASSES[preferences.position]
        )}
      >
        <Card className="admin-card-shadow w-full max-w-[30rem]">
          <CardHeader className="px-7 pb-0 pt-8 sm:px-10 sm:pt-10">
            <CardTitle>
              <h1 className="text-2xl font-semibold tracking-tight">{copy.welcome}</h1>
            </CardTitle>
            <CardDescription className="pt-1.5 leading-5">{copy.description}</CardDescription>
          </CardHeader>

          <CardContent className="px-7 pt-7 sm:px-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-6"
                noValidate
              >
                <FieldGroup className="gap-5">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid || undefined}>
                        <FieldLabel htmlFor="login-username">{copy.username}</FieldLabel>
                        <InputGroup className="h-10 bg-input-background">
                          <InputGroupInput
                            {...field}
                            id="login-username"
                            autoComplete="username"
                            placeholder={copy.usernamePlaceholder}
                            aria-invalid={fieldState.invalid}
                          />
                        </InputGroup>
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid || undefined}>
                        <FieldLabel htmlFor="login-password">{copy.password}</FieldLabel>
                        <InputGroup className="h-10 bg-input-background">
                          <InputGroupInput
                            {...field}
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder={copy.passwordPlaceholder}
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton
                              size="icon-xs"
                              aria-label={showPassword ? copy.hidePassword : copy.showPassword}
                              title={showPassword ? copy.hidePassword : copy.showPassword}
                              onClick={() => setShowPassword((isVisible) => !isVisible)}
                            >
                              {showPassword ? <IconEyeOff /> : <IconEye />}
                            </InputGroupButton>
                          </InputGroupAddon>
                        </InputGroup>
                        <FieldError errors={[fieldState.error]} />
                      </Field>
                    )}
                  />
                </FieldGroup>

                {loginError ? <FieldError>{copy[loginError]}</FieldError> : null}

                <Button type="submit" size="lg" className="w-full shadow-sm" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner data-icon="inline-start" aria-label={copy.signingIn} />
                      {copy.signingIn}
                    </>
                  ) : (
                    copy.signIn
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="justify-center px-7 pb-7 pt-4 text-xs text-muted-foreground sm:px-10">
            <span>© 2026 {copy.copyright}</span>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
