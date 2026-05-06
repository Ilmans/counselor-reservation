import cn from "classnames";

interface ChipProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "blue" | "red" | "green";
  mode?: "filled" | "outlined";
  as?: "button" | "span" | "div";
  className?: string;
}

export function Button({
  variant = "default",
  mode = "filled",
  as: Tag = "button",
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <Tag
      className={cn(
        "px-3.5 py-[5px] text-[12px] font-medium transition-colors border",

        // default — gelap di light, cerah di dark
        {
          "bg-zinc-900 text-zinc-100 border-zinc-900 dark:bg-zinc-200 dark:text-zinc-900 dark:border-zinc-200":
            variant === "default" && mode === "filled",
          "bg-transparent text-zinc-900 border-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:border-zinc-600 dark:hover:bg-zinc-800":
            variant === "default" && mode === "outlined",
        },

        // blue
        {
          "bg-blue-600 text-white border-blue-600 dark:bg-blue-400 dark:text-blue-950 dark:border-blue-400":
            variant === "blue" && mode === "filled",
          "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-600 dark:hover:bg-blue-950":
            variant === "blue" && mode === "outlined",
        },

        // red
        {
          "bg-red-600 text-white border-red-600 dark:bg-red-400 dark:text-red-950 dark:border-red-400":
            variant === "red" && mode === "filled",
          "bg-transparent text-red-600 border-red-600 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-950":
            variant === "red" && mode === "outlined",
        },

        // green
        {
          "bg-green-600 text-white border-green-600 dark:bg-green-400 dark:text-green-950 dark:border-green-400":
            variant === "green" && mode === "filled",
          "bg-transparent text-green-600 border-green-600 hover:bg-green-50 dark:text-green-400 dark:border-green-600 dark:hover:bg-green-950":
            variant === "green" && mode === "outlined",
        },

        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
