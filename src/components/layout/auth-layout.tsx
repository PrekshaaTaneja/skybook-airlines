export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white items-center justify-center">
        <h1 className="text-5xl font-bold">
          SkyBook Airlines
        </h1>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
}