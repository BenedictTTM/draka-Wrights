import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "UG Sexual Harassment Policy",
  description: "University of Ghana Sexual Harassment Policy MVP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col pt-16 font-sans">
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4 md:px-6 shadow-sm">
           <Link href="/" className="font-bold text-[#9B1D2C] text-lg md:text-xl tracking-tight shrink-0">UG Policy</Link>
           <nav className="flex gap-4 md:gap-6 text-sm font-medium text-gray-600 overflow-x-auto whitespace-nowrap px-4 py-2 hidden-scrollbar w-full md:w-auto md:ml-auto">
             <Link href="/about-policy" className="hover:text-[#9B1D2C]">About</Link>
             <Link href="/definitions" className="hover:text-[#9B1D2C]">Definitions</Link>
             <Link href="/reporting" className="hover:text-[#9B1D2C]">Reporting</Link>
             <Link href="/committee" className="hover:text-[#9B1D2C]">Committee</Link>
             <Link href="/resources" className="hover:text-[#9B1D2C]">Resources</Link>
             <Link href="/procedures" className="hover:text-[#9B1D2C]">Procedures</Link>
             <Link href="/faq" className="hover:text-[#9B1D2C]">FAQ</Link>
           </nav>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-gray-100 py-8 text-center text-sm text-gray-500 mt-auto border-t border-gray-200">
          <p>&copy; 2017 Public Affairs, University of Ghana</p>
          <p className="mt-2"><a href="#" className="text-[#9B1D2C] hover:underline">Download Official Policy PDF</a></p>
        </footer>
      </body>
    </html>
  );
}
