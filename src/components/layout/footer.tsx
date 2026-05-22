import Container from "../shared/container";

export default function Footer() {
  return (
    <footer className="border-t bg-white py-10">
      <Container>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

          <div>
            <h2 className="text-xl font-bold text-blue-600">
              SkyBook Airlines
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Modern flight booking platform.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 SkyBook Airlines. All rights reserved.
          </p>

        </div>

      </Container>
    </footer>
  );
}