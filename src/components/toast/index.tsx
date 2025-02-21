"use client";

import type React from "react";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-xl",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-lg group-[.toast]:font-medium",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-lg group-[.toast]:font-medium",
          title: "group-[.toast]:font-semibold group-[.toast]:text-foreground",
          success:
            "group-[.toast]:text-green-600 dark:group-[.toast]:text-green-500",
          error: "group-[.toast]:text-red-600 dark:group-[.toast]:text-red-500",
          info: "group-[.toast]:text-blue-600 dark:group-[.toast]:text-blue-500",
        },
      }}
      {...props}
    />
  );
}
