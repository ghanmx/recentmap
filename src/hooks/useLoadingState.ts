import { useState, useCallback } from "react";
import { useToast } from "./use-toast";

interface UseLoadingStateOptions {
  successMessage?: string;
  errorMessage?: string;
}

export const useLoadingState = (options: UseLoadingStateOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const withLoading = useCallback(async <T,>(
    callback: () => Promise<T>,
  ): Promise<T | undefined> => {
    setIsLoading(true);
    try {
      const result = await callback();
      if (options.successMessage) {
        toast({
          title: "Success",
          description: options.successMessage,
        });
      }
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: options.errorMessage || (error instanceof Error ? error.message : "An error occurred"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [options.successMessage, options.errorMessage, toast]);

  return {
    isLoading,
    withLoading,
  };
};