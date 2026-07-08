type Feature = {
  title: string
  description: string
}

const features: Feature[] = [
  {
    title: "Hand-picked pieces",
    description: "Every item is personally sourced and inspected before it reaches you.",
  },
  {
    title: "Sustainably sourced",
    description: "Giving forgotten garments a second life, one careful restoration at a time.",
  },
  {
    title: "Made to last",
    description: "Quality fabrics and construction from an era built for longevity.",
  },
]

function WhyChooseUs() {
  return (
    <section className="bg-ivory px-8 py-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {features.map((feature) => (
          <div key={feature.title}>
            <h3 className="font-heading text-2xl text-espresso mb-3">
              {feature.title}
            </h3>
            <p className="font-body text-sm text-espresso/70 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhyChooseUs