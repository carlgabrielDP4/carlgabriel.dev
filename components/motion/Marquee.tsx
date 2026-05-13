"use client";

import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
};

export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className,
  itemClassName,
}: Props) {
  return (
    <div className={cn("relative flex w-full overflow-hidden", className)}>
      <div
        className={cn("flex shrink-0 items-center gap-12 pr-12 will-change-transform", itemClassName)}
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
        }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn("flex shrink-0 items-center gap-12 pr-12 will-change-transform", itemClassName)}
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
