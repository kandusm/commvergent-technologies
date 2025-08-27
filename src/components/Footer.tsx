import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto grid max-w-6xl gap-4 px-6 py-8 text-sm text-gray-600 md:grid-cols-2">
        <div>© {new Date().getFullYear()} CommVergent Technologies</div>
        <div className="md:text-right">
          <Link href="https://automation.commvergent.com">
            CommVerent Automation →
          </Link>
        </div>
      </div>
    </footer>
  );
}
