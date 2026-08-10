"use client";

import { Button } from "@lucmed/ui/components/button";
import { Input } from "@lucmed/ui/components/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type PasswordInputProps = Omit<React.ComponentProps<typeof Input>, "type"> & {
  id: string;
};

export function PasswordInput({ id, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={visible ? "text" : "password"}
        className="pr-10"
        autoComplete={props.autoComplete}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground"
        onClick={() => setVisible((value) => !value)}
        aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </Button>
    </div>
  );
}
