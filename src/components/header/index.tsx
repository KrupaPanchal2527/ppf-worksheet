import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-blue-100 px-44 py-5">
      <div className="flex items-center justify-between">
        <Link href="/">
          <p className="font-semibold font-sans">PPF Worksheet.</p>
        </Link>

        <div>
          <Link href="/about">
            <span className="text-sm text-slate-600 hover:text-slate-700 hover:underline">
              About
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
