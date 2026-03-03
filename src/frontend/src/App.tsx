import {
  ArrowRight,
  Briefcase,
  Building2,
  Camera,
  Car,
  CheckCircle,
  ChevronDown,
  Clock,
  Facebook,
  Footprints,
  Heart,
  Instagram,
  Loader2,
  MapPin,
  Menu,
  MountainSnow,
  Phone,
  Shield,
  Sparkles,
  Star,
  Tent,
  TreePine,
  Twitter,
  User,
  Users,
  Waves,
  X,
  Youtube,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useActor } from "./hooks/useActor";

// ─── Types ──────────────────────────────────────────────────────────────────
interface BlogPost {
  id: bigint;
  title: string;
  content: string;
  publishedAt: bigint;
  author: string;
  excerpt: string;
  category: string;
}

interface InquiryForm {
  name: string;
  phone: string;
  destination: string;
  travelDate: string;
  numberOfGuests: string;
  budgetRange: string;
  specialRequirements: string;
}

// ─── Custom Hook: Intersection Observer ─────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Destinations Data ───────────────────────────────────────────────────────
const destinations = [
  {
    name: "Mussoorie",
    image: "/assets/generated/mussoorie.dim_600x400.jpg",
    desc: "Queen of Hills with misty valleys and colonial charm",
    activities: ["Trekking", "Cable Car", "Paragliding"],
  },
  {
    name: "Kasol",
    image: "/assets/generated/kasol.dim_600x400.jpg",
    desc: "Himalayan river valley with serene pine forests",
    activities: ["Trekking", "Camping", "River Walk"],
  },
  {
    name: "Manali",
    image: "/assets/generated/manali.dim_600x400.jpg",
    desc: "Snow-capped peaks and adventure capital of Himachal",
    activities: ["Skiing", "Paragliding", "Rafting"],
  },
  {
    name: "Shimla",
    image: "/assets/generated/shimla.dim_600x400.jpg",
    desc: "Colonial hill station with panoramic Himalayan views",
    activities: ["Nature Walk", "Toy Train", "Heritage Tour"],
  },
  {
    name: "Jim Corbett",
    image: "/assets/generated/jim-corbett.dim_800x600.jpg",
    desc: "India's oldest national park, home to Bengal tigers",
    activities: ["Jeep Safari", "Bird Watching", "Wildlife Photography"],
  },
  {
    name: "Kausani",
    image: "/assets/generated/kausani.dim_600x400.jpg",
    desc: "Sunrise panoramas over Trishul and Nanda Devi peaks",
    activities: ["Trekking", "Tea Garden Tour", "Sunrise Walk"],
  },
  {
    name: "Ranikhet",
    image: "/assets/generated/ranikhet.dim_600x400.jpg",
    desc: "Serene cantonment town with Himalayan apple orchards",
    activities: ["Golf", "Nature Walk", "Apple Orchards"],
  },
  {
    name: "Nainital",
    image: "/assets/generated/nainital.dim_600x400.jpg",
    desc: "Emerald lake surrounded by oak-covered hills",
    activities: ["Boating", "Ropeway", "Trekking"],
  },
  {
    name: "Haridwar",
    image: "/assets/generated/haridwar.dim_600x400.jpg",
    desc: "Sacred Ganga ghats with divine evening Aarti",
    activities: ["Ganga Aarti", "Temple Tour", "Yoga"],
  },
  {
    name: "Rishikesh",
    image: "/assets/generated/rishikesh.dim_600x400.jpg",
    desc: "Yoga capital with thrilling river rafting adventures",
    activities: ["River Rafting", "Bungee Jumping", "Yoga"],
  },
  {
    name: "Kedarnath",
    image: "/assets/generated/kedarnath.dim_600x400.jpg",
    desc: "Sacred Shiva shrine amidst snow-capped Himalayas",
    activities: ["Pilgrimage Trek", "Helicopter Ride", "Camping"],
  },
  {
    name: "Tungnath",
    image: "/assets/generated/tungnath.dim_600x400.jpg",
    desc: "World's highest Shiva temple with alpine meadows",
    activities: ["High Altitude Trek", "Photography", "Camping"],
  },
  {
    name: "Shree Khand",
    image: "/assets/generated/shreekhand.dim_600x400.jpg",
    desc: "Challenging Himalayan trek to ancient Shiva peak",
    activities: ["Extreme Trek", "Snow Crossing", "Adventure"],
  },
  {
    name: "Spiti Valley",
    image: "/assets/generated/spiti.dim_600x400.jpg",
    desc: "Cold desert valley with ancient monasteries",
    activities: ["Monastery Tour", "Camping", "Snow Leopard Trail"],
  },
  {
    name: "Auli",
    image: "/assets/generated/auli.dim_600x400.jpg",
    desc: "India's premier ski resort with Nanda Devi views",
    activities: ["Skiing", "Cable Car", "Snow Activities"],
  },
];

