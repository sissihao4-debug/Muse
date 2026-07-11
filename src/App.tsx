import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  History,
  Download,
  Music,
  Palette,
  Compass,
  Sparkles,
  Share2,
  Trash2,
  X,
  ChevronRight,
  Volume2,
  Play,
  Pause,
  ArrowRight,
  CornerDownRight
} from "lucide-react";
import { Curation } from "./types";
import { resolvePaintingImage } from "./imageResolver";

// A few preset beautiful loading phrases to soothe the user
const LOADING_PHRASES = [
  "缪斯正在感知您的情绪底色...",
  "正在世界画廊中寻觅光影与笔触...",
  "正在从古典乐章中检索契合的旋律...",
  "正在编织您的感官通感共鸣空间...",
  "今日的美学策展即将为您呈现..."
];

// Beautiful initial curation to show on first entry
const DEFAULT_INITIAL_CURATION: Curation = {
  quote: "林深时见鹿，海蓝时见鲸，梦醒时见你。在平淡岁月中，寻一处诗意盛开的地方。",
  painting: {
    title: "睡莲",
    originalTitle: "Water Lilies",
    artist: "克劳德·莫奈 Claude Monet",
    year: "1916",
    style: "印象主义",
    review: "莫奈的睡莲以模糊的轮廓与斑斓的光影交织，将瞬间的水波与光影永恒定格。粉蓝交错的湖面仿佛是心灵深处最温柔的涟漪，在宁静中散发出淡淡的幽香，抚平红尘中的喧嚣与焦躁。",
    imageKeywords: "claude monet water lilies oil painting"
  },
  music: {
    title: "月光 (Clair de Lune)",
    composer: "克劳德·德彪西 Claude Debussy",
    opus: "L. 75",
    review: "德彪西的《月光》如同一幅流动的印象派画作。晶莹剔透的钢琴音符仿佛月光洒落在静谧的湖面上，微风拂过，波光粼粼。乐曲中细腻的力度变化与延音，能让浮躁的心灵瞬间沉静在温柔夜色中。",
    searchQuery: "Debussy Clair de Lune piano"
  },
  mood: "初夏静谧的午后，微风拂过湖面"
};

const SUGGESTIONS = [
  { text: "春日梧桐树下的咖啡", icon: "☕" },
  { text: "伦敦雨天的呢喃", icon: "🌧️" },
  { text: "落日熔金的温暖与遗憾", icon: "🌇" },
  { text: "深夜无言的孤独与星光", icon: "🌌" }
];

