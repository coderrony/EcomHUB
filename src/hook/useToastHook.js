"use client";
import { useToast } from "@/components/ui/use-toast";

function useToastHook() {
  const { toast } = useToast();

  return ({ variant, title, description }) => {
    toast({
      variant: variant,
      title: title,
      description: description,
    });
  };
}

export default useToastHook;
