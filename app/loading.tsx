export default function Loading() {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-3 bg-primary/10 rounded-full flex items-center justify-center text-xl">🧶</div>
        </div>
        <p className="font-playfair text-text-secondary text-sm italic">Loading handmade goodness...</p>
      </div>
    </div>
  );
}
