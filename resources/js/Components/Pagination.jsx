import { Link } from "@inertiajs/react";

export default function Pagination({ links, queryParams = {} }) {
  const buildHref = (url) => {
    if (!url) return "";

    const nextUrl = new URL(url, window.location.origin);
    const params = new URLSearchParams(nextUrl.search);

    Object.entries(queryParams).forEach(([key, value]) => {
      if (key === "page") return;
      if (value !== null && value !== undefined && value !== "") {
        params.set(key, String(value));
      }
    });

    nextUrl.search = params.toString();
    return nextUrl.toString();
  };

  return (
    <nav className="text-center mt-4">
      {links.map((link) => (
        <Link
          preserveScroll
          href={buildHref(link.url)}
          key={link.label}
          className={
            "inline-block py-2 px-3 rounded-lg text-gray-200 text-xs" +
            (link.active ? "bg-gray-950 " : " ") +
            (!link.url ? "text-gray-500 cursor-not-allowed" : "hover:bg-gray-950")
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  );
}