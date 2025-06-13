export function StatsSection() {
  const stats = [
    {
      number: "500+",
      label: "Happy Clients",
      sublabel: "Across 50+ Countries",
      delay: "0s"
    },
    {
      number: "10,000+",
      label: "Successful Placements",
      sublabel: "In the Last 5 Years",
      delay: "0.1s"
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      sublabel: "Based on Feedback",
      delay: "0.2s"
    },
    {
      number: "24/7",
      label: "Support Available",
      sublabel: "Global Time Zones",
      delay: "0.3s"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-neutral-dark to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="animate-fade-in-up" 
              style={{animationDelay: stat.delay}}
            >
              <div className="text-4xl lg:text-6xl font-bold mb-2 gradient-text">{stat.number}</div>
              <div className="text-lg text-gray-300">{stat.label}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
