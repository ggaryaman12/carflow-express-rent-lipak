import logoImg from "@/assets/super-logo.png";

type Props = {
  className?: string;
};

/**
 * Official SUPER Rental wordmark — uses the brand image asset.
 */
export function SuperLogo({ className = "" }: Props) {
  return (
    <img
      src={logoImg}
      alt="SUPER Rental"
      width={143}
      height={47}
      className={`h-9 w-auto select-none md:h-10 ${className}`}
      draggable={false}
    />
  );
}
