function Contact() {
  return (
    <div className="bg-ivory min-h-screen px-8 py-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <p className="font-body text-sm uppercase tracking-widest text-terracotta mb-4">
            Get in touch
          </p>
          <h1 className="font-heading text-4xl text-espresso">
            Say Hello
          </h1>
        </div>

        <form className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Your name"
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-terracotta"
          />
          <input
            type="email"
            placeholder="Your email"
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-terracotta"
          />
          <textarea
            placeholder="Your message"
            rows={5}
            className="font-body px-4 py-3 rounded-md border border-sage/40 bg-white text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-terracotta resize-none"
          />
          <button
            type="submit"
            className="bg-terracotta text-ivory font-body px-8 py-3 rounded-full hover:bg-espresso transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact