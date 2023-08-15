import Image from "next/image";
import { MdArrowDropDown } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import createIcon from "../custom/createIcon";
const HeaderNav = () => {
  const items = [
    {
      id: 1,
      name: "search",
      links: [
        { id: 1, icon: "properties", name: "properties", url: "/" },
        { id: 2, icon: "compounds", name: "compounds", url: "/" },
        { id: 3, icon: "online-expos", name: "online expos", url: "/" },
        { id: 4, icon: "mortgage", name: "mortgage", url: "/" },
      ],
    },
    {
      id: 2,
      name: "know",
      icon: "map",
      links: [
        { id: 1, icon: "valuations", name: "valuations", url: "/" },
        { id: 2, icon: "price-guide", name: "price guide", url: "/" },
        { id: 3, icon: "ask-neighbors", name: "ask the neighbors", url: "/" },
        { id: 5, icon: "top-agents", name: "top agents", url: "/" },
        { id: 6, icon: "exhibits-guide", name: "exhibits guide", url: "/" },
        {
          id: 7,
          icon: "real-estate-index",
          name: "real estate index",
          url: "/",
        },
        { id: 8, icon: "advice-tips", name: "advice & tips", url: "/" },
        { id: 9, icon: "market-research", name: "market & research", url: "/" },
        { id: 10, icon: "know-more", name: "know more.. *", url: "/" },
      ],
    },
    {
      id: 3,
      name: "list",
      icon: "list",
      links: [
        {
          id: 1,
          icon: "list-your-property",
          name: "list your property",
          url: "/",
        },
        {
          id: 2,
          icon: "list-company-property",
          name: "list company property",
          url: "/",
        },
      ],
    },
  ];

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center">
        {items.map((item) => (
          <li key={item.id}>
            <div className="dropdown">
              <label
                tabIndex={item.id}
                className="group flex cursor-pointer items-center gap-2 rounded-[10px] p-2 text-sm font-semibold uppercase leading-6 text-accent transition-colors duration-200 hover:bg-secondary hover:text-black"
              >
                {item.id === 1 ? (
                  <FiSearch className="h-4 w-4" />
                ) : item.id === 2 ? (
                  <div className="h-6 w-6 text-accent dark:group-hover:text-black">
                    {createIcon("map")}
                  </div>
                ) : item.id === 3 ? (
                  <div className="text-accent dark:group-hover:text-black">
                    {createIcon("list")}
                  </div>
                ) : (
                  <Image
                    src={`/images/icons/${item.icon}.svg`}
                    alt={item.name}
                    width={24}
                    height={24}
                  />
                )}

                {item.name}
                {<MdArrowDropDown className="h-6 w-6" />}
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] w-max rounded-[6px] bg-white px-[10px] py-5 shadow-[0_4px_12px_0_rgba(0,0,0,.08)]"
              >
                {item.links.map((link) => (
                  <li key={link.id} className="rounded-[6px] hover:bg-neutral ">
                    <Link
                      href={`${link.url}`}
                      className="text-sm font-semibold capitalize text-black"
                    >
                      {item.id === 2 && link.id === 10 ? (
                        <div className="h-6 w-6 text-[#f9a825]">
                          {createIcon("map")}
                        </div>
                      ) : item.id === 3 && link.id === 1 ? (
                        <div className="text-accent dark:text-black">
                          {createIcon("list")}
                        </div>
                      ) : (
                        <Image
                          src={`/images/icons/${item.name}/${link.icon}.svg`}
                          alt={item.name}
                          width={24}
                          height={24}
                        />
                      )}

                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNav;
