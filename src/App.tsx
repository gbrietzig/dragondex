import { useState, useMemo } from 'react'
import { Search, Radar as RadarIcon, AlertTriangle, Loader2, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { RadarSweep } from './components/radar/RadarSweep'
import { CharacterCard } from './components/ui/CharacterCard'
import { CharacterDetail } from './components/ui/CharacterDetail'
import { useWarriors } from './hooks/useWarriors'
import { useFavorites } from './hooks/useFavorites'
import { warriorService, Warrior } from './services/warriorService'

function App() {
    const { warriors, loading, error, searchQuery, setSearchQuery } = useWarriors();
    const { toggleFavorite, isFavorite } = useFavorites();
    const [selectedCharacter, setSelectedCharacter] = useState<Warrior | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

    const filteredWarriors = useMemo(() => {
        if (showOnlyFavorites) {
            return warriors.filter(w => isFavorite(w.id));
        }
        return warriors;
    }, [warriors, showOnlyFavorites, isFavorite]);

    const handleCharacterClick = async (char: Warrior) => {
        try {
            setDetailLoading(true);
            const fullChar = await warriorService.getCharacterById(char.id);
            setSelectedCharacter(fullChar);
            setIsDetailOpen(true);
        } catch (err) {
            console.error('Falha ao obter inteligência detalhada:', err);
            setSelectedCharacter(char);
            setIsDetailOpen(true);
        } finally {
            setDetailLoading(false);
        }
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
    };

    return (
        <div className="relative min-h-screen text-slate-50 font-sans selection:bg-dbz-orange selection:text-white bg-slate-950">
            <RadarSweep />

            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-radar-green/20 p-2 rounded-lg border border-radar-green/30">
                            <RadarIcon className="w-6 h-6 text-radar-green" />
                        </div>
                        <h1 className="text-2xl font-black italic tracking-tighter uppercase cursor-pointer" onClick={() => window.location.reload()}>
                            DRAGON<span className="text-dbz-orange">DEX</span>
                        </h1>
                    </div>

                    <div className="relative flex-1 max-w-md ml-8 hidden md:flex items-center gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Localizar energia vital..."
                                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg py-2 pl-10 pr-4 focus:border-dbz-orange outline-none transition-all font-mono text-sm"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        </div>

                        <button
                            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                            className={`p-2 rounded-lg border transition-all ${showOnlyFavorites
                                    ? 'bg-dbz-orange/20 border-dbz-orange text-dbz-orange'
                                    : 'bg-slate-900/50 border-slate-700/50 text-slate-500 hover:border-dbz-orange'
                                }`}
                            title={showOnlyFavorites ? 'Mostrar Todos' : 'Ver Favoritos'}
                        >
                            <Heart className={`w-5 h-5 ${showOnlyFavorites ? 'fill-dbz-orange' : ''}`} />
                        </button>

                        {(loading || detailLoading) && (
                            <Loader2 className="w-4 h-4 text-radar-green animate-spin" />
                        )}
                    </div>

                    <div className="flex items-center gap-4 ml-4">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">System Status</span>
                            <span className={`text-xs font-mono ${error ? 'text-red-500' : 'text-radar-green'}`}>
                                {error ? 'ERROR' : 'ONLINE'}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 relative">
                {/* Mobile Search & Favorites */}
                <div className="md:hidden mb-8 space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Localizar energia..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 pl-12 pr-4 focus:border-dbz-orange outline-none"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-radar-green animate-spin" />}
                    </div>
                    <button
                        onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                        className={`w-full py-3 rounded-lg border flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs transition-all ${showOnlyFavorites
                                ? 'bg-dbz-orange border-dbz-orange text-white'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-white' : ''}`} />
                        {showOnlyFavorites ? 'Exibindo Favoritos' : 'Filtrar Favoritos'}
                    </button>
                </div>

                {/* Hero Info */}
                <section className="mb-12">
                    <h2 className="text-xs uppercase tracking-[0.3em] font-black text-radar-green mb-2">Protocolo Radar do Dragão</h2>
                    <motion.p
                        key={searchQuery + showOnlyFavorites}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase max-w-2xl"
                    >
                        {showOnlyFavorites
                            ? "Base de dados: Guerreiros Favoritos"
                            : searchQuery
                                ? `Resultados para "${searchQuery}"`
                                : "Detectando assinaturas de poder no setor Z."
                        }
                    </motion.p>
                </section>

                {/* Error State */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-red-500/10 border border-red-500/50 p-6 rounded-xl flex items-center gap-4 mb-8"
                        >
                            <AlertTriangle className="w-10 h-10 text-red-500" />
                            <div>
                                <h3 className="text-lg font-bold uppercase tracking-tighter">Erro de Comunicação</h3>
                                <p className="text-slate-400 text-sm">{error}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty State */}
                {!loading && filteredWarriors.length === 0 && !error && (
                    <div className="text-center py-20 bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-800">
                        <RadarIcon className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                        <h3 className="text-xl font-bold uppercase tracking-widest text-slate-500">
                            {showOnlyFavorites ? "Nenhum favorito selecionado" : "Nenhum sinal detectado"}
                        </h3>
                        <p className="text-slate-600 mt-2 font-mono text-sm uppercase">TENTE RECALIBRAR OS SENSORES DE BUSCA</p>
                    </div>
                )}

                {/* Character Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredWarriors.map((char) => (
                            <CharacterCard
                                key={char.id}
                                id={char.id}
                                name={char.name}
                                image={char.image}
                                ki={char.ki}
                                race={char.race}
                                affiliation={char.affiliation}
                                isFavorite={isFavorite(char.id)}
                                onToggleFavorite={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(char.id);
                                }}
                                onClick={() => handleCharacterClick(char)}
                            />
                        ))}
                    </AnimatePresence>

                    {/* Loading Skeletons */}
                    {loading && [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="bg-slate-900/30 border-2 border-slate-800/50 rounded-xl h-[400px] animate-pulse overflow-hidden">
                            <div className="aspect-[3/4] bg-slate-950/50"></div>
                            <div className="p-4 space-y-3">
                                <div className="h-6 w-3/4 bg-slate-800 rounded"></div>
                                <div className="h-4 w-1/2 bg-slate-800 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Detail Modal */}
            <CharacterDetail
                character={selectedCharacter}
                isOpen={isDetailOpen}
                onClose={handleCloseDetail}
            />

            {/* Footer / Scouter HUD Overlay */}
            <footer className="fixed bottom-4 left-4 right-4 pointer-events-none flex justify-between items-end z-40">
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-3 rounded-lg pointer-events-auto">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${(loading || detailLoading) ? 'bg-radar-green animate-ping' : 'bg-dbz-orange'}`}></div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">
                            {(loading || detailLoading) ? 'ANALYZING_FREQUENCIES...' : 'RADAR_READY_SECTOR_7'}
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default App