export default function App() {
  const [curation, setCuration] = useState<Curation>(DEFAULT_INITIAL_CURATION);
  const [moodInput, setMoodInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhraseIndex, setLoadingPhraseIndex] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(true); // Spin the vinyl by default for aesthetic vibe
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<Curation[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Real Met Museum / Chicago API Integration States
  const [museumImage, setMuseumImage] = useState<string | null>(null);
  const [imageSource, setImageSource] = useState<string>("经典馆藏 (Curated Archive)");
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  // Trigger Met Museum / Chicago Art Institute API query when curation changes
  useEffect(() => {
    let active = true;
    const titleToSearch = curation.painting.painting_title || curation.painting.originalTitle || curation.painting.title;
    const artistToSearch = curation.painting.artist;

    if (!titleToSearch) {
      setMuseumImage(null);
      setImageSource("经典馆藏 (Curated Archive)");
      return;
    }

    // Isolate clean English artist name
    let cleanArtist = artistToSearch;
    const match = artistToSearch.match(/[A-Za-z\s\-\.]+/);
    if (match) {
      cleanArtist = match[0].trim();
    }

    const fetchMuseumImage = async () => {
      if (active) {
        setIsImageLoading(true);
      }
      try {
        // 1. Try Metropolitan Museum of Art API
        const metSearchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(titleToSearch)}`;
        const metRes = await fetch(metSearchUrl);
        if (metRes.ok) {
          const metSearchData = await metRes.json();
          if (metSearchData.total > 0 && metSearchData.objectIDs && metSearchData.objectIDs.length > 0) {
            // Check top 3 objects to find one with a valid public domain image URL
            const objectIDs = metSearchData.objectIDs.slice(0, 3);
            for (const id of objectIDs) {
              if (!active) return;
              const detailRes = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
              if (detailRes.ok) {
                const detailData = await detailRes.json();
                if (detailData.primaryImage || detailData.primaryImageSmall) {
                  if (active) {
                    setMuseumImage(detailData.primaryImage || detailData.primaryImageSmall);
                    setImageSource("纽约大都会艺术博物馆馆藏 (The Met Collection)");
                    setIsImageLoading(false);
                  }
                  return;
                }
              }
            }
          }
        }

        // 2. Fallback to Art Institute of Chicago API
        if (!active) return;
        const chicagoSearchUrl = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(titleToSearch + " " + cleanArtist)}&fields=id,title,image_id,artist_title`;
        const chicagoRes = await fetch(chicagoSearchUrl);
        if (chicagoRes.ok) {
          const chicagoData = await chicagoRes.json();
          if (chicagoData.data && chicagoData.data.length > 0) {
            const item = chicagoData.data.find((artwork: any) => artwork.image_id);
            if (item && item.image_id) {
              const imageUrl = `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`;
              if (active) {
                setMuseumImage(imageUrl);
                setImageSource("芝加哥艺术博物馆馆藏 (Art Institute of Chicago)");
                setIsImageLoading(false);
              }
              return;
            }
          }
        }
      } catch (error) {
        console.error("Error loading museum APIs:", error);
      }

      // 3. Fallback to our robust local high-resolution curation
      if (active) {
        setMuseumImage(null);
        setImageSource("经典馆藏 (Curated Archive)");
        setIsImageLoading(false);
      }
    };

    fetchMuseumImage();

    return () => {
      active = false;
    };
  }, [curation]);

  // Rotate loading phrases while searching
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("daily_muse_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading history:", e);
      }
    }
  }, []);

  // Save history helper
  const saveToHistory = (newCuration: Curation) => {
    const updated = [
      { ...newCuration, timestamp: new Date().toLocaleString() },
      ...history.filter(item => item.quote !== newCuration.quote).slice(0, 19) // Keep last 20, unique
    ];
    setHistory(updated);
    localStorage.setItem("daily_muse_history", JSON.stringify(updated));
  };

  // Trigger feedback toast helper
  const triggerToast = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3000);
  };

  // Execute curation generation
  const handleCurate = async (targetMood: string) => {
    if (!targetMood || targetMood.trim().length < 2) {
      triggerToast("请输入更具体的心情或灵感片段（至少两个字符）");
      return;
    }

    setIsLoading(true);
    setLoadingPhraseIndex(0);

    try {
      const response = await fetch("/api/curate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: targetMood })
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        const curated: Curation = {
          ...resData.data,
          mood: targetMood
        };
        setCuration(curated);
        saveToHistory(curated);
        setMoodInput("");
        setIsPlayingMusic(true);
        if (resData.isFallback) {
          triggerToast("为您呈现经典美学策展，感受古典的疗愈能量吧");
        } else {
          triggerToast("策展完成，今日专属共鸣空间已生成");
        }
      } else {
        throw new Error("Server response unsuccessful");
      }
    } catch (error) {
      console.error("Failed to curate:", error);
      triggerToast("触碰艺术星空时稍有延迟，已为您加载预设的温柔美学。");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle suggestion chip click
  const handleSuggestionClick = (text: string) => {
    setMoodInput(text);
    handleCurate(text);
  };

  // Export current curation to Markdown/Txt file (P2)
  const handleExportFile = () => {
    const textContent = `--------------------------------------------
          每日缪斯 · 艺术通感策展
   Curation of Daily Muse - ${new Date().toLocaleDateString()}
--------------------------------------------

【契机情绪】
"${curation.mood || "即兴感受"}"

【今日引言】
"${curation.quote}"

【今日名画】
画名：《${curation.painting.title}》 (${curation.painting.originalTitle})
作者：${curation.painting.artist}
年代：${curation.painting.year} | 流派：${curation.painting.style}

[画作深度共鸣]
${curation.painting.review}

【今日古典乐】
曲名：《${curation.music.title}》
作曲家：${curation.music.composer}
作品号：${curation.music.opus}

[乐评导听与疗愈]
${curation.music.review}

[YouTube 聆听检索词]
${curation.music.searchQuery}

--------------------------------------------
由「每日缪斯」提供心灵疗愈策展 · 愿你找到内心的共鸣
`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `每日缪斯策展_${curation.painting.title || "名画"}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    triggerToast("策展文本档案已下载至本地");
  };

  // Copy aesthetic card text to clipboard
  const handleCopyText = async () => {
    const textToCopy = `「每日缪斯 · 感官共鸣」\n\n“${curation.quote}”\n\n🎨世界名画\n《${curation.painting.title}》 · ${curation.painting.artist} (${curation.painting.year})\n「${curation.painting.review}」\n\n🎻古典乐章\n《${curation.music.title}》 · ${curation.music.composer} (${curation.music.opus})\n「${curation.music.review}」`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      triggerToast("已复制到剪贴板，可前往社交平台分享您的美学空间");
    } catch (err) {
      triggerToast("复制失败，请手动选择复制");
    }
  };

  // Load selected history entry
  const handleLoadHistory = (item: Curation) => {
    setCuration(item);
    setIsPlayingMusic(true);
    setShowHistory(false);
    triggerToast(`已重载：${item.painting.title} & ${item.music.title}`);
  };

  // Delete history entry
  const handleDeleteHistory = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const updated = history.filter((_, idx) => idx !== index);
    setHistory(updated);
    localStorage.setItem("daily_muse_history", JSON.stringify(updated));
    triggerToast("已移除该条策展记录");
  };

  // Clear all history
  const handleClearAllHistory = () => {
    if (window.confirm("确定清除所有历史策展记录吗？这不可恢复。")) {
      setHistory([]);
      localStorage.removeItem("daily_muse_history");
      triggerToast("历史策展画廊已排空");
    }
  };

  // Resolve image for current painting
  const paintingImgUrl = resolvePaintingImage(
    curation.painting.title,
    curation.painting.artist,
    curation.painting.imageKeywords
  );

  return (
    <div id="daily-muse-app" className="min-h-screen flex flex-col relative font-serif text-ink-dark selection:bg-acc-sage/20 selection:text-ink-dark">
      {/* Paper Texture Overlay */}
      <div className="paper-texture-overlay" />

      {/* Toast Notice */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 z-50 px-6 py-3 rounded-full bg-ink-dark text-canvas-bg text-sm shadow-xl flex items-center gap-2 border border-border-editorial/40 font-sans tracking-wide"
          >
            <Sparkles className="w-4 h-4 text-acc-terracotta" />
            <span>{feedbackMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Header Navigation - Editorial Style */}
      <header id="app-header" className="w-full border-b border-ink-dark/10 pt-8 pb-4 px-6 md:px-12 flex flex-col sm:flex-row sm:justify-between sm:items-baseline bg-transparent z-10 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-dark font-serif">
            每日缪斯 <span className="font-normal text-xs uppercase tracking-widest ml-4 opacity-50">Daily Muse</span>
          </h1>
        </div>

        <div className="flex items-center gap-6 justify-between sm:justify-end w-full sm:w-auto">
          <p className="text-xs uppercase tracking-[0.2em] opacity-60 font-sans">
            古典乐与名画的心灵共鸣
          </p>

          <button
            id="toggle-history-btn"
            onClick={() => setShowHistory(true)}
            className="group flex items-center gap-2 px-4 py-1.5 text-xs text-ink-muted hover:text-ink-dark font-sans border border-border-editorial hover:border-ink-dark rounded-full transition-all duration-300 bg-white/40"
            title="打开美学馆藏"
          >
            <History className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300 text-acc-sage" />
            <span>我的馆藏</span>
            {history.length > 0 && (
              <span className="flex h-1.5 w-1.5 rounded-full bg-acc-terracotta" />
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 md:px-12 py-8 pb-32">
        {/* Loading Overlay State */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 min-h-[50vh] text-center"
            >
              {/* Artistic breathing ring */}
              <div className="relative w-24 h-24 mb-8">
                <motion.div
                  animate={{ scale: [1, 1.25, 1], rotate: 360 }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-acc-sage/40"
                />
                <motion.div
                  animate={{ scale: [1.2, 1, 1.2] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-2 rounded-full border border-acc-terracotta/30"
                />
                <div className="absolute inset-4 rounded-full bg-canvas-card flex items-center justify-center">
                  <Compass className="w-6 h-6 text-ink-muted animate-spin-slow" />
                </div>
              </div>
              <motion.p
                key={loadingPhraseIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-lg text-ink-muted font-serif italic max-w-md px-4 h-8"
              >
                {LOADING_PHRASES[loadingPhraseIndex]}
              </motion.p>
              <span className="text-xs text-ink-light tracking-widest font-sans uppercase mt-4">
                感官互通中，请轻闭双眼
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              {/* Today's Poetic Quote - Editorial Style */}
              <section id="quote-section" className="relative text-center max-w-3xl mx-auto py-8 px-4">
                <h2 className="sr-only">今日美学引言</h2>
                <p className="text-2xl md:text-3xl leading-relaxed max-w-2xl mx-auto italic text-ink-dark">
                  “{curation.quote}”
                </p>
                <div className="mt-4 h-px w-12 bg-ink-dark/20 mx-auto"></div>
              </section>

              {/* Triptych Visual Layout: Masterpiece & Music Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                
                {/* Left Block: Masterpiece Framing Card */}
                <section id="painting-block" className="flex flex-col space-y-6">
                  {/* Art Column Header */}
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-[10px] uppercase tracking-widest bg-ink-dark text-canvas-bg px-2.5 py-0.5 font-sans font-medium">Art Curation</span>
                    <span className="h-[1px] flex-1 bg-ink-dark/10"></span>
                  </div>

                  {/* Elegant White Framing */}
                  <div className="painting-frame bg-white p-4 transition-all duration-500 hover:shadow-lg border border-border-editorial">
                    <div className="relative overflow-hidden bg-canvas-card aspect-4/3 flex items-center justify-center">
                      <img
                        src={museumImage || paintingImgUrl}
                        alt={`${curation.painting.title} by ${curation.painting.artist}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover select-none transition-transform duration-700 hover:scale-105"
                      />
                      {isImageLoading && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-xs flex items-center justify-center z-10">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-5 h-5 border-2 border-acc-sage border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px] text-ink-light tracking-wider font-sans uppercase">
                              正在调取数字馆藏...
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Museum Digital Collection Source Tag */}
                    <div className="mt-3 flex justify-between items-center text-[10px] text-ink-muted/80 font-sans tracking-wide border-b border-ink-dark/5 pb-2.5">
                      <span className="flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full inline-block ${isImageLoading ? 'bg-amber-400 animate-pulse' : 'bg-acc-sage'}`}></span>
                        <span>馆藏源: {imageSource}</span>
                      </span>
                      {museumImage && (
                        <span className="text-[9px] px-2 py-0.5 bg-acc-sage/15 text-acc-sage font-medium rounded-sm border border-acc-sage/25">
                          100% 真实名画
                        </span>
                      )}
                    </div>
                    
                    {/* Painting Details Metadata */}
                    <div className="mt-4 space-y-3">
                      <h3 className="text-xl font-bold tracking-tight text-ink-dark">
                        《{curation.painting.title}》
                      </h3>
                      
                      <div className="flex justify-between text-xs opacity-70 uppercase tracking-wider border-b border-ink-dark/10 pb-1.5 font-sans">
                        <span>{curation.painting.artist}</span>
                        <span>{curation.painting.year}年</span>
                      </div>

                      <div className="flex justify-between text-xs text-ink-light font-mono">
                        <span className="italic">{curation.painting.originalTitle}</span>
                        <span className="font-sans text-[11px] tracking-wider text-acc-sage font-medium">{curation.painting.style}</span>
                      </div>
                    </div>
                  </div>

                  {/* Art commentary with spacious breathing padding */}
                  <div className="space-y-2">
                    <p className="text-sm leading-relaxed text-justify opacity-90 indent-8 font-serif">
                      {curation.painting.review}
                    </p>
                  </div>
                </section>

                {/* Right Block: Classical Music Player Interface */}
                <section id="music-block" className="flex flex-col space-y-6">
                  {/* Auditory Column Header */}
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="text-[10px] uppercase tracking-widest bg-acc-sage text-canvas-bg px-2.5 py-0.5 font-sans font-medium">Auditory Soul</span>
                    <span className="h-[1px] flex-1 bg-ink-dark/10"></span>
                  </div>

                  {/* Vintage Music Player & LP Container */}
                  <div className="bg-canvas-card border border-border-editorial rounded-sm p-6 md:p-8 relative overflow-hidden flex flex-col sm:flex-row gap-6 items-center shadow-sm max-h-[320px]">
                    {/* Background decor lines */}
                    <div className="absolute inset-0 bg-linear-to-tr from-black/5 to-transparent pointer-events-none" />
                    
                    {/* Spinning Golden Vinyl LP */}
                    <div className="relative flex-shrink-0 w-32 h-32 flex items-center justify-center select-none">
                      {/* Outer Vinyl grooves */}
                      <motion.div
                        animate={isPlayingMusic ? { rotate: 360 } : {}}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="w-full h-full rounded-full bg-zinc-900 border-4 border-zinc-850 shadow-md flex items-center justify-center relative"
                        style={{
                          backgroundImage: "repeating-radial-gradient(circle, #1a1a1a, #262626 1px, #101010 4px)"
                        }}
                      >
                        {/* Gold Inner Record Label */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-200 to-amber-700 p-0.5 shadow-inner flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-amber-300/20 flex items-center justify-center relative">
                            <Music className="w-3.5 h-3.5 text-yellow-300/60" />
                            {/* Center Spindle Hole */}
                            <div className="absolute w-1.5 h-1.5 rounded-full bg-canvas-bg border border-zinc-800" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Tone arm visualization */}
                      <div className="absolute -top-1 -right-1 w-8 h-14 pointer-events-none origin-top-right transition-transform duration-500"
                           style={{ transform: isPlayingMusic ? "rotate(15deg)" : "rotate(0deg)" }}>
                        <div className="w-[1px] h-10 bg-zinc-400 absolute right-3 top-1 origin-top shadow" />
                        <div className="w-1.5 h-3 bg-zinc-600 absolute right-2 top-8 rounded-xs" />
                      </div>
                    </div>

                    {/* Music Metadata Details */}
                    <div className="flex-grow space-y-3 text-center sm:text-left w-full">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-ink-dark/5 text-ink-muted text-xs font-sans uppercase tracking-wider font-semibold">
                        {curation.music.opus || "No Opus"}
                      </span>
                      
                      <h3 className="text-lg md:text-xl font-bold text-ink-dark leading-tight tracking-tight">
                        {curation.music.title}
                      </h3>
                      
                      <div className="text-xs text-ink-muted font-sans font-medium flex justify-center sm:justify-start items-center gap-1">
                        <span className="opacity-60">作曲家: </span> {curation.music.composer}
                      </div>

                      {/* Interactive CSS Wavebar Visualizer */}
                      <div className="flex items-end gap-1.5 h-6 justify-center sm:justify-start mt-4 pt-1">
                        {[1.8, 2.4, 1.2, 3.2, 2.0, 1.5, 2.8, 1.0].map((speed, idx) => (
                          <motion.span
                            key={idx}
                            animate={isPlayingMusic ? { height: ["4px", "20px", "4px"] } : { height: "4px" }}
                            transition={{ duration: speed, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 rounded-full bg-acc-sage/40"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Guided listening text segment underneath */}
                  <div className="space-y-2 mt-6">
                    <p className="text-[10px] uppercase tracking-widest opacity-50 font-sans">Guided Listening / 乐评导听</p>
                    <p className="text-sm leading-relaxed text-justify opacity-90 indent-8 font-serif">
                      {curation.music.review}
                    </p>
                  </div>

                  {/* YouTube Stream Link out button (P1) */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(curation.music.searchQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-ink-dark hover:bg-acc-sage text-canvas-bg font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-sm hover:shadow-md group"
                      onClick={() => triggerToast("正在为您前往 YouTube 搜寻音乐...")}
                    >
                      <Music className="w-3.5 h-3.5" />
                      <span>Listen on YouTube</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <button
                      onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                      className="px-5 py-3 border border-border-editorial hover:border-ink-dark hover:bg-white/40 text-ink-muted hover:text-ink-dark rounded-xs font-sans text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {isPlayingMusic ? (
                        <>
                          <Pause className="w-3.5 h-3.5 text-acc-terracotta" />
                          <span>暂停光针</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 text-acc-sage" />
                          <span>旋转音轮</span>
                        </>
                      )}
                    </button>
                  </div>
                </section>
              </div>

              {/* Share & Download Toolbar (P2) */}
              <section id="share-export-toolbar" className="flex justify-center items-center gap-4 py-4 border-t border-b border-ink-dark/10">
                <button
                  onClick={handleCopyText}
                  className="flex items-center gap-1.5 text-xs font-sans text-ink-muted hover:text-ink-dark transition-colors px-3 py-1.5 rounded hover:bg-canvas-card/60"
                  title="复制美学排版文本"
                >
                  <Share2 className="w-3.5 h-3.5 text-acc-sage" />
                  <span>分享卡片</span>
                </button>
                <span className="w-1.5 h-1.5 rounded-full bg-ink-light/20"></span>
                <button
                  onClick={handleExportFile}
                  className="flex items-center gap-1.5 text-xs font-sans text-ink-muted hover:text-ink-dark transition-colors px-3 py-1.5 rounded hover:bg-canvas-card/60"
                  title="下载纯文本策展档案"
                >
                  <Download className="w-3.5 h-3.5 text-acc-terracotta" />
                  <span>导出档案</span>
                </button>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Bottom Mood Input Section */}
      <footer className="fixed bottom-0 left-0 right-0 py-6 px-4 z-40 bg-gradient-to-t from-canvas-bg via-canvas-bg/95 to-transparent pointer-events-none">
        <div className="max-w-2xl mx-auto w-full pointer-events-auto">
          
          {/* Mood Suggestion Chips (when not loading) */}
          {!isLoading && (
            <div className="flex flex-wrap gap-2 justify-center mb-3 max-h-16 overflow-y-auto no-scrollbar py-1">
              {SUGGESTIONS.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(sug.text)}
                  className="flex items-center gap-1 px-3 py-1 bg-white hover:bg-acc-sage hover:text-white text-xs text-ink-muted border border-ink-light/10 hover:border-acc-sage rounded-full shadow-sm transition-all duration-300 font-sans cursor-pointer whitespace-nowrap"
                >
                  <span>{sug.icon}</span>
                  <span>{sug.text}</span>
                </button>
              ))}
            </div>
          )}

          {/* Frosted Glass Input Container */}
          <div className="frosted-glass rounded-2xl p-2.5 flex items-center shadow-lg border border-ink-light/20 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-acc-sage text-base animate-pulse">✨</div>
            <input
              type="text"
              disabled={isLoading}
              value={moodInput}
              onChange={(e) => setMoodInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleCurate(moodInput);
                }
              }}
              placeholder="此刻的心情或灵感...（如“落日熔金的温柔”或想要“德彪西、印象派”风格）"
              className="flex-grow pl-9 pr-4 py-3 bg-transparent text-sm md:text-base border-none outline-none focus:ring-0 text-ink-dark font-serif placeholder:text-ink-light/70 disabled:opacity-50"
            />
            <button
              onClick={() => handleCurate(moodInput)}
              disabled={isLoading || !moodInput.trim()}
              className="p-3 bg-ink-dark hover:bg-acc-sage disabled:bg-ink-light/30 text-canvas-bg rounded-xl transition-all duration-300 shadow flex items-center justify-center cursor-pointer disabled:cursor-not-allowed group"
              title="寻找通感灵感"
            >
              <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
          <p className="text-center mt-3 text-[10px] uppercase tracking-widest opacity-40 font-sans pointer-events-none">
            Presenting a tailored curation for your inner landscape
          </p>
        </div>
      </footer>

      {/* Slide-In History Gallery Drawer */}
      <AnimatePresence>
        {showHistory && (
          <>
            {/* Backdrop lock */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />

            {/* Sidebar drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-canvas-bg border-l border-ink-light/15 shadow-2xl z-50 flex flex-col p-6 font-serif"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center border-b border-ink-light/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-acc-terracotta" />
                  <h3 className="text-lg font-bold text-ink-dark">美学馆藏画廊</h3>
                </div>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-1 rounded-full hover:bg-canvas-card text-ink-muted hover:text-ink-dark transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-grow overflow-y-auto space-y-4 pr-1">
                {history.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center text-ink-light space-y-3">
                    <Palette className="w-10 h-10 stroke-1 text-ink-light/50" />
                    <p className="text-sm font-sans">暂无馆藏印记</p>
                    <p className="text-xs font-serif italic text-ink-light/70 max-w-[200px]">
                      在底部输入您当下的感触，开始编织属于您的美学馆藏
                    </p>
                  </div>
                ) : (
                  history.map((item, index) => {
                    const localImg = resolvePaintingImage(
                      item.painting.title,
                      item.painting.artist,
                      item.painting.imageKeywords
                    );
                    return (
                      <div
                        key={index}
                        onClick={() => handleLoadHistory(item)}
                        className="group p-4 bg-canvas-card/60 hover:bg-white rounded-xl border border-ink-light/10 hover:border-acc-sage/40 transition-all duration-300 cursor-pointer flex gap-4 shadow-sm"
                      >
                        {/* Painting micro thumbnail */}
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-canvas-bg shadow-inner border border-white">
                          <img
                            src={localImg}
                            alt=""
                            className="w-full h-full object-cover select-none"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Text info */}
                        <div className="flex-grow min-w-0 space-y-1">
                          <div className="flex justify-between items-baseline gap-1">
                            <h4 className="text-sm font-bold text-ink-dark truncate">
                              《{item.painting.title}》
                            </h4>
                            <button
                              onClick={(e) => handleDeleteHistory(e, index)}
                              className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-canvas-card text-ink-light hover:text-acc-terracotta transition-all duration-200"
                              title="移除"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <p className="text-xs text-ink-muted truncate font-sans">
                            🎵 {item.music.title} · {item.music.composer}
                          </p>

                          <div className="flex items-center gap-1.5 text-[10px] text-ink-light font-sans pt-1">
                            <CornerDownRight className="w-2.5 h-2.5 text-acc-terracotta" />
                            <span className="truncate max-w-[180px]">“{item.mood || "瞬时心情"}”</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Drawer Footer */}
              {history.length > 0 && (
                <div className="border-t border-ink-light/10 pt-4 mt-6">
                  <button
                    onClick={handleClearAllHistory}
                    className="w-full flex items-center justify-center gap-2 py-3 border border-ink-light/20 hover:border-acc-terracotta/40 text-xs text-ink-muted hover:text-acc-terracotta font-sans rounded-xl transition-colors bg-canvas-card/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>排空画廊馆藏 ({history.length})</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
