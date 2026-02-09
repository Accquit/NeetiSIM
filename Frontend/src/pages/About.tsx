import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TeamMemberCard({ member }: { member: any }) {
    const [imgError, setImgError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleError = (e: any) => {
        const target = e.target;
        // Try fallback extensions
        if (target.src.endsWith('.jpg')) {
            target.src = target.src.replace('.jpg', '.jpeg');
        } else if (target.src.endsWith('.jpeg')) {
            target.src = target.src.replace('.jpeg', '.png');
        } else {
            setImgError(true);
            target.style.display = 'none';
        }
    };

    return (
        <div className="group relative h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                <div className={`w-24 h-24 mx-auto rounded-full ${member.color} flex items-center justify-center text-xl font-bold text-white mb-4 shadow-lg shrink-0 overflow-hidden relative`}>
                    {!imgError && (
                        <img
                            src={member.image}
                            alt={member.name}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setIsLoaded(true)}
                            onError={handleError}
                        />
                    )}
                    {/* Only show initials if image fails or hasn't loaded yet (and isn't in error state, wait, actually if not loaded we show initials as placeholder? 
                        User wanted "Remove initials from middle".
                        If isLoaded is true, img covers everything (z-index wise or just on top).
                        If !isLoaded, we show BG color. Initials? 
                        The user complaint was likely about initials showing THROUGH the image or ON TOP.
                        By only rendering initials when !isLoaded && !imgError (loading state) OR imgError (failed state),
                        we ensure if image IS loaded, initials are NOT in the DOM.
                    */}
                    {(!isLoaded || imgError) && (
                        <span className="z-0 animate-fade-in">{member.initials}</span>
                    )}
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-1">{member.name}</h3>
                <p className="text-accent text-sm font-mono text-center mb-4 min-h-[1.25rem]">{member.role}</p>

                {!member.hideSocials && (
                    <div className="flex justify-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity mt-auto">
                        {/* LinkedIn */}
                        {member.linkedin && (
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0077b5] hover:text-white cursor-pointer transition-all duration-300"
                            >
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>
                        )}
                        {/* GitHub */}
                        {member.github && (
                            <a
                                href={member.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#333] hover:text-white cursor-pointer transition-all duration-300"
                            >
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function About() {
    const navigate = useNavigate();

    const team = [
        {
            name: "Yashasvi Jaiswal",
            role: "Team Leader",
            initials: "YJ",
            color: "bg-purple-600",
            image: "/team/yashasvi.jpg",
            linkedin: "https://www.linkedin.com/in/yashjswl/",
            github: "https://github.com/yashjswl"
        },
        {
            name: "Kushaj Sethi",
            role: " ",
            initials: "KS",
            color: "bg-blue-600",
            image: "/team/kushaj.jpg",
            linkedin: "https://www.linkedin.com/in/kushaj-sethi-a05055318/",
            github: "https://github.com/accquit" // Assuming accidental typo in prompt 'accquit' -> 'Accquit' but keeping user input
        },
        {
            name: "Shrey Singh",
            role: " ",
            initials: "SS",
            color: "bg-emerald-600",
            image: "/team/shrey.jpg",
            hideSocials: true
        }
    ];

    return (
        <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
            {/* Background: Cyber Grid & Glow (copied from Home.tsx for consistency) */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_70%,transparent_100%)]"></div>

            <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[100px] mix-blend-screen opacity-30"></div>

            <div className="container mx-auto px-6 relative z-10 py-16">

                {/* Header Section */}
                <div className="max-w-4xl mx-auto text-center space-y-6 mb-20 animate-slide-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <span className="text-xs font-mono font-medium tracking-widest text-accent uppercase">HackTU 7.0 Submission</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-purple to-accent">NitiSIM</span>
                    </h1>

                    <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                        Built for <span className="text-white font-medium">HackTU 7.0</span>, a Major League Hacking (MLH) Hackathon organized at TIET, India.
                    </p>
                </div>

                {/* Team Section - Moved up for more focus */}
                <div className="max-w-5xl mx-auto mb-20 animate-slide-up delay-200">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-display font-bold text-white mb-4">Meet the Team</h2>
                        <p className="text-slate-400">The minds behind NitiSIM</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <TeamMemberCard key={index} member={member} />
                        ))}
                    </div>
                </div>

                {/* Project Description - Moved down */}
                <div className="max-w-5xl mx-auto mb-20 animate-slide-up delay-300">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-display font-bold text-white">The Project</h2>
                            <p className="text-slate-400 leading-relaxed">
                                NitiSIM is a next-generation policy simulation engine designed to help policymakers predict, visualize, and solve complex urban challenges. By leveraging real-time data and advanced predictive modeling, NitiSIM provides a sandbox for testing policy impact on air quality, traffic congestion, and public health before implementation.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Data-Driven Insights</h3>
                                        <p className="text-sm text-slate-500">Real-time analysis of urban parameters.</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">Predictive Modeling</h3>
                                        <p className="text-sm text-slate-500">Forecast the long-term impact of policy decisions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl rounded-full"></div>
                            <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="space-y-4">
                                    <div className="h-6 w-1/3 bg-white/10 rounded animate-pulse"></div>
                                    <div className="h-32 w-full bg-white/5 rounded"></div>
                                    <div className="h-6 w-2/3 bg-white/10 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-20">
                    <button
                        onClick={() => navigate('/')}
                        className="text-slate-500 hover:text-white transition-colors text-sm font-mono"
                    >
                        ← BACK TO HOME
                    </button>
                </div>
            </div>
        </div>
    );
}
