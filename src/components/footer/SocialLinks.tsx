import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const SocialLinks = () => {
  const links = [
    { id: 1, icon: "facebook", url: "" },
    { id: 2, icon: "instagram", url: "" },
    { id: 3, icon: "youtube", url: "" },
    { id: 4, icon: "twitter", url: "" },
  ];
  const iconStyles =
    "w-6 h-6 text-white hover:text-accent dark:hover:text-black transition-colors duration-200";
  return (
    <nav>
      <ul className="mt-10 flex items-center gap-8">
        {links.map((link) => (
          <li key={link.id}>
            <Link href={`/${link.url}`}>
              {link.icon === "facebook" ? (
                <FaFacebookF className={iconStyles} />
              ) : link.icon === "instagram" ? (
                <FaInstagram className={iconStyles} />
              ) : link.icon === "youtube" ? (
                <FaYoutube className={iconStyles} />
              ) : (
                link.icon === "twitter" && <FaTwitter className={iconStyles} />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SocialLinks;
