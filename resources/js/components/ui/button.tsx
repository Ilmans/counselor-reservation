import cn from "classnames";

interface ChipProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "blue" | "red" | "green";
  mode?: "filled" | "outlined";
  as?: "button" | "span" | "div";
  hoverable?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Button({
  variant = "default",
  mode = "filled",
  as: Tag = "button",
  hoverable = true,
  disabled = false,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <Tag
      className={cn(
        "px-3.5 py-[5px] text-[12px] font-medium transition-colors border",

        // disabled
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",

        // default
        {
          "bg-zinc-900 text-zinc-100 border-zinc-900 dark:bg-zinc-200 dark:text-zinc-900 dark:border-zinc-200":
            variant === "default" && mode === "filled",
          "hover:bg-zinc-700 dark:hover:bg-zinc-400":
            variant === "default" && mode === "filled" && hoverable && !disabled,

          "bg-transparent text-zinc-900 border-zinc-900 dark:text-zinc-300 dark:border-zinc-600":
            variant === "default" && mode === "outlined",
          "hover:bg-zinc-100 dark:hover:bg-zinc-800":
            variant === "default" && mode === "outlined" && hoverable && !disabled,
        },

        // blue
        {
          "bg-blue-600 text-white border-blue-600 dark:bg-blue-400 dark:text-blue-950 dark:border-blue-400":
            variant === "blue" && mode === "filled",
          "hover:bg-blue-700 dark:hover:bg-blue-500":
            variant === "blue" && mode === "filled" && hoverable && !disabled,

          "bg-transparent text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-600":
            variant === "blue" && mode === "outlined",
          "hover:bg-blue-50 dark:hover:bg-blue-950":
            variant === "blue" && mode === "outlined" && hoverable && !disabled,
        },

        // red
        {
          "bg-red-600 text-white border-red-600 dark:bg-red-400 dark:text-red-950 dark:border-red-400":
            variant === "red" && mode === "filled",
          "hover:bg-red-700 dark:hover:bg-red-500":
            variant === "red" && mode === "filled" && hoverable && !disabled,

          "bg-transparent text-red-600 border-red-600 dark:text-red-400 dark:border-red-600":
            variant === "red" && mode === "outlined",
          "hover:bg-red-50 dark:hover:bg-red-950":
            variant === "red" && mode === "outlined" && hoverable && !disabled,
        },

        // green
        {
          "bg-green-600 text-white border-green-600 dark:bg-green-400 dark:text-green-950 dark:border-green-400":
            variant === "green" && mode === "filled",
          "hover:bg-green-700 dark:hover:bg-green-500":
            variant === "green" && mode === "filled" && hoverable && !disabled,

          "bg-transparent text-green-600 border-green-600 dark:text-green-400 dark:border-green-600":
            variant === "green" && mode === "outlined",
          "hover:bg-green-50 dark:hover:bg-green-950":
            variant === "green" && mode === "outlined" && hoverable && !disabled,
        },

        className
      )}
      {...(Tag === "button" && { disabled })}
      {...props}
    >
      {children}
    </Tag>
  );
}
