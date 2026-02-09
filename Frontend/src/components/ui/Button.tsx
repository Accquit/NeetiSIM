import type { ButtonProps } from '../../types';

export default function Button({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    className = '',
}: ButtonProps) {
    const baseStyles = 'relative overflow-hidden font-medium rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-white text-slate-900 hover:bg-slate-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] shadow-lg shadow-white/5',
        secondary: 'glass-card border border-white/10 text-white hover:bg-white/10 hover:border-white/20',
        outline: 'border border-white/20 text-white hover:bg-white/5 backdrop-blur-sm',
        ghost: 'text-slate-400 hover:text-white hover:bg-white/5',
        danger: 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg font-semibold tracking-wide',
        icon: 'p-3',
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} group`}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            )}
        </button>
    );
}