const packages = [
  {
    id: "solo",
    label: "Solo",
    description:
      "Tailored solo adventures with private guides, flexible itineraries, and handpicked stays. Perfect for solo explorers seeking freedom and discovery.",
  },
  {
    id: "couple",
    label: "Couple",
    description:
      "Romantic escapes designed for two — intimate resorts, candlelit dinners, private safaris, and unforgettable mountain sunsets.",
  },
  {
    id: "family",
    label: "Family",
    description:
      "Family-first itineraries balancing adventure and relaxation. Kid-friendly activities, spacious resorts, and smooth end-to-end logistics.",
  },
  {
    id: "friends",
    label: "Friends",
    description:
      "Group adventures built for fun — shared campsites, group treks, river rafting, and party-friendly accommodations.",
  },
  {
    id: "bachelor",
    label: "Bachelor",
    description:
      "Epic bachelor trips with adventure sports, night camps, bonfire evenings, and adrenaline-packed experiences across the Himalayas.",
  },
  {
    id: "honeymoon",
    label: "Honeymoon",
    description:
      "Luxurious honeymoon packages with scenic mountain resorts, flower-decked rooms, couple spa packages, and private experiences.",
  },
  {
    id: "custom",
    label: "Customized",
    description:
      "Build your own dream trip — choose your destination, duration, activities, and accommodation. We handle everything else.",
  },
];

const staticBlogs = [
  {
    id: 1,
    title: "Best Time to Visit Jim Corbett",
    category: "Wildlife",
    excerpt:
      "Discover the ideal months for spotting tigers and other wildlife in India's most famous national park.",
    author: "Sawigo Team",
    date: "Jan 2026",
  },
  {
    id: 2,
    title: "Luxury Stays in Manali: Our Top Picks",
    category: "Luxury Stays",
    excerpt:
      "From riverside resorts to mountain chalets — the finest places to stay in Manali for every budget.",
    author: "Sawigo Team",
    date: "Feb 2026",
  },
  {
    id: 3,
    title: "Kedarnath Trek: Complete Guide 2026",
    category: "Trekking",
    excerpt:
      "Everything you need to know about the Kedarnath pilgrimage trek, including best routes and permits.",
    author: "Sawigo Team",
    date: "Mar 2026",
  },
];

