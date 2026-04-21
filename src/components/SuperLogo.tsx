type Props = {
  className?: string;
};

/**
 * SUPER wordmark — italic, ultra-bold, monochrome.
 * Inspired by the SUPER Rental brand (white wordmark on black).
 */
export function SuperLogo({ className = "" }: Props) {
  return (
    <div className={`flex flex-col leading-none ${className}`}>
      <span
        className="text-[22px] font-black italic tracking-[-0.02em] text-white md:text-[26px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        SUPER
      </span>
      <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.42em] text-white/55 md:text-[10px]">
        Rental
      </span>
    </div>
  );
}
