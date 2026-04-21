import { MessageCircle, Loader2 } from "lucide-react";

type Props = {
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  full?: boolean;
  label?: string;
};

export function WhatsAppButton({ loading, disabled, onClick, full, label = "Continue Booking on WhatsApp" }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[oklch(0.62_0.18_152)] px-6 py-4 text-base font-semibold text-white shadow-lg transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
        full ? "w-full" : ""
      }`}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageCircle className="h-5 w-5" />}
      {label}
    </button>
  );
}
