import { Poppins } from "next/font/google";
import Navigation from "../components/Navigation";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

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
      <body className={`${poppins.variable} font-sans antialiased min-h-screen flex flex-col bg-bgPrimary`}>
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
