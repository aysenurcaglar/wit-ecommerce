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
    <div className="flex flex-col md:flex-row justify-center items-center gap-16 p-12 bg-gray">
      {logos.map((logo, index) => (
        <img
          key={index}
          src={`/${logo}`}
          alt={`Brand logo ${index + 1}`}
          className="h-16 w-auto" // adjust size as needed
          loading="lazy" // for performance
        />
      ))}
    </div>
  );
};

export default BrandLogos;
