import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { track } from "@/lib/analytics";
import { Shield, Hand, Grip, Package, Star, MoveRight, Truck, RefreshCw, Lock, Check } from "lucide-react";

const HERO_IMG = "https://images.pexels.com/photos/3912956/pexels-photo-3912956.jpeg";

type Product = {
  id: string;
  name: string;
  href: string;
  img: string;
  desc: string;
  tags: string[];
};

const PRODUCTS: Product[] = [
  {
    id: "hand-grip",
    name: "Hand Grip 60kg",
    href: "https://movemodefit.com.br/produtos/hand-grip-com-ajuste-fortaleca-suas-maos-de-5kg-a-60kg",
    img: "https://images.pexels.com/photos/6824816/pexels-photo-6824816.jpeg",
    desc: "Pegada de aço para fortalecer antebraços e mãos.",
    tags: ["forca", "acessorios"],
  },
  {
    id: "corda",
    name: "Corda de Pular Crossfit Speed",
    href: "https://movemodefit.com.br/produtos/corda-de-pular-profissional-28m-velocidade-ajustavel-em-pvc-treino-de-boxe-cardio-e-fitness-para-adultos-e-criancas",
    img: "https://images.pexels.com/photos/439223/pexels-photo-439223.jpeg",
    desc: "Velocidade e precisão para condicionamento extremo.",
    tags: ["condicionamento"],
  },
  {
    id: "yoga",
    name: "Tapete de Yoga Premium",
    href: "https://movemodefit.com.br/produtos/tapete-de-guia-de-posicao-para-agachamento-80x35cm-multiuso-para-yoga-pilates-e-treinamento-de-quadril-e-perna",
    img: "https://images.pexels.com/photos/8436582/pexels-photo-8436582.jpeg",
    desc: "Estabilidade e conforto para suas práticas.",
    tags: ["yoga", "recuperacao"],
  },
  {
    id: "elastico",
    name: "Kit de Elásticos de Resistência",
    href: "https://movemodefit.com.br/produtos/kit-11-elasticos-extensores-treino-funcional-completo-para-academia-ou-em-casa",
    img: "https://cdn.builder.io/api/v1/image/assets%2F715d05704b64457bbdb28975ac4a94a3%2Fc2fe44f9ee714aa6bd5f4d5c838e8114?format=webp&width=800",
    desc: "Treino funcional completo, em qualquer lugar.",
    tags: ["forca", "funcional"],
  },
  {
    id: "miofascial",
    name: "Rolo de Liberação Miofascial",
    href: "https://movemodefit.com.br/produtos/rolo-de-massagem-em-cortica-natural-pilates-yoga-e-liberacao-miofascial",
    img: "https://cdn.builder.io/api/v1/image/assets%2F715d05704b64457bbdb28975ac4a94a3%2Fb4bd09bf746a4568b96e68629d59c22f?format=webp&width=800",
    desc: "Recuperação muscular e alívio de tensões.",
    tags: ["yoga", "recuperacao"],
  },
];

const TESTIMONIALS = [
  {
    img: "https://images.pexels.com/photos/6740804/pexels-photo-6740804.jpeg",
    text:
      "Desde que comecei a usar os produtos da Move Mode Fit, meus treinos evoluíram significativamente.",
    author: "João S.",
  },
  {
    img: "https://images.pexels.com/photos/13020494/pexels-photo-13020494.jpeg",
    text: "Qualidade excelente e design impecável. Recomendo muito!",
    author: "Maria F.",
  },
  {
    img: "https://images.pexels.com/photos/18720901/pexels-photo-18720901.jpeg",
    text: "Atendimento rápido e produtos duráveis. Experiência 10/10.",
    author: "Carlos T.",
  },
];

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`container mx-auto px-4 py-14 md:py-20 ${className}`}>{children}</section>;
}

