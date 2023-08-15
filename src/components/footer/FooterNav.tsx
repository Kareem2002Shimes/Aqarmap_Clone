import Image from "next/image";
import Link from "next/link";

const FooterNav = () => {
  const navLinks = [
    { id: 1, name: "About Us", url: "" },
    { id: 2, name: "Jobs", url: "" },
    { id: 3, name: "Contact", url: "" },
    { id: 4, name: "Sitemap", url: "" },
    { id: 5, name: "Terms", url: "" },
  ];
  const mobileLinks = [
    { id: 1, icon: "google-play", url: "" },
    { id: 2, icon: "app-store", url: "" },
  ];
  return (
    <nav>
      <ul className="mb-8 flex flex-wrap items-center gap-4">
        {navLinks.map((link) => (
          <li key={link.id}>
            <Link
              href={`/${link.url}`}
              className="relative  pr-8 text-sm font-semibold text-white transition-colors duration-200 after:absolute after:right-0 after:top-[50%] after:h-[8px] after:w-[8px] after:translate-y-[-50%] after:rounded-full after:bg-white after:content-[''] hover:text-accent after:hover:bg-black dark:hover:text-black"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex items-center gap-4">
        {mobileLinks.map((link) => (
          <li key={link.id}>
            <Link href={"/"}>
              <Image
                src={`/images/${link.icon}.svg`}
                alt={link.icon}
                height={32}
                width={120}
                className="object-contain"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterNav;
