import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, rightElement, leftElement, type, ...props }, ref) => {
    if (leftElement) {
      return (
        <div className="group flex items-center rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-ring">
          <div className="flex h-9 items-center rounded-l-md border-r-0 bg-muted px-3 font-medium text-foreground shadow-sm">
            {leftElement}
          </div>
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-l-none rounded-r-md border border-l-0 border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>
      )
    }
    return rightElement ? (
      <div className="group flex items-center rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-ring">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-l-md rounded-r-none border border-r-0 border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        <div className="flex h-9 items-center rounded-r-md border-l-0 bg-muted px-3 font-medium text-foreground shadow-sm">
          {rightElement}
        </div>
      </div>
    ) : (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
