import Card from "./Card";

const Search = () => {
  const items = [
    {
      id: 1,
      icon: "properties",
      name: "properties",
      url: "/",
      desc: "Search for properties for sale & rent",
    },
    {
      id: 2,
      icon: "compounds",
      name: "compounds",
      url: "/",
      desc: "Compare all compound features & prices",
    },
    {
      id: 3,
      icon: "online-expos",
      name: "online expos",
      url: "/",
      desc: "Book exclusive offers via your credit card",
    },
    {
      id: 4,
      icon: "mortgage",
      name: "mortgage",
      url: "/",
      desc: "Get property financing easily",
    },
  ];
  return (
    <section className="section-gap">
      <div className="container">
        <h3 className="mb-4 text-2xl font-semibold uppercase text-accent">
          Search
        </h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <Card
              key={item.id}
              icon={item.icon}
              name={item.name}
              url={item.url}
              desc={item.desc}
              id={item.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Search;
