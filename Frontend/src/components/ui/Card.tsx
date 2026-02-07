import type { CardProps } from '../../types';

export default function Card({ children, className = '', hover = false }: CardProps) {
    return (
        <div className={`glass rounded-2xl p-6 ${hover ? 'glass-hover' : ''} ${className}`}>
            {children}
        </div>
    );
}