const adventures = [
  {
    icon: Footprints,
    label: "Hiking",
    desc: "Scenic trails through lush forests and mountain ridges",
  },
  {
    icon: Tent,
    label: "Camping",
    desc: "Under-the-stars camps with bonfire and panoramic views",
  },
  {
    icon: TreePine,
    label: "Jungle Safari",
    desc: "Thrilling wildlife encounters in national parks",
  },
  {
    icon: MountainSnow,
    label: "Trekking",
    desc: "High-altitude treks from beginner to expert level",
  },
  {
    icon: Waves,
    label: "River Rafting",
    desc: "White water rafting on Ganga, Beas, and Alaknanda",
  },
  {
    icon: Camera,
    label: "Snow Activities",
    desc: "Skiing, snowboarding, and snow trekking in Auli",
  },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Destinations", href: "#destinations" },
    { label: "Experiences", href: "#experiences" },
    { label: "Adventure", href: "#adventure" },
    { label: "Packages", href: "#packages" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNav = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-sawigo-navy shadow-navy py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNav("#home")}
          className="flex flex-col leading-none"
          aria-label="Go to top"
        >
          <span className="font-fraunces text-2xl sm:text-3xl font-bold text-gradient-gold tracking-tight">
            Sawigo Trip
          </span>
          <span className="text-xs text-white/60 font-outfit tracking-widest uppercase">
            Creating Memories, Not Just Trips.
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.href}
              data-ocid="nav.link"
              onClick={() => handleNav(link.href)}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-sawigo-orange transition-colors rounded-lg hover:bg-white/5"
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:+918630225151"
            className="ml-3 btn-gold px-5 py-2 text-sm font-bold rounded-full gold-glow"
          >
            Call Now
          </a>
        </nav>

        {/* Mobile buttons */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="tel:+918630225151"
            className="btn-gold px-4 py-2 text-xs font-bold rounded-full"
          >
            Call
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-sawigo-navy/98 backdrop-blur-sm border-t border-white/10 py-4">
          <nav className="flex flex-col px-4 gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                data-ocid="nav.link"
                onClick={() => handleNav(link.href)}
                className="text-left px-4 py-3 text-white/80 hover:text-sawigo-orange hover:bg-white/5 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sawigo-navy/40 via-sawigo-navy/30 to-sawigo-navy/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-sawigo-navy/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-5xl mx-auto pt-20">
        <div className="inline-block bg-sawigo-orange/20 border border-sawigo-orange/40 rounded-full px-5 py-1.5 mb-6 backdrop-blur-sm">
          <span className="text-sawigo-orange text-sm font-semibold tracking-wider uppercase">
            Delhi NCR's #1 Luxury Travel Partner
          </span>
        </div>

        <h1 className="font-fraunces text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
          Ready for Your
          <br />
          <span className="text-gradient-gold">Dream Journey?</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed font-outfit font-light">
          Luxury escapes, wildlife adventures, and handcrafted experiences
          across India — designed exclusively for Delhi NCR travelers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={() =>
              document
                .querySelector("#packages")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-gold gold-glow px-8 py-4 text-lg font-bold rounded-full flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Sparkles size={20} />
            Plan My Trip
          </button>

          <a
            data-ocid="hero.secondary_button"
            href="tel:+918630225151"
            className="orange-glow border-2 border-sawigo-orange text-white hover:bg-sawigo-orange px-8 py-4 text-lg font-bold rounded-full flex items-center gap-2 w-full sm:w-auto justify-center transition-all duration-300"
          >
            <Phone size={20} />
            Call Travel Expert
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-14 text-white">
          {[
            { value: "500+", label: "Trips Planned" },
            { value: "1000+", label: "Happy Travelers" },
            { value: "15+", label: "Destinations" },
            { value: "4.9★", label: "Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-fraunces text-3xl font-bold text-gradient-gold">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs tracking-widest uppercase font-outfit">
          Scroll
        </span>
        <ChevronDown size={20} className="scroll-bounce" />
      </div>
    </section>
  );
}

// ─── Trust Bar ────────────────────────────────────────────────────────────────
function TrustBar() {
  const ref = useFadeIn();
  const trustItems = [
    { icon: Clock, label: "24×7 Trip Expert", id: "trust-1" },
    { icon: Building2, label: "No Commission Hotels", id: "trust-2" },
    { icon: Shield, label: "Government Approved Safari", id: "trust-3" },
    { icon: CheckCircle, label: "Zero Hidden Charges", id: "trust-4" },
    { icon: User, label: "Verified Drivers", id: "trust-5" },
  ];

  return (
    <section className="bg-white border-y border-gray-100 py-6 overflow-hidden">
      <div ref={ref} className="fade-in-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-nowrap overflow-x-auto md:flex-wrap md:justify-center gap-4 md:gap-8 pb-2 md:pb-0 scrollbar-hide">
            {trustItems.map((item, i) => (
              <div
                key={item.id}
                className="flex items-center gap-3 whitespace-nowrap px-2 py-1 shrink-0"
              >
                <div className="w-10 h-10 rounded-full bg-sawigo-orange/10 flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-sawigo-orange" />
                </div>
                <span className="font-semibold text-sawigo-navy text-sm md:text-base">
                  {item.label}
                </span>
                {i < trustItems.length - 1 && (
                  <div className="hidden md:block w-px h-6 bg-gray-200 ml-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Jim Corbett Featured ─────────────────────────────────────────────────────
function JimCorbettSection() {
  const ref = useFadeIn();
  const activities = [
    "Jeep Safari",
    "Canter Safari",
    "Nature Walk",
    "Corporate Wildlife Retreat",
    "Luxury Forest Resorts",
  ];
  const waUrl =
    "https://wa.me/918630225151?text=Hi%20Sawigo%20Trip%2C%20I%27m%20interested%20in%20Jim%20Corbett%20package!";

  return (
    <section className="relative min-h-[520px] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/jim-corbett.dim_800x600.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-sawigo-navy/90 via-sawigo-navy/75 to-sawigo-green/40" />

      <div
        ref={ref}
        className="fade-in-section relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 w-full"
      >
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-sawigo-gold/20 border border-sawigo-gold/50 rounded-full px-4 py-1.5 mb-6">
            <Star size={14} className="text-sawigo-gold fill-sawigo-gold" />
            <span className="text-sawigo-gold text-sm font-bold tracking-wide">
              MOST BOOKED
            </span>
          </div>

          <h2 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Experience the Wild
            <br />
            <span className="text-gradient-gold">in Luxury</span>
          </h2>

          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            Stay at premium forest resorts, enjoy government-approved jungle
            safaris, and witness wildlife like never before.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {activities.map((act) => (
              <span
                key={act}
                className="bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full backdrop-blur-sm font-medium"
              >
                {act}
              </span>
            ))}
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold gold-glow inline-flex items-center gap-2 px-8 py-4 text-base font-bold rounded-full"
          >
            Explore Jim Corbett
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Destination Card ─────────────────────────────────────────────────────────
function DestinationCard({
  dest,
  index,
}: {
  dest: (typeof destinations)[0];
  index: number;
}) {
  const waUrl = `https://wa.me/918630225151?text=Hi%20Sawigo%20Trip%2C%20I%27m%20interested%20in%20a%20trip%20to%20${encodeURIComponent(dest.name)}!`;

  return (
    <div
      data-ocid={`destination.item.${index + 1}`}
      className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2 cursor-pointer bg-white"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={dest.image}
          alt={dest.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sawigo-navy/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3">
          <h3 className="font-fraunces text-xl font-bold text-white">
            {dest.name}
          </h3>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-sawigo-orange text-white text-xs font-bold px-3 py-1 rounded-full">
            Explore
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sawigo-navy/70 text-sm mb-3 leading-relaxed line-clamp-2">
          {dest.desc}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {dest.activities.map((act) => (
            <span
              key={act}
              className="bg-sawigo-orange/10 text-sawigo-orange text-xs px-2.5 py-1 rounded-full font-medium border border-sawigo-orange/20"
            >
              {act}
            </span>
          ))}
        </div>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-sawigo-navy text-white hover:bg-sawigo-orange text-sm font-semibold py-2.5 rounded-xl transition-all duration-300"
        >
          Explore {dest.name}
        </a>
      </div>
    </div>
  );
}

// ─── Destinations Grid ────────────────────────────────────────────────────────
function DestinationsSection() {
  const ref = useFadeIn();

  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="fade-in-section text-center mb-14">
          <div className="inline-block bg-sawigo-orange/10 rounded-full px-5 py-1.5 mb-4">
            <span className="text-sawigo-orange text-sm font-bold tracking-wider uppercase">
              Our Destinations
            </span>
          </div>
          <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-sawigo-navy mb-4">
            Explore India's Most{" "}
            <span className="text-sawigo-orange">Breathtaking</span>{" "}
            Destinations
          </h2>
          <p className="text-sawigo-navy/60 max-w-2xl mx-auto text-lg">
            Handpicked escapes across the Himalayas and sacred valleys — curated
            for Delhi NCR travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.name} dest={dest} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stay & Trip Section ──────────────────────────────────────────────────────
function StayTripSection() {
  const ref = useFadeIn();
  const hotelCategories = [
    {
      stars: 3,
      label: "Comfort",
      desc: "Clean, well-located stays with essential amenities and friendly service.",
    },
    {
      stars: 4,
      label: "Premium",
      desc: "Elevated comfort with mountain-view rooms, spa services, and curated dining.",
    },
    {
      stars: 5,
      label: "Luxury",
      desc: "Exclusive forest lodges and heritage resorts with bespoke butler service.",
    },
  ];

  const cabCategories = [
    { label: "Standard", vehicle: "Sedan — Swift Dzire / Etios", icon: Car },
    { label: "Deluxe", vehicle: "SUV — Ertiga / Innova", icon: Car },
    { label: "Premium", vehicle: "Luxury SUV — Innova Crysta", icon: Car },
    { label: "Luxury", vehicle: "Premium — Fortuner / Scorpio N", icon: Car },
  ];

  return (
    <section id="stay" className="py-20 bg-sawigo-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="fade-in-section text-center mb-14">
          <div className="inline-block bg-sawigo-gold/20 rounded-full px-5 py-1.5 mb-4">
            <span className="text-sawigo-gold text-sm font-bold tracking-wider uppercase">
              RG Stay & Trip
            </span>
          </div>
          <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-white mb-4">
            Premium Stay &{" "}
            <span className="text-gradient-gold">Seamless Travel</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            From hand-picked resorts to chauffeur-driven cabs — every detail
            handled by us.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Hotels */}
          <div>
            <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Building2 size={20} className="text-sawigo-gold" />
              Hotel Categories
            </h3>
            <div className="space-y-4">
              {hotelCategories.map((hotel) => (
                <div
                  key={hotel.label}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-sawigo-gold/60 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="flex gap-0.5">
                        {Array.from({ length: hotel.stars }, (_, i) => (
                          <Star
                            key={`star-${hotel.label}-${i}`}
                            size={14}
                            className="text-sawigo-gold fill-sawigo-gold"
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg group-hover:text-sawigo-gold transition-colors">
                        {hotel.label}
                      </div>
                      <div className="text-white/60 text-sm mt-1">
                        {hotel.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cabs */}
          <div>
            <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Car size={20} className="text-sawigo-gold" />
              Cab Categories
            </h3>
            <div className="space-y-4">
              {cabCategories.map((cab) => (
                <div
                  key={cab.label}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-sawigo-orange/60 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-sawigo-orange/20 flex items-center justify-center shrink-0">
                      <cab.icon size={18} className="text-sawigo-orange" />
                    </div>
                    <div>
                      <div className="font-bold text-white group-hover:text-sawigo-orange transition-colors">
                        {cab.label}
                      </div>
                      <div className="text-white/50 text-sm">{cab.vehicle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Row */}
        <div className="border-t border-white/10 pt-8">
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            {[
              {
                icon: User,
                text: "Professional Verified Drivers",
                id: "trust-verified",
              },
              {
                icon: CheckCircle,
                text: "End-to-End Travel Support",
                id: "trust-support",
              },
              {
                icon: Clock,
                text: "24/7 Trip Assistance",
                id: "trust-assistance",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-center gap-3 bg-white/5 rounded-xl py-4 px-5"
              >
                <item.icon size={18} className="text-sawigo-gold shrink-0" />
                <span className="text-white font-medium text-sm">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Experiences Section ──────────────────────────────────────────────────────
function ExperiencesSection() {
  const ref = useFadeIn();
  const waUrl =
    "https://wa.me/918630225151?text=Hi%20Sawigo%20Trip%2C%20I%27d%20like%20to%20customize%20an%20experience!";

  const experiences = [
    {
      id: "wedding",
      icon: Heart,
      label: "Destination Wedding",
      desc: "Magical ceremonies in royal forts, hill station venues, and forest retreats with complete event management.",
      color: "from-rose-900/80 to-sawigo-navy/90",
      image: "/assets/generated/destination-wedding.dim_800x500.jpg",
      hasImage: true,
    },
    {
      id: "prewedding",
      icon: Camera,
      label: "Pre-Wedding Shoot",
      desc: "Cinematic pre-wedding photography in misty mountains, lush forests, and picturesque Himalayan valleys.",
      color: "from-emerald-900 to-sawigo-green",
      hasImage: false,
    },
    {
      id: "corporate",
      icon: Briefcase,
      label: "Corporate Events",
      desc: "Seamless corporate retreats, offsite meetings, team outings, and annual getaways for groups of any size.",
      color: "from-sawigo-navy to-blue-900",
      hasImage: false,
    },
    {
      id: "retreat",
      icon: Sparkles,
      label: "Office Relaxation Retreats",
      desc: "Rejuvenating team retreats with wellness programs, nature therapy, and mindfulness in Himalayan serenity.",
      color: "from-teal-900 to-sawigo-green",
      hasImage: false,
    },
  ];

  return (
    <section id="experiences" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="fade-in-section text-center mb-14">
          <div className="inline-block bg-sawigo-green/10 rounded-full px-5 py-1.5 mb-4">
            <span className="text-sawigo-green text-sm font-bold tracking-wider uppercase">
              Special Experiences
            </span>
          </div>
          <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-sawigo-navy mb-4">
            Crafted Experiences{" "}
            <span className="text-sawigo-orange">Beyond Ordinary</span> Travel
          </h2>
          <p className="text-sawigo-navy/60 max-w-2xl mx-auto text-lg">
            From dream weddings to corporate escapades — every milestone
            deserves a perfect setting.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className={`relative rounded-3xl overflow-hidden min-h-[260px] flex items-end group cursor-pointer ${
                exp.hasImage ? "" : `bg-gradient-to-br ${exp.color}`
              }`}
            >
              {exp.hasImage && (
                <>
                  <img
                    src={exp.image}
                    alt={exp.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${exp.color}`}
                  />
                </>
              )}
              <div className="relative z-10 p-7 w-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <exp.icon size={18} className="text-white" />
                  </div>
                  <h3 className="font-fraunces text-2xl font-bold text-white">
                    {exp.label}
                  </h3>
                </div>
                <p className="text-white/75 text-sm leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold gold-glow inline-flex items-center gap-2 px-10 py-4 text-base font-bold rounded-full"
          >
            <Sparkles size={18} />
            Customize My Experience
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Adventure Section ────────────────────────────────────────────────────────
function AdventureSection() {
  const ref = useFadeIn();
  const waUrl =
    "https://wa.me/918630225151?text=Hi%20Sawigo%20Trip%2C%20I%27d%20like%20to%20book%20an%20adventure!";

  return (
    <section id="adventure" className="relative py-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/adventure-bg.dim_1920x800.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-sawigo-navy/88" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="fade-in-section text-center mb-14">
          <h2 className="font-fraunces text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight">
            WildGo <span className="text-gradient-gold">Adventure</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Push Your Limits. Create Stories That Last Forever.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {adventures.map((adv) => (
            <div
              key={adv.label}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-sawigo-orange/60 hover:bg-sawigo-orange/10 transition-all duration-400 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-sawigo-orange/30 flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <adv.icon
                  size={26}
                  className="text-white group-hover:text-sawigo-orange transition-colors"
                />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 group-hover:text-sawigo-orange transition-colors">
                {adv.label}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold gold-glow inline-flex items-center gap-2 px-10 py-4 text-base font-bold rounded-full"
          >
            Book an Adventure
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Packages & Inquiry ───────────────────────────────────────────────────────
function PackagesSection() {
  const ref = useFadeIn();
  const { actor } = useActor();
  const [activePackage, setActivePackage] = useState("solo");
  const [formData, setFormData] = useState<InquiryForm>({
    name: "",
    phone: "",
    destination: "",
    travelDate: "",
    numberOfGuests: "",
    budgetRange: "",
    specialRequirements: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const currentPackage = packages.find((p) => p.id === activePackage)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const travelDateMs = formData.travelDate
        ? BigInt(new Date(formData.travelDate).getTime()) * BigInt(1_000_000)
        : BigInt(Date.now()) * BigInt(1_000_000);

      if (actor) {
        await actor.submitInquiry({
          name: formData.name,
          phone: formData.phone,
          destination: formData.destination,
          travelDate: travelDateMs,
          numberOfGuests: BigInt(Number.parseInt(formData.numberOfGuests) || 1),
          budgetRange: formData.budgetRange,
          specialRequirements: formData.specialRequirements,
        });
      }
      setSubmitted(true);
    } catch {
      setError(
        "Something went wrong. Please try WhatsApp or call us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="packages" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="fade-in-section text-center mb-12">
          <div className="inline-block bg-sawigo-orange/10 rounded-full px-5 py-1.5 mb-4">
            <span className="text-sawigo-orange text-sm font-bold tracking-wider uppercase">
              Travel Packages
            </span>
          </div>
          <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-sawigo-navy mb-4">
            Find Your{" "}
            <span className="text-sawigo-orange">Perfect Package</span>
          </h2>
        </div>

        {/* Package Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {packages.map((pkg) => (
            <button
              type="button"
              key={pkg.id}
              data-ocid="package.tab"
              onClick={() => setActivePackage(pkg.id)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activePackage === pkg.id
                  ? "bg-sawigo-orange text-white shadow-orange"
                  : "bg-white text-sawigo-navy border border-gray-200 hover:border-sawigo-orange hover:text-sawigo-orange"
              }`}
            >
              {pkg.label}
            </button>
          ))}
        </div>

        {/* Package Description */}
        <div className="text-center mb-12">
          <p className="text-sawigo-navy/70 max-w-xl mx-auto text-base leading-relaxed bg-white rounded-2xl px-6 py-4 shadow-xs border border-gray-100">
            {currentPackage.description}
          </p>
        </div>

        {/* Inquiry Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-navy overflow-hidden border border-gray-100">
            {/* Form Header */}
            <div className="bg-sawigo-navy px-8 py-6">
              <h3 className="font-fraunces text-2xl font-bold text-white mb-1">
                Get Your Custom Travel Plan
              </h3>
              <p className="text-white/60 text-sm">
                Fill in your details — our experts respond in 30 minutes!
              </p>
            </div>

            <div className="p-8">
              {submitted ? (
                <div
                  data-ocid="inquiry.success_state"
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-full bg-sawigo-green/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-sawigo-green" />
                  </div>
                  <h4 className="font-fraunces text-2xl font-bold text-sawigo-navy mb-2">
                    Inquiry Received! 🎉
                  </h4>
                  <p className="text-sawigo-navy/60 mb-6">
                    Our travel expert will call you within 30 minutes. For
                    instant help:
                  </p>
                  <a
                    href="https://wa.me/918630225151?text=Hi%20Sawigo%20Trip%2C%20I%20just%20submitted%20an%20inquiry!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold gold-glow inline-flex items-center gap-2 px-8 py-3 font-bold rounded-full"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="inquiry-name"
                        className="block text-sm font-semibold text-sawigo-navy mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        id="inquiry-name"
                        data-ocid="inquiry.input"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sawigo-orange focus:ring-2 focus:ring-sawigo-orange/20 transition-all"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="inquiry-phone"
                        className="block text-sm font-semibold text-sawigo-navy mb-1.5"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="inquiry-phone"
                        data-ocid="inquiry.input"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sawigo-orange focus:ring-2 focus:ring-sawigo-orange/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-destination"
                      className="block text-sm font-semibold text-sawigo-navy mb-1.5"
                    >
                      Destination *
                    </label>
                    <select
                      id="inquiry-destination"
                      data-ocid="inquiry.select"
                      name="destination"
                      required
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sawigo-orange focus:ring-2 focus:ring-sawigo-orange/20 transition-all bg-white"
                    >
                      <option value="">Select a destination</option>
                      {destinations.map((d) => (
                        <option key={d.name} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                      <option value="Other">Other / Not Sure</option>
                    </select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="inquiry-date"
                        className="block text-sm font-semibold text-sawigo-navy mb-1.5"
                      >
                        Travel Date
                      </label>
                      <input
                        id="inquiry-date"
                        data-ocid="inquiry.input"
                        type="date"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sawigo-orange focus:ring-2 focus:ring-sawigo-orange/20 transition-all"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="inquiry-guests"
                        className="block text-sm font-semibold text-sawigo-navy mb-1.5"
                      >
                        Number of Guests
                      </label>
                      <input
                        id="inquiry-guests"
                        data-ocid="inquiry.input"
                        type="number"
                        name="numberOfGuests"
                        min="1"
                        max="200"
                        value={formData.numberOfGuests}
                        onChange={handleChange}
                        placeholder="e.g. 4"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sawigo-orange focus:ring-2 focus:ring-sawigo-orange/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-budget"
                      className="block text-sm font-semibold text-sawigo-navy mb-1.5"
                    >
                      Budget Range *
                    </label>
                    <select
                      id="inquiry-budget"
                      data-ocid="inquiry.select"
                      name="budgetRange"
                      required
                      value={formData.budgetRange}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sawigo-orange focus:ring-2 focus:ring-sawigo-orange/20 transition-all bg-white"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under ₹10,000">Under ₹10,000</option>
                      <option value="₹10,000–₹25,000">₹10,000 – ₹25,000</option>
                      <option value="₹25,000–₹50,000">₹25,000 – ₹50,000</option>
                      <option value="₹50,000–₹1,00,000">
                        ₹50,000 – ₹1,00,000
                      </option>
                      <option value="Above ₹1,00,000">Above ₹1,00,000</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-special"
                      className="block text-sm font-semibold text-sawigo-navy mb-1.5"
                    >
                      Special Requirements
                    </label>
                    <textarea
                      id="inquiry-special"
                      data-ocid="inquiry.textarea"
                      name="specialRequirements"
                      rows={3}
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      placeholder="Any special requests, dietary needs, accessibility requirements..."
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sawigo-orange focus:ring-2 focus:ring-sawigo-orange/20 transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <div
                      data-ocid="inquiry.error_state"
                      className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm"
                    >
                      {error}
                    </div>
                  )}

                  <button
                    data-ocid="inquiry.submit_button"
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-gold gold-glow py-4 text-base font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                          data-ocid="inquiry.loading_state"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Get My Custom Plan
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────
function AboutSection() {
  const ref = useFadeIn();
  const metrics = [
    { value: "500+", label: "Trips Planned" },
    { value: "1000+", label: "Happy Travelers" },
    { value: "15+", label: "Destinations" },
    { value: "4.9★", label: "Avg Rating" },
  ];
  const features = [
    "End-to-End Support",
    "Budget to Luxury Options",
    "Handling 1 to 100+ Guests",
    "Trusted by Families & Corporate Groups",
  ];

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          ref={ref}
          className="fade-in-section grid lg:grid-cols-2 gap-14 items-center"
        >
          {/* Text */}
          <div>
            <div className="inline-block bg-sawigo-orange/10 rounded-full px-5 py-1.5 mb-5">
              <span className="text-sawigo-orange text-sm font-bold tracking-wider uppercase">
                About Us
              </span>
            </div>
            <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-sawigo-navy mb-6 leading-tight">
              Your Journey is{" "}
              <span className="text-sawigo-orange">Our Responsibility</span>
            </h2>
            <p className="text-sawigo-navy/70 text-lg leading-relaxed mb-6">
              We plan your trip with transparency and zero hidden charges. When
              we are with you, you are never alone. Every detail is crafted with
              love, care, and local expertise.
            </p>
            <p className="text-sawigo-navy/60 mb-8 leading-relaxed">
              From a solo traveler seeking solitude to a corporate group of
              100+, Sawigo Trip handles every journey with personal attention
              and professional finesse.
            </p>
            <ul className="space-y-3">
              {features.map((feat) => (
                <li key={feat} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-sawigo-green flex items-center justify-center shrink-0">
                    <CheckCircle size={12} className="text-white" />
                  </div>
                  <span className="text-sawigo-navy font-medium">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-5">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`bg-gradient-to-br rounded-2xl p-6 text-center ${
                  i % 2 === 0
                    ? "from-sawigo-navy to-sawigo-navy/90"
                    : "from-sawigo-orange to-sawigo-orange/90"
                } shadow-navy`}
              >
                <div className="font-fraunces text-4xl font-bold text-gradient-gold mb-2">
                  {m.value}
                </div>
                <div className="text-white/70 text-sm font-medium">
                  {m.label}
                </div>
              </div>
            ))}
            <div className="col-span-2 bg-sawigo-green/10 border border-sawigo-green/30 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sawigo-green/20 flex items-center justify-center shrink-0">
                <Users size={22} className="text-sawigo-green" />
              </div>
              <div>
                <div className="font-bold text-sawigo-navy">
                  Trusted Since 2019
                </div>
                <div className="text-sawigo-navy/60 text-sm">
                  Serving Delhi NCR's most discerning travelers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Blog Section ─────────────────────────────────────────────────────────────
function BlogSection() {
  const ref = useFadeIn();
  const { actor, isFetching } = useActor();
  const [posts, setPosts] = useState<
    Array<{
      id: number | bigint;
      title: string;
      category: string;
      excerpt: string;
      author: string;
      date: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor || isFetching) return;
    actor
      .getAllBlogPosts()
      .then((data: BlogPost[]) => {
        if (data && data.length > 0) {
          setPosts(
            data.map((p) => ({
              id: p.id,
              title: p.title,
              category: p.category,
              excerpt: p.excerpt,
              author: p.author,
              date: new Date(
                Number(p.publishedAt) / 1_000_000,
              ).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
              }),
            })),
          );
        } else {
          setPosts(staticBlogs);
        }
      })
      .catch(() => setPosts(staticBlogs))
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  const categoryColors: Record<string, string> = {
    Wildlife: "bg-sawigo-green/10 text-sawigo-green border-sawigo-green/30",
    "Luxury Stays": "bg-sawigo-gold/10 text-yellow-700 border-yellow-300",
    Trekking: "bg-sawigo-orange/10 text-sawigo-orange border-sawigo-orange/30",
  };

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="fade-in-section text-center mb-14">
          <div className="inline-block bg-sawigo-navy/5 rounded-full px-5 py-1.5 mb-4">
            <span className="text-sawigo-navy text-sm font-bold tracking-wider uppercase">
              Travel Guides
            </span>
          </div>
          <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-sawigo-navy mb-4">
            Travel Guides &{" "}
            <span className="text-sawigo-orange">Insider Tips</span>
          </h2>
          <p className="text-sawigo-navy/60 max-w-xl mx-auto">
            Expert-written guides to help you plan smarter and travel better.
          </p>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-gray-100"
                data-ocid="blog.loading_state"
              >
                <div className="shimmer-skeleton h-48 w-full" />
                <div className="p-5 space-y-3">
                  <div className="shimmer-skeleton h-4 w-20 rounded-full" />
                  <div className="shimmer-skeleton h-6 w-full rounded" />
                  <div className="shimmer-skeleton h-4 w-4/5 rounded" />
                  <div className="shimmer-skeleton h-4 w-3/5 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <article
                key={String(post.id)}
                data-ocid={`blog.item.${i + 1}`}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-sawigo-orange/30 shadow-card hover:shadow-card-hover transition-all duration-400 overflow-hidden"
              >
                <div className="p-6">
                  <span
                    className={`inline-block text-xs font-bold px-3 py-1 rounded-full border mb-3 ${
                      categoryColors[post.category] ||
                      "bg-gray-100 text-gray-600 border-gray-200"
                    }`}
                  >
                    {post.category}
                  </span>
                  <h3 className="font-fraunces text-xl font-bold text-sawigo-navy mb-3 leading-tight group-hover:text-sawigo-orange transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sawigo-navy/60 text-sm leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-sawigo-navy/50">
                      <User size={12} />
                      <span>{post.author}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                    <button
                      type="button"
                      className="text-sawigo-orange text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read More <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────
function ContactSection() {
  const ref = useFadeIn();

  return (
    <section id="contact" className="py-20 bg-sawigo-navy">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="fade-in-section text-center mb-12">
          <h2 className="font-fraunces text-4xl sm:text-5xl font-bold text-white mb-4">
            Speak to a Travel Expert{" "}
            <span className="text-gradient-gold">in 30 Seconds.</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Our experts are available 24×7 to help you plan the perfect trip.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a
            data-ocid="contact.primary_button"
            href="tel:+918630225151"
            className="btn-gold gold-glow flex items-center justify-center gap-3 px-8 py-4 text-base font-bold rounded-full"
          >
            <Phone size={20} />
            Call Now: +91 8630225151
          </a>
          <a
            data-ocid="contact.secondary_button"
            href="https://wa.me/918630225151?text=Hi%20Sawigo%20Trip%2C%20I%20want%20to%20plan%20a%20trip!"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#1ebe5c] text-white flex items-center justify-center gap-3 px-8 py-4 text-base font-bold rounded-full transition-colors duration-300"
          >
            <svg
              role="img"
              aria-label="WhatsApp"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <title>WhatsApp</title>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Us
          </a>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-sawigo-green/20 to-sawigo-navy/50 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sawigo-orange/20 flex items-center justify-center">
              <MapPin size={24} className="text-sawigo-orange" />
            </div>
            <div className="text-center">
              <div className="text-white font-semibold text-lg">
                Delhi NCR — We Serve All Areas
              </div>
              <div className="text-white/50 text-sm mt-1">
                Covering Delhi, Noida, Gurgaon, Faridabad & Greater Noida
              </div>
            </div>
          </div>
          <div className="px-8 py-6 grid sm:grid-cols-3 gap-4 text-center">
            {[
              {
                label: "Phone",
                value: "+91 8630225151",
                href: "tel:+918630225151",
              },
              {
                label: "WhatsApp",
                value: "wa.me/918630225151",
                href: "https://wa.me/918630225151",
              },
              {
                label: "Office Hours",
                value: "24×7 Available",
                href: undefined,
              },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-white/40 text-xs uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-white font-semibold hover:text-sawigo-orange transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <div className="text-sawigo-gold font-semibold">
                    {item.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Destinations", href: "#destinations" },
    { label: "Experiences", href: "#experiences" },
    { label: "Adventure", href: "#adventure" },
    { label: "Packages", href: "#packages" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const destLinks = [
    "Jim Corbett",
    "Manali",
    "Shimla",
    "Mussoorie",
    "Nainital",
    "Rishikesh",
    "Haridwar",
    "Kedarnath",
    "Spiti Valley",
    "Auli",
  ];

  const services = [
    "Luxury Packages",
    "Wildlife Safaris",
    "Corporate Retreats",
    "Honeymoon Tours",
    "Destination Weddings",
    "Adventure Trips",
  ];

  const socials = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-sawigo-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-fraunces text-3xl font-bold text-gradient-gold mb-2">
              Sawigo Trip
            </div>
            <div className="text-white/50 text-xs tracking-widest uppercase mb-4">
              Creating Memories, Not Just Trips.
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Delhi NCR's premium travel partner for luxury escapes, wildlife
              adventures, and corporate retreats.
            </p>
            <div className="text-white/60 text-xs">
              Luxury Travel | Wildlife | Corporate Retreats | Adventure
              Experiences
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    className="text-white/55 hover:text-sawigo-orange text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm tracking-wider uppercase">
              Top Destinations
            </h4>
            <ul className="space-y-2.5">
              {destLinks.map((dest) => (
                <li key={dest}>
                  <button
                    type="button"
                    onClick={() => handleNav("#destinations")}
                    className="text-white/55 hover:text-sawigo-orange text-sm transition-colors text-left"
                  >
                    {dest}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services + Connect */}
          <div>
            <h4 className="font-bold text-white mb-5 text-sm tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-2.5 mb-7">
              {services.map((svc) => (
                <li key={svc}>
                  <span className="text-white/55 text-sm">{svc}</span>
                </li>
              ))}
            </ul>
            <h4 className="font-bold text-white mb-3 text-sm tracking-wider uppercase">
              Connect
            </h4>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-sawigo-orange flex items-center justify-center transition-colors duration-300"
                >
                  <s.icon size={16} className="text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <div>
            © {new Date().getFullYear()} Sawigo Trip. All rights reserved.
            Designed with ❤️ for Delhi NCR Travelers.
          </div>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating Elements ────────────────────────────────────────────────────────
function FloatingElements() {
  return (
    <>
      {/* WhatsApp FAB */}
      <a
        data-ocid="whatsapp.button"
        href="https://wa.me/918630225151?text=Hi%20Sawigo%20Trip%2C%20I%20want%20to%20plan%20a%20trip!"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="wa-pulse fixed bottom-24 right-5 md:bottom-8 md:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ backgroundColor: "#25D366" }}
      >
        <svg
          role="img"
          aria-label="WhatsApp"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
        >
          <title>WhatsApp</title>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Sticky Mobile Call Bar */}
      <a
        data-ocid="call.button"
        href="tel:+918630225151"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-sawigo-orange text-white text-center py-4 font-bold text-base flex items-center justify-center gap-2 shadow-lg"
      >
        <Phone size={18} />
        Call Now: +91 8630225151
      </a>
    </>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="font-outfit">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <JimCorbettSection />
        <DestinationsSection />
        <StayTripSection />
        <ExperiencesSection />
        <AdventureSection />
        <PackagesSection />
        <AboutSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingElements />
    </div>
  );
}