function ProductsGrid() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [tab, setTab] = useState<'tudo' | 'forca' | 'condicionamento' | 'yoga'>('tudo');

  const visible = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (tab === 'tudo') return true;
      if (tab === 'forca') return p.tags.includes('forca') || p.tags.includes('funcional');
      if (tab === 'condicionamento') return p.tags.includes('condicionamento');
      if (tab === 'yoga') return p.tags.includes('yoga') || p.tags.includes('recuperacao');
      return true;
    });
  }, [tab]);

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, p: Product) => {
    track({ action: "product_click", category: "ecommerce", label: p.name });
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
      e.preventDefault();
      setOpenId(p.id);
    }
  };

  return (
    <div>
      <div className="mx-auto mb-6 flex max-w-3xl flex-wrap items-center justify-center gap-2">
        {(([
          ['tudo','Tudo'],
          ['forca','Força'],
          ['condicionamento','Condicionamento'],
          ['yoga','Yoga & Recuperação'],
        ]) as [string,string][]).map(([key,label]) => (
          <button key={key} onClick={() => setTab(key as any)} className={`rounded-full px-4 py-2 text-sm transition ${tab===key? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>{label}</button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <Dialog key={p.id} open={openId === p.id} onOpenChange={(o) => setOpenId(o ? p.id : null)}>
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleCardClick(e, p)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm transition will-change-transform hover:scale-[1.01]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <span className="absolute left-3 top-3 z-10 rounded-full bg-cyan-500/90 px-2 py-1 text-[11px] font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]">-10% HOJE</span>
                <img src={p.img} alt={p.name} loading="lazy" width={800} height={600} className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex items-center justify-between px-5 pb-5 pt-4">
                <div>
                  <h3 className="text-white font-semibold">{p.name}</h3>
                  <p className="text-white/70 text-sm">{p.desc}</p>
                  <p className="mt-1 text-xs text-white/60">Parcele no cartão</p>
                </div>
                <MoveRight className="text-white/70" />
              </div>
              <div className="absolute inset-0 hidden items-end justify-between gap-3 bg-black/40 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:flex group-hover:opacity-100">
                <p className="max-w-[70%] text-sm text-white/90">{p.desc}</p>
                <div className="flex gap-2">
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground" onClick={() => track({ action: "ver_produto_overlay", category: "ecommerce", label: p.name })}>Ver Produto</a>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="shrink-0">Detalhes</Button>
                  </DialogTrigger>
                </div>
              </div>
            </a>

            <DialogContent className="max-w-2xl bg-black text-white border-white/10 sm:rounded-2xl">
              <DialogHeader>
                <DialogTitle>{p.name}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-white/10 bg-white/5">
                  <img src={p.img} alt={p.name} loading="lazy" width={800} height={800} className="h-full w-full object-cover object-center" />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-white/80">{p.desc}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-300" /> Durabilidade comprovada</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-300" /> Design ergonômico</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-300" /> Tecnologia antiderrapante</li>
                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-300" /> Fácil de guardar</li>
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground" onClick={() => track({ action: "quickview_ver_produto", category: "ecommerce", label: p.name })}>Ver Produto</a>
                    <a href="https://movemodefit.com.br/" target="_blank" rel="noopener noreferrer" className="rounded-md border border-white/20 px-4 py-2 font-semibold text-white" onClick={() => track({ action: "quickview_compre_agora", category: "ecommerce", label: p.name })}>Compre Agora</a>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="min-w-0 shrink-0 grow-0 basis-full px-2 md:basis-1/2 lg:basis-1/3">
              <div className="h-full rounded-2xl border border-white/10 bg-black/30 p-6">
                <div className="flex items-center gap-4">
                  <img src={t.img} alt={t.author} className="h-12 w-12 rounded-full object-cover" />
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-white/90">“{t.text}”</p>
                <p className="mt-2 text-white/70 text-sm">— {t.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => emblaApi?.scrollTo(i)} className={`h-2 w-2 rounded-full ${selectedIndex === i ? "bg-white" : "bg-white/40"}`} aria-label={`Ir para depoimento ${i + 1}`} />
          ))}
        </div>
        <a
          href="https://movemodefit.com.br"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track({ action: "view_more_testimonials", category: "engagement" })}
          className="text-white/80 underline-offset-4 hover:text-white hover:underline"
        >
          Veja Mais Depoimentos ↗
        </a>
      </div>
    </div>
  );
}

function Benefits() {
  const benefits = [
    { icon: <Shield className="h-6 w-6" />, title: "Durabilidade", desc: "Materiais resistentes para acompanhar sua evolução." },
    { icon: <Hand className="h-6 w-6" />, title: "Design Ergonômico", desc: "Conforto e segurança em cada movimento." },
    { icon: <Grip className="h-6 w-6" />, title: "Tecnologia Antiderrapante", desc: "Aderência superior para treinos intensos." },
    { icon: <Package className="h-6 w-6" />, title: "Fácil de Guardar", desc: "Leve, compacto e prático para o dia a dia." },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {benefits.map((b) => (
        <div key={b.title} className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
          <div className="flex items-center gap-3 text-cyan-300">
            {b.icon}
            <h4 className="font-semibold text-white">{b.title}</h4>
          </div>
          <p className="mt-2 text-sm text-white/80 opacity-90 transition-opacity group-hover:opacity-100">{b.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function MoveModeFit() {
  const [scrolled, setScrolled] = useState(false);
  const [deadline] = useState(() => Date.now() + 24 * 60 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState("00:00:00");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 180);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      const diff = Math.max(0, deadline - Date.now());
      const h = String(Math.floor(diff / 3_600_000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3_600_000) / 60_000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60_000) / 1000)).padStart(2, "0");
      setTimeLeft(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(t);
  }, [deadline]);

  useEffect(() => {
    document.title = "Move Mode Fit — Transforme seu treino";
    const ensureMeta = (name: string, content: string, attr: "name" | "property" = "name") => {
      let el = document.head.querySelector(`meta[${attr}='${name}']`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    ensureMeta("description", "Transforme seu treino com a Move Mode Fit: produtos duráveis, ergonômicos e prontos para sua evolução.");
    ensureMeta("og:title", "Move Mode Fit — Transforme seu treino", "property");
    ensureMeta("og:description", "Equipamentos que acompanham sua evolução.", "property");
    ensureMeta("og:type", "website", "property");
    ensureMeta("og:image", HERO_IMG, "property");

    const pre1 = document.createElement("link"); pre1.rel = "preconnect"; pre1.href = "https://cdn.builder.io"; document.head.appendChild(pre1);
    const pre2 = document.createElement("link"); pre2.rel = "preconnect"; pre2.href = "https://images.pexels.com"; document.head.appendChild(pre2);

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = HERO_IMG;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(pre1);
      document.head.removeChild(pre2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white">
      {/* Banner de urgência */}
      <div className="w-full bg-gradient-to-r from-cyan-600/30 via-violet-600/30 to-fuchsia-600/30 px-4 py-2 text-center text-sm text-white/90">
        Envio em 24h para todo Brasil
      </div>
      {/* Sticky header CTA on scroll */}
      <div className={`fixed left-0 right-0 top-0 z-40 hidden items-center justify-between border-b border-white/10 bg-black/70 px-4 py-2 backdrop-blur md:flex ${scrolled ? "translate-y-0" : "-translate-y-full"} transition-transform`}>
        <span className="text-sm text-white/90">Move Mode Fit</span>
        <a href="https://movemodefit.com.br/" target="_blank" rel="noopener noreferrer" onClick={() => track({ action: "cta_header_compre_agora", category: "ecommerce" })} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Compre Agora</a>
      </div>

      {/* HERO */}
      <div className="relative">
        <div className="absolute inset-0 -z-10">
          <img src={HERO_IMG} alt="Pessoa treinando com equipamentos Move Mode Fit" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </div>
        <Section className="flex min-h-[72vh] flex-col items-center justify-center text-center">
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-4xl font-extrabold md:text-6xl">
            Transforme seu treino. Supere seus limites.
          </motion.h1>
          <p className="mt-3 max-w-xl text-white/80">Equipamentos que acompanham sua evolução.</p>
          <div className="mt-8 flex items-center gap-4">
            <Button onClick={() => { document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); track({ action: "cta_explore_agora", category: "engagement" }); }} className="relative overflow-hidden">
              <span className="relative z-10">Explore Agora</span>
              <span className="absolute inset-0 -z-10 animate-pulse-glow rounded-md" style={{ boxShadow: "0 0 36px 6px rgba(56,189,248,0.35)" }} />
            </Button>
            <a href="https://movemodefit.com.br" target="_blank" rel="noopener noreferrer" className="text-white/80 underline-offset-4 hover:text-white hover:underline" onClick={() => track({ action: "visit_store", category: "navigation", label: "hero_store" })}>
              Loja Oficial ↗
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <Truck className="h-5 w-5 text-cyan-300" />
              <div>
                <p className="text-sm font-medium text-white">Frete rápido</p>
                <p className="text-xs text-white/70">Envio em até 24h</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <RefreshCw className="h-5 w-5 text-cyan-300" />
              <div>
                <p className="text-sm font-medium text-white">7 dias para trocas</p>
                <p className="text-xs text-white/70">Processo simples e rápido</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <Lock className="h-5 w-5 text-cyan-300" />
              <div>
                <p className="text-sm font-medium text-white">Pagamento seguro</p>
                <p className="text-xs text-white/70">Criptografia e proteção</p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* PRODUTOS EM DESTAQUE */}
      <Section className="pt-8" >
        <div id="produtos" className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Produtos em Destaque</h2>
        </div>
        <div className="mt-8">
          <ProductsGrid />
        </div>
      </Section>

      {/* TESTEMUNHOS */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">O que dizem nossos clientes</h2>
        </div>
        <div className="mt-6">
          <Testimonials />
        </div>
      </Section>

      {/* BENEFÍCIOS */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Benefícios dos Produtos</h2>
          <p className="mt-2 text-white/80">Durabilidade, ergonomia, tecnologia e praticidade.</p>
        </div>
        <div className="mt-6">
          <Benefits />
        </div>
      </Section>

      {/* UGC GRID */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Clientes em Ação</h2>
          <p className="mt-2 text-white/80">Inspiração real para o seu próximo treino.</p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {[
            "https://images.pexels.com/photos/13020494/pexels-photo-13020494.jpeg",
            "https://images.pexels.com/photos/18720901/pexels-photo-18720901.jpeg",
            "https://images.pexels.com/photos/6740804/pexels-photo-6740804.jpeg",
            "https://images.pexels.com/photos/8436147/pexels-photo-8436147.jpeg",
            "https://images.pexels.com/photos/8436582/pexels-photo-8436582.jpeg",
            "https://images.pexels.com/photos/6824816/pexels-photo-6824816.jpeg",
          ].map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl border border-white/10">
              <img src={src} alt="Cliente em ação" loading="lazy" className="h-40 w-full object-cover md:h-48" />
            </div>
          ))}
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section className="text-center">
        <h3 className="text-2xl font-bold md:text-3xl">Pronto para elevar seu treino?</h3>
        <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
          <div className="text-sm text-white/80">Oferta termina em <span className="font-semibold text-white">{timeLeft}</span></div>
          <a
            href="https://movemodefit.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track({ action: "cta_compre_agora", category: "ecommerce" })}
            className="relative inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground"
          >
            Compre Agora
            <span className="absolute inset-0 -z-10 animate-pulse-glow rounded-full" style={{ boxShadow: "0 0 48px 8px rgba(56,189,248,0.45)" }} />
          </a>
        </div>
      </Section>

      <div className="fixed inset-x-0 bottom-0 z-40 block border-t border-white/10 bg-black/70 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <a
            href="https://movemodefit.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track({ action: "cta_mobile_compre_agora", category: "ecommerce" })}
            className="flex-1 rounded-full bg-primary px-5 py-3 text-center font-bold text-primary-foreground"
          >
            Compre Agora
          </a>
        </div>
      </div>

      <footer className="border-t border-white/10 py-8 text-center text-white/70">
        <a href="https://movemodefit.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-white">
          Move Mode Fit — Loja Oficial
        </a>
      </footer>
    </div>
  );
}
