function About() {
  return (
    <div className="bg-ivory min-h-screen px-8 py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="font-body text-sm uppercase tracking-widest text-terracotta mb-4">
          About us
        </p>
        <h1 className="font-heading text-4xl md:text-5xl text-espresso mb-6">
          The story behind Marigold & Thread
        </h1>
        <p className="font-body text-espresso/70 leading-relaxed">
          What started as a personal collection of thrifted treasures grew into 
          a small studio dedicated to reviving forgotten fashion. We believe the 
          most beautiful pieces are the ones with a history — worn-in lace, 
          hand-stitched hems, fabrics that have already seen a lifetime of moments.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-2xl text-espresso mb-4 text-center">
          Our process
        </h2>
        <p className="font-body text-espresso/70 leading-relaxed text-center">
          Every piece is sourced individually, inspected for quality, and 
          restored by hand where needed — never mass-produced, never rushed.
        </p>
      </div>
    </div>
  )
}

export default About