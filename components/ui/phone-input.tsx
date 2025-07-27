import * as React from "react";
import { cn } from "@/lib/utils";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, className, disabled, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center", disabled && "opacity-50")}>
        <div className="absolute left-3 z-10 text-base text-gray-500 select-none flex items-center h-full">+91</div>
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]{10}"
          maxLength={10}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background pl-12 pr-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          value={value}
          onChange={e => {
            // Only allow numbers, max 10 digits
            const digits = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
            // Create a synthetic event with the cleaned value
            const syntheticEvent = {
              ...e,
              target: { 
                ...e.target, 
                name: e.target.name,
                value: digits 
              }
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
          }}
          disabled={disabled}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
PhoneInput.displayName = "PhoneInput"; 