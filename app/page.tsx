"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Logo from "./components/logo/logo";
import { Button } from "./components/button";

type FormInputs = {
  name: string;
  email: string;
};

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const [formState, setFormState] = useState<
    "initial" | "submitting" | "success" | "error"
  >("initial");

  const onSubmit = handleSubmit(async (formData) => {
    setFormState("submitting");

    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      console.log("response: ", response);

      router.push("/search");
      setFormState("success");
    } catch (error) {
      console.error("Login error:", error);
      setFormState("error");
    }
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)] bg-[#2D445D]">
      <main className="flex flex-col gap-4 row-start-2 items-center">
        <div className="flex flex-col gap-1 items-center">
          <Logo />
          <h1 className="text-3xl font-bold">Fetch a Friend</h1>
          <h2>Where hearts and tails meet</h2>
        </div>
        <div className="w-full max-w-lg rounded-2xl bg-gray-900 p-6 shadow-xl">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full rounded-md border  border-gray-600 px-3 py-2 bg-gray-700"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                id="email"
                placeholder="you@fetch.com"
                className="w-full rounded-md border border-gray-600 px-3 py-2 bg-gray-700"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={formState === "submitting"}
            >
              {formState === "submitting" ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-400 font-medium">
        for the dogs
      </footer>
    </div>
  );
}
