const BrandLogos = () => {
  const logos = [
    "fa-brands-1.svg",
    "fa-brands-2.svg",
    "fa-brands-3.svg",
    "fa-brands-4.svg",
    "fa-brands-5.svg",
    "fa-brands-6.svg",
  ];

  return (
    <div className="flex flex-col items-center md:flex-row md:flex-wrap md:justify-center md:space-y-0 xl:flex-nowrap gap-16 py-12 bg-gray">
      {logos.map((logo, index) => (
        <img
          key={index}
          src={`/${logo}`}
          alt={`Brand logo ${index + 1}`}
          className="h-16 w-1/2 md:w-1/4 xl:w-auto" // adjust size as needed
          loading="lazy" // for performance
        />
      ))}
    </div>
  );
};

export default BrandLogos;
